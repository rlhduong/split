import 'express-session';

declare module 'express-session' {
  interface SessionData {
    visited?: boolean;
  }
}

export interface User {
  id: number;
  username: string;
  password: string;
}
