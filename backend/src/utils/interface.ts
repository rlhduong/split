import 'express-session';
export interface AppUser {
  id: number;
  username: string;
  password: string;
}

export interface Friends {
  [key: string]: { spent: number; net: number };
}

export interface DbTrip {
  id: number;
  user_id: number;
  trip_name: string;
  destination: string;
  start_date: string;
  friends: string;
  total: number;
}

export interface DbExpense {
  id: number;
  trip_id: number;
  description: string;
  amount: number;
  payer: string;
  participants: string;
}

export interface AppTrip {
  id: number;
  trip_name: string;
  user_id: number;
  destination: string;
  start_date: string;
  friends: Friends;
  total: number;
}

export interface AppExpense {
  id: number;
  trip_id: number;
  description: string;
  amount: number;
  payer: string;
  participants: string[];
}

declare module 'express-session' {
  interface SessionData {
    passport: { user: number };
  }
}

declare global {
  namespace Express {
    interface User extends AppUser {}
    interface Trip extends AppTrip {}
    interface Expense extends AppExpense {}
  }
}
