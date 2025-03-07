import passport from 'passport';
import { Strategy } from 'passport-local';
import { cmpPassword } from '../utils/helper';
import { getUser, getUserById } from '../db';
import HttpError from 'http-errors';


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  const user = await getUserById(id);
  done(null, user);
});

export default passport.use(
  new Strategy(async (username: string, password: string, done: any) => {
    const user = await getUser(username);

    if (!user || !cmpPassword(password, user.password)) {
      return done(HttpError(401, 'Invalid username or password'), null);
    }

    return done(null, user);
  })
);
