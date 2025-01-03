import { Request, Response, NextFunction } from 'express';
import HttpError from 'http-errors';
import {
  getTrip,
  updateFriends,
  updateTotal,
  insertExpense,
  getExpenses,
  getExpense,
  deleteExpense as deleteExpenseFromDb,
} from '../db';

const EPS = 1e-8;

/**
 * Check if a number is approximately zero
 * @param {number} x
 * @returns {boolean}
 */
function isZero(x: number) {
  return Math.abs(x) <= EPS;
}

export const addExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { tripId } = req.params;
  const { payer, description, participants, amount, size } = req.body;
  const trip = await getTrip(parseInt(tripId));

  const friends = trip.friends;
  const amt = amount / size;

  if (!(payer in friends)) {
    next(HttpError(400, `${payer} is not inside the trip`));
    return;
  }

  for (const f of participants) {
    if (!(f in friends)) {
      next(HttpError(400, `${f} is not inside the trip`));
      return;
    }
  }

  for (const f of participants) {
    friends[f].spent += amt;
    if (f !== payer) {
      friends[f].net -= amt;
      friends[payer].net += amt;
    }
  }

  console.log(JSON.stringify(participants));

  updateTotal(parseInt(tripId), trip.total + amount);
  updateFriends(parseInt(tripId), JSON.stringify(friends));
  insertExpense(
    parseInt(tripId),
    description,
    amount,
    payer,
    JSON.stringify(participants)
  );
  res.send({});
};

export const viewEpenses = async (req: Request, res: Response) => {
  const { tripId } = req.params;
  const expenses = await getExpenses(parseInt(tripId));
  res.send(expenses);
};

export const deleteExpense = async (req: Request, res: Response) => {
  const { tripId, expenseId } = req.params;
  const trip = await getTrip(parseInt(tripId));
  const expense = await getExpense(parseInt(expenseId));

  const amt = expense.amount / expense.participants.length;
  trip.total -= expense.amount;

  const friends = trip.friends;

  for (const f of expense.participants) {
    friends[f].spent -= amt;
    if (f !== expense.payer) {
      friends[f].net += amt;
      friends[expense.payer].net -= amt;
    }
  }

  updateTotal(parseInt(tripId), trip.total);
  updateFriends(parseInt(tripId), JSON.stringify(friends));
  deleteExpenseFromDb(parseInt(expenseId));
  res.send({});
};

export const settle = async (req: Request, res: Response) => {
  const { tripId } = req.params;
  const trip = await getTrip(parseInt(tripId));
  const friends = trip.friends;
  const ret: Array<Array<string>> = [];
  const arr = [];
  for (const [f, data] of Object.entries(friends)) {
    arr.push({ name: f, net: data.net });
  }
  arr.sort((a, b) => a.net - b.net);

  while (arr.length >= 2) {
    const d: { name: string; net: number } | undefined = arr.shift();
    const c: { name: string; net: number } | undefined = arr.pop();

    const rem: number = (d?.net || 0) + (c?.net || 0);
    if (!isZero(rem)) {
      if (rem > 0) {
        arr.push({ net: rem, name: c?.name || '' });
      } else {
        arr.push({ net: rem, name: d?.name || '' });
      }
      arr.sort((a, b) => a.net - b.net);
    }

    const q: Array<string> = [];
    q.push(d?.name || '');
    q.push(c?.name || '');
    q.push(Math.min(Math.abs(d?.net || 0), Math.abs(c?.net || 0)).toFixed(2));
    ret.push(q);
  }

  res.send(ret);
};
