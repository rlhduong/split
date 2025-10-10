interface SessionUser {
  userId: string;
}

interface Participant {
  name: string;
  spent: number;
  net: number;
}

interface User {
  id: string;
  email: string;
  password: string;
}

interface TripLocation {
  latitude: number;
  longitude: number;
  address: string;
}

interface ItineraryItem {
  title: string;
  notes?: string;
  time?: number;
}

interface TripDay {
  itineraries: ItineraryItem[];
}

interface TripData {
  id?: string;
  userId: string;
  name: string;
  startDate: number;
  endDate: number;
  destination: string;
  participants: Participant[];
  total: number;
  days: TripDay[];
  locations: TripLocation[];
  createdAt?: number;
}

interface ExpenseData {
  id?: string;
  tripId: string;
  category: string;
  description: string;
  amount: number;
  payer: string;
  participants: string[];
  createdAt?: number;
}

interface Settlement {
  from: string;
  to: string;
  amount: number;
}

type DynamoKey = Record<string, any>;

declare global {
  namespace Express {
    interface Request {
      user?: SessionUser;
      trip?: TripData;
      tripDates?: {
        startDate: number;
        endDate: number;
      };
    }
  }
}
export {
  SessionUser,
  Participant,
  TripData,
  ExpenseData,
  User,
  DynamoKey,
  Settlement,
};
