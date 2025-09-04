import { Request, Response } from 'express';
import { TripService } from '../service/trip';
import { encodeCursor } from '../lib/utils';

export const createTrip = async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;
  const { name, destination, startDate, endDate } = req.body;

  try {
    const trip = await TripService.createTrip({
      userId,
      name,
      startDate,
      endDate,
      destination,
      total: 0,
      participants: [],
    });
    res
      .status(200)
      .json({ message: 'Trip created successfully', tripId: trip.id });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTrip = async (req: Request, res: Response) => {
  try {
    const trip = req.trip!;
    res.status(200).json({ trip });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTrips = async (req: Request, res: Response) => {
  const lastKeyRaw = req.query.lastKey;
  const limitRaw = req.query.limit;

  const lastKey = typeof lastKeyRaw === 'string' ? lastKeyRaw : '';
  const limit = typeof limitRaw === 'string' ? Number(limitRaw) : 10;
  const userId = req.user?.userId!;

  try {
    const data = await TripService.getTripsByUserId(userId, lastKey, limit);
    res.status(200).json({ trips: data.trips, lastKey: data.lastkey });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteTrip = async (req: Request, res: Response) => {
  const tripId = req.params.tripId;

  try {
    await TripService.deleteTrip(tripId);
    res.status(200).json({ message: 'Trip deleted successfully', tripId });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const addParticipant = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const trip = req.trip!;
    await TripService.addParticipant(trip, name);
    res
      .status(200)
      .json({ message: 'Participant added successfully', tripId: trip.id });
  } catch (error: any) {
    if (error.message === `${name} already exists`) {
      res.status(400).json({ message: `${name} already exists` });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
