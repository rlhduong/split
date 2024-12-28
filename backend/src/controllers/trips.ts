import { Request, Response } from 'express';
import { insertTrip, getTripsByUser, deleteTrip as deleteTripByID } from '../db';

export const createTrip = async (req: Request, res: Response) => {
  const { destination, start_date } = req.body;
  insertTrip(
    req.session.passport?.user || 0,
    destination,
    start_date
  );
  res.send({});
};

export const getTrips = async (req: Request, res: Response) => {
  const trips = await getTripsByUser(
    req.session.passport?.user || 0
  );
  res.send({trips});
};

export const deleteTrip = async (req: Request, res: Response) => {
  const { tripId } = req.body;
  deleteTripByID(tripId);
  res.send({});
}
