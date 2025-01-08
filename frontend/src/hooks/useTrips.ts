import { useState } from 'react';
import { request } from '../utilities/helper';

interface Trip {
  id: number;
  tripName: string;
  destination: string;
  startDate: string;
}

const useTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);

  const loadTrips = async () => {
    const res = await request.get('/trips');
    if (res.status !== 200) {
      return;
    }
    setTrips(res.data);
  };

  return {
    trips,
    loadTrips,
  };
};

export default useTrips;
