import 'express-session';
export interface AppUser {
  id: number;
  username: string;
  password: string;
}

declare module 'express-session' {
  interface SessionData {
    visited?: boolean;
    user?: AppUser;
  }
}

declare global {
  namespace Express {
    interface User extends AppUser {}
  }
}
