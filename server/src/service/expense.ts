import { tr } from 'date-fns/locale';
import { encodeDateToUnix, decodeUnixToDate } from '../lib/utils';
import { ExpenseRepository } from '../repository/expense';
import { TripRepository } from '../repository/trip';
import { ExpenseData, TripData, Participant, Settlement } from '../types';

export const ExpenseService = {
  getAllExpenses: async (tripId: string) => {
    const expenses = await ExpenseRepository.getAllExpenses(tripId);
    for (const exp of expenses) {
      exp.createdAt = decodeUnixToDate(exp.createdAt);
    }
    return expenses;
  },
  createExpense: async (trip: TripData, newExpense: ExpenseData) => {
    const friends = trip.participants || [];
    const payerFr = friends.find(
      (fr: Participant) => fr.name === newExpense.payer
    );

    if (!payerFr) {
      throw new Error(`${newExpense.payer} is not inside the trip`);
    }

    const amt = newExpense.amount / newExpense.participants.length;

    for (const p of newExpense.participants) {
      const f = friends.find((fr: Participant) => fr.name === p);

      if (!f) {
        throw new Error(`${p} is not inside the trip`);
      }
      f.spent += amt;
      if (p !== newExpense.payer) {
        f.net -= amt;
        payerFr.net += amt;
      }
    }

    trip.total += newExpense.amount;
    trip.participants = friends;
    await TripRepository.updateTrip(trip.id!, {
      total: trip.total,
      participants: friends,
    });
    newExpense.createdAt = encodeDateToUnix(new Date().toISOString());
    return await ExpenseRepository.createExpense(newExpense);
  },

  updateExpense: async (
    trip: TripData,
    expenseId: string,
    updatedFields: Partial<ExpenseData>
  ) => {
    const oldExpense = await ExpenseRepository.getExpenseById(expenseId);
    const oldAmt = oldExpense.amount / oldExpense.participants.length;

    // Revert old expense effect
    const oldPayerFr = trip.participants.find(
      (fr: Participant) => fr.name === oldExpense.payer
    );

    for (const p of oldExpense.participants) {
      const f = trip.participants.find((fr: Participant) => fr.name === p);
      if (f) {
        f.spent -= oldAmt;
        if (p !== oldExpense.payer && oldPayerFr) {
          f.net += oldAmt;
          oldPayerFr.net -= oldAmt;
        }
      }
    }

    // Apply new expense effect
    const newAmt =
      (updatedFields.amount || oldExpense.amount) /
      (updatedFields.participants || oldExpense.participants).length;
    const newPayerFr = trip.participants.find(
      (fr: Participant) => fr.name === (updatedFields.payer || oldExpense.payer)
    );

    if (!newPayerFr) {
      throw new Error(
        `${updatedFields.payer || oldExpense.payer} is not inside the trip`
      );
    }

    for (const p of updatedFields.participants || oldExpense.participants) {
      const f = trip.participants.find((fr: Participant) => fr.name === p);
      if (!f) {
        throw new Error(`${p} is not inside the trip`);
      }
      f.spent += newAmt;
      if (p !== (updatedFields.payer || oldExpense.payer)) {
        f.net -= newAmt;
        newPayerFr.net += newAmt;
      }
    }

    trip.total =
      trip.total -
      oldExpense.amount +
      (updatedFields.amount || oldExpense.amount);
    await TripRepository.updateTrip(trip.id!, {
      total: trip.total,
      participants: trip.participants,
    });

    return await ExpenseRepository.updateExpense(expenseId, updatedFields);
  },

  deleteExpense: async (trip: TripData, expenseId: string) => {
    const expense = await ExpenseRepository.getExpenseById(expenseId);

    const amt = expense.amount / expense.participants.length;
    trip.total -= expense.amount;

    const payerFr = trip.participants.find(
      (fr: Participant) => fr.name === expense.payer
    );

    for (const p of expense.participants) {
      const f = trip.participants.find((fr: Participant) => fr.name === p);
      if (f) {
        f.spent -= amt;
        if (p !== expense.payer && payerFr) {
          f.net += amt;
          payerFr.net -= amt;
        }
      }
    }

    await TripRepository.updateTrip(trip.id!, {
      total: trip.total,
      participants: trip.participants,
    });
    await ExpenseRepository.deleteExpense(expenseId);
    return expenseId;
  },
  settle: async (trip: TripData) => {
    const isZero = (x: number) => {
      return Math.abs(x) < 1e-8;
    };

    trip.participants.sort((a: Participant, b: Participant) => a.net - b.net);
    const participants = trip.participants.filter(
      (p: Participant) => !isZero(p.net)
    );
    const settlements: Settlement[] = [];

    while (participants.length >= 2) {
      const d = participants.shift()!;
      const c = participants.pop()!;

      const rem = d.net + c.net;
      if (!isZero(rem) && rem !== 0) {
        if (rem > 0) {
          participants.push({ ...c, net: rem });
        } else {
          participants.push({ ...d, net: rem });
        }
        participants.sort((a: Participant, b: Participant) => a.net - b.net);
      }
      settlements.push({
        from: d.name,
        to: c.name,
        amount: Math.min(Math.abs(d.net), Math.abs(c.net)),
      });
    }

    return settlements;
  },
};
