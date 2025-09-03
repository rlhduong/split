import Trip from '../models/Trip.model';
import { v4 as uuidv4 } from 'uuid';
import { TripData } from '../types';

export const TripRepository = {
  createTrip: async (newTrip: TripData) => {
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

  getTripsByUserId: async (userId: string) => {
    return await Trip.query('userId').eq(userId).exec();
  },

  deleteTrip: async (tripId: string) => {
    await Trip.delete(tripId);
    return tripId;
  },

  updateTrip: async (trip: Partial<TripData>) => {
    const { id, ...newData } = trip;
    return await Trip.update(id as string, { ...newData });
  },
};
