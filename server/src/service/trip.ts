import { decodeCursor, encodeCursor } from '../lib/utils';
import { TripRepository } from '../repository/trip';
import { TripData } from '../types';

export const TripService = {
  createTrip: async (newTrip: TripData) => {
    return await TripRepository.createTrip(newTrip);
  },
  getTripById: async (tripId: string) => {
    return await TripRepository.getTripById(tripId);
  },
  getTripsByUserId: async (userId: string, lastkey: string, limit: number) => {
    if (lastkey) {
      const key = decodeCursor(lastkey);
      const trips = await TripRepository.getTripsByUserIdWithStart(
        userId,
        limit,
        key
      );
      return { trips, lastkey: encodeCursor(trips.lastKey) };
    } else {
      const trips = await TripRepository.getTripsByUserId(userId, limit);
      return { trips, lastkey: encodeCursor(trips.lastKey) };
    }
  },
  deleteTrip: async (tripId: string) => {
    return await TripRepository.deleteTrip(tripId);
  },
  addParticipant: async (trip: TripData, name: string) => {
    if (
      trip.participants &&
      trip.participants.find((p: { name: string }) => p.name === name)
    ) {
      throw new Error(`${name} already exists`);
    }

    trip.participants.push({ name, spent: 0, net: 0 });

    return await TripRepository.updateTrip(trip);
  },
  validateTrip: async (tripId: string, userId: string) => {
    const trip = await TripRepository.getTripById(tripId);
    if (!trip) {
      throw new Error('Trip not found');
    }

    if (trip.userId !== userId) {
      throw new Error('Forbidden');
    }

    return trip;
  },
};
