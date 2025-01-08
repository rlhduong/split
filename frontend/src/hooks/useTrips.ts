import { useState } from 'react';
import { request } from '../utilities/helper';
import { SimpleTrip } from '../utilities/interface';

const useTrips = () => {
  const [trips, setTrips] = useState<SimpleTrip[]>([]);

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
