import { request } from '@/lib/api';

export const tripService = {
  getTrips: async ({ lastKey }: { lastKey: string }) => {
    const res = await request.get('/trips', { params: { lastKey, limit: 20 } });
    return res as {
      trips: TripData[];
      lastKey: string;
    };
  },
  getTripById: async (id: string) => {
    const res = await request.get<{ trip: TripData }>(`/trips/${id}`);
    return res.trip;
  },
  createTrip: (data: {
    name: string;
    startDate: string;
    endDate: string;
    destination?: string;
  }) => request.post('/trips', data),
  deleteTrip: (id: string) => request.delete(`/trips/${id}`),
  addParticipant: (tripId: string, name: string) =>
    request.post(`/trips/${tripId}/participants`, { name }),
  updateTrip: (tripId: string, data: Partial<TripData>) =>
    request.put(`/trips/${tripId}`, data),
};
