import Trip from '../models/Trip.model';
import { v4 as uuidv4 } from 'uuid';
import { DynamoKey, TripData } from '../types';

export const TripRepository = {
  createTrip: async (newTrip: Partial<TripData>) => {
    const trip = new Trip({
      id: uuidv4(),
      ...newTrip,
    });
    await trip.save();
    return trip;
  },

  getTripById: async (tripId: string) => {
    return await Trip.get(tripId);
  },

  getTripsByUserId: async (userId: string, limit: number) => {
    return await Trip.query('userId')
      .eq(userId)
      .limit(limit)
      .sort('descending')
      .exec();
  },

  getTripsByUserIdWithStart: async (
    userId: string,
    limit: number,
    lastKey: DynamoKey
  ) => {
    return await Trip.query('userId')
      .eq(userId)
      .limit(limit)
      .startAt(lastKey)
      .sort('descending')
      .exec();
  },

  deleteTrip: async (tripId: string) => {
    await Trip.delete(tripId);
    return tripId;
  },

  updateTrip: async (tripId: string, updates: Partial<TripData>) => {
    const trip = await Trip.update({ id: tripId }, updates);
    return trip;
  },
};
