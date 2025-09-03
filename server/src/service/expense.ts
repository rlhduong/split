import { ExpenseRepository } from '../repository/expense';
import { TripRepository } from '../repository/trip';
import { ExpenseData, TripData, Participant } from '../types';

export const ExpenseService = {
  getAllExpenses: async (tripId: string) => {
    return await ExpenseRepository.getAllExpenses(tripId);
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
    await TripRepository.updateTrip(trip);
    return await ExpenseRepository.createExpense(newExpense);
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

    await TripRepository.updateTrip(trip);
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
    const settlements: Array<Array<string>> = [];

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

      const settlement: string[] = [];
      settlement.push(d.name);
      settlement.push(c.name);
      settlement.push(Math.min(Math.abs(d.net), Math.abs(c.net)).toFixed(2));
      settlements.push(settlement);
    }

    return settlements;
  },
};
