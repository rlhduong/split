import { Request, Response, NextFunction } from 'express';
import HttpError from 'http-errors';
import { getTrip, updateFriends, updateTotal } from '../db';

export const addExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { tripId } = req.params;
  const { payer, involved, amount, size } = req.body;
  const trip = await getTrip(parseInt(tripId));

  let friends = trip.friends;
  const amt = amount / size;

  if (!(payer in friends)) {
    next(HttpError(400, `${payer} is not inside the trip`));
    return;
  }

  for (const f of involved) {
    if (!(f in friends)) {
      next(HttpError(400, `${f} is not inside the trip`));
      return;
    }
  }

  for (const f of involved) {
    friends[f].spent += amt;
    if (f !== payer) {
      friends[f].net -= amt;
      friends[payer].net += amt;
    }
  }

  console.log(friends);

  updateTotal(parseInt(tripId), trip.total + amount);
  updateFriends(parseInt(tripId), JSON.stringify(friends));
  res.send({});
};
