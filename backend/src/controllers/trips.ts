import { Request, Response } from 'express';
import {
  insertTrip,
  getTripsByUser,
  deleteTrip as deleteTripByID,
  updateTrip,
  getTrip,
} from '../db';

export const createTrip = async (req: Request, res: Response) => {
  const { destination, startDate } = req.body;
  insertTrip(req.session.passport?.user || 0, destination, startDate);
  res.send({});
};

export const getTrips = async (req: Request, res: Response) => {
  const trips = await getTripsByUser(req.session.passport?.user || 0);
  res.send({ trips });
};

export const viewTrip = async (req: Request, res: Response) => {
  const { tripId } = req.params;
  const trip = await getTrip(parseInt(tripId));
  res.send({ trip });
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
