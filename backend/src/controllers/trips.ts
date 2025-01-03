import { Request, Response, NextFunction } from 'express';
import {
  insertTrip,
  getTripsByUser,
  deleteTrip as deleteTripByID,
  updateTrip,
  getTrip,
  updateFriends
} from '../db';
import HttpError from 'http-errors';

export const createTrip = async (req: Request, res: Response) => {
  const { destination, startDate } = req.body;
  insertTrip(req.session.passport?.user || 0, destination, startDate);
  res.send({});
};

export const getTrips = async (req: Request, res: Response) => {
  const trips = await getTripsByUser(req.session.passport?.user || 0);
  res.send(trips);
};

export const viewTrip = async (req: Request, res: Response) => {
  const { tripId } = req.params;
  const trip = await getTrip(parseInt(tripId));
  res.send(trip);
};

export const deleteTrip = async (req: Request, res: Response) => {
  deleteTripByID(parseInt(req.params.tripId));
  res.send({});
};

export const updateTripA = async (req: Request, res: Response) => {
  const { destination, startDate } = req.body;
  updateTrip(parseInt(req.params.tripId), destination, startDate);
  res.send({});
};

export const addFriend = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { tripId } = req.params;
  const { friend } = req.body;
  const trip = await getTrip(parseInt(tripId));

  const friends = trip.friends;

  if (friend in friends) {
    next(HttpError(400, `${friend} is already in the trip`));
    return;
  }

  friends[friend] = {spent: 0.00, net: 0.00};
  updateFriends(parseInt(tripId), JSON.stringify(friends));
  res.send({});
};