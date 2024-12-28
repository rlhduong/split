import 'express-session';
export interface AppUser {
  id: number;
  username: string;
  password: string;
}

export interface AppTrip {
  id: number;
  user_id: number;
  destination: string;
  start_date: string;
  total: number;
}

declare module 'express-session' {
  interface SessionData {
    passport: {user:number};
  }
}

declare global {
  namespace Express {
    interface User extends AppUser {}
    interface Trip extends AppTrip {}
  }
}
