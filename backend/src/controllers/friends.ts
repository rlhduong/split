import { Request, Response } from 'express';
import { getTrip } from '../db';

export const getFriends = async (req: Request, res: Response) => {
  const { tripId } = req.params;
  const trip = await getTrip(parseInt(tripId));
  res.send({ friends: trip.friends });
};
