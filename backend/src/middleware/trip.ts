import { Response, Request, NextFunction } from 'express';
import HttpError from 'http-errors';
import { getTrip } from '../db';

export const tripValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { tripId } = req.body;
  const trip = await getTrip(tripId);
  if (!trip) {
    next(HttpError(404, 'This trip does not exist'));
    return;
  }

  if (trip.user_id !== req.session.passport?.user) {
    next(HttpError(403, 'You do not own this trip'));
    return;
  }
  next();
};
