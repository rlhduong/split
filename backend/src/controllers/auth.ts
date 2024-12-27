import { getUser } from '../utils/helper';
import HttpError from 'http-errors';
import { insertUser } from '../db';

export const handleRegister = async (username: string, password: string) => {
  const user = await getUser(username);
  if (user) {
    throw HttpError(400, 'User already exists');
  }

  insertUser(username, password);
  return { message: 'User registered' };
};

export const handleLogin = async (username: string, password: string) => {
  const user = await getUser(username);
  if (!user || user.password !== password) {
    throw HttpError(400, 'Invalid username or password');
  }

  return { message: 'Login successful' };
};

