import { decodeCursor, decodeUnixToDate, encodeCursor } from '../lib/utils';
import { TripRepository } from '../repository/trip';
import { TripData } from '../types';
import { encodeDateToUnix } from '../lib/utils';

export const TripService = {
  createTrip: async (
    newTrip: Partial<TripData>,
    dates: { startDate: string; endDate: string }
  ) => {
    newTrip.createdAt = encodeDateToUnix(new Date().toISOString());
    newTrip.days = [];
    newTrip.participants = [];
    newTrip.total = 0;
    newTrip.locations = [];
    newTrip.startDate = encodeDateToUnix(dates.startDate);
    newTrip.endDate = encodeDateToUnix(dates.endDate);
    return await TripRepository.createTrip(newTrip);
  },
  getTripById: async (tripId: string) => {
    const trip = await TripRepository.getTripById(tripId);
    trip.startDate = decodeUnixToDate(trip.startDate);
    trip.endDate = decodeUnixToDate(trip.endDate);
    trip.createdAt = decodeUnixToDate(trip.createdAt);
    return trip;
  },
  getTripsByUserId: async (userId: string, lastkey: string, limit: number) => {
    const key = lastkey ? decodeCursor(lastkey) : null;
    const trips = await TripRepository.getTripsByUserId(userId, limit, key);
    for (const trip of trips) {
      trip.startDate = decodeUnixToDate(trip.startDate);
      trip.endDate = decodeUnixToDate(trip.endDate);
      trip.createdAt = decodeUnixToDate(trip.createdAt);
    }
    return { trips, lastkey: encodeCursor(trips.lastKey) };
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

    return await TripRepository.updateTrip(trip.id!, {
      participants: trip.participants,
    });
  },
  validateTrip: async (tripId: string, userId: string) => {
    const trip = await TripRepository.getTripById(tripId);
    if (!trip) {
      throw new Error('Trip not found');
    }

    if (trip.userId !== userId) {
      throw new Error('Forbidden');
    }
    trip.startDate = new Date(trip.startDate * 1000).toISOString();
    trip.endDate = new Date(trip.endDate * 1000).toISOString();
    trip.createdAt = new Date(trip.createdAt * 1000).toISOString();
    return trip;
  },

  updateTrip: async (
    trip: Partial<TripData>,
    dates: { startDate: string; endDate: string }
  ) => {
    const updates: Record<string, any> = {};
    if (trip.name !== undefined) {
      updates.name = trip.name;
    }
    if (trip.destination !== undefined) {
      updates.destination = trip.destination;
    }
    if (dates.startDate !== undefined) {
      updates.startDate = encodeDateToUnix(dates.startDate);
    }
    if (dates.endDate !== undefined) {
      updates.endDate = encodeDateToUnix(dates.endDate);
    }
    if (trip.days !== undefined) {
      updates.days = trip.days;
    }
    if (trip.locations !== undefined) {
      updates.locations = trip.locations;
    }

    return await TripRepository.updateTrip(trip.id!, updates);
  },
};
