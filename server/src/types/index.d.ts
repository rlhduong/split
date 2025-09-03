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

interface TripData {
  id?: string;
  userId: string;
  name: string;
  startDate: string;
  endDate: string;
  destination: string;
  participants: Participant[];
  total: number;
}

interface ExpenseData {
  tripId: string;
  description: string;
  amount: number;
  date: string;
  payer: string;
  participants: string[];
}

declare global {
  namespace Express {
    interface Request {
      user?: SessionUser;
      trip?: TripData;
    }
  }
}
export { SessionUser, Participant, TripData, ExpenseData, User };
