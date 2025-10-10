import { Response, Request, NextFunction } from 'express';
import { TripService } from '../service/trip';
import { TripData } from '../types';
import { encodeDateToUnix } from '../lib/utils';

export const validateTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.userId as string;
  const tripId = req.params.tripId;

  try {
    const trip = await TripService.validateTrip(tripId, userId);
    req.trip = trip as unknown as TripData;
    req.tripDates = {
      startDate: encodeDateToUnix(trip.startDate),
      endDate: encodeDateToUnix(trip.endDate),
    };
    next();
  } catch (error: any) {
    if (error.message === 'Trip not found') {
      res.status(404).json({ message: 'Trip not found' });
    } else if (error.message === 'Forbidden') {
      res.status(403).json({ message: 'Forbidden' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
