import { NextFunction, Request, Response } from 'express';
import HttpError from 'http-errors';
import { getTrip, updateFriends } from '../db';

export const getFriends = async (req: Request, res: Response) => {
  const { tripId } = req.params;
  const trip = await getTrip(parseInt(tripId));
  res.send(trip.friends);
};

export const addFriend = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { tripId } = req.params;
  const { friend } = req.body;
  const trip = await getTrip(parseInt(tripId));

  let friends = JSON.parse(trip.friends);

  if (friend in friends) {
    next(HttpError(400, `${friend} is already in the trip`));
    return;
  }

  friends[friend] = {};
  updateFriends(parseInt(tripId), JSON.stringify(friends));
  res.send({});
};
