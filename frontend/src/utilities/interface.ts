export interface SimpleTrip {
  id: number;
  trip_name: string;
  destination: string;
  start_date: string;
}

export interface TripInfo {
  id: number;
  trip_name: string;
  destination: string;
  start_date: string;
  friends: string;
  total: number;
}

export interface TripInfoProps {
  trip: TripInfo;
}
