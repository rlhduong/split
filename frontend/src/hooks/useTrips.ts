import { useState } from 'react';
import { request } from '../utilities/helper';

export interface Trip {
  id: number;
  trip_name: string;
  destination: string;
  start_date: string;
}

const useTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);

  const loadTrips = async () => {
    const res = await request.get('/trips');
    if (res.status !== 200) {
      return;
    }
    console.log(res.data);
    setTrips(res.data);
  };

  return {
    trips,
    loadTrips,
  };
};

export default useTrips;
