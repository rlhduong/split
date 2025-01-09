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
  friends: { [key: string]: Friend };
  total: number;
}

export interface TripInfoProps {
  trip: TripInfo;
}

export interface Friend {
  total: number;
  net: number;
}

export interface FriendCardProps {
  friend: Friend;
  name: string;
}

export interface FriendListProps {
  friends: { [key: string]: Friend };
}
