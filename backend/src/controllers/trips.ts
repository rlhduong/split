import { Request, Response} from 'express';
import { insertTrip } from '../db';

const trips = [
  { id: 1, name: 'trip 1' },
  { id: 2, name: 'trip 2' },
  { id: 3, name: 'trip 3' },
];

export const createTrip = async (
  req: Request,
  res: Response,
) => {
  const { destination, start_date } = req.body;
  insertTrip(
    req.session.passport ? req.session.passport.user : 0,
    destination,
    start_date
  );
  res.send({});
};

export const getTrips = async (
  req: Request,
  res: Response
) => {
  res.json(trips);
};
