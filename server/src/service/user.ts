import { UserRepository } from '../repository/user';
import { cmpPassword, hashPassword } from '../lib/utils';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const id = process.env.GOOGLE_CLIENT_ID!;
const secret = process.env.GOOGLE_CLIENT_SECRET!;

const client = new OAuth2Client(id, secret, 'postmessage');

function generateSecurePassword(length = 16) {
  return crypto
    .randomBytes(length)
    .toString('base64') // base64 encoding
    .slice(0, length) // trim to desired length
    .replace(/\+/g, 'A') // replace '+' for URL-safe
    .replace(/\//g, 'B'); // replace '/' for URL-safe
}

export const UserService = {
  register: async (email: string, password: string) => {
    const existingUser = await UserRepository.getUserByEmail(email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    return UserRepository.createUser(email, hashPassword(password));
  },

  login: async (email: string, password: string) => {
    const user = await UserRepository.getUserByEmail(email);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (!cmpPassword(password, user.password)) {
      throw new Error('Invalid email or password');
    }

    return user;
  },

  getUserById: async (id: string) => {
    return UserRepository.getUserById(id);
  },
  googleLogin: async (code: string) => {
    const { tokens } = await client.getToken(code);

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new Error('Invalid token payload');
    }
    const { email } = payload;
    const existingUser = await UserRepository.getUserByEmail(email!);

    if (!existingUser) {
      return UserRepository.createUser(
        email!,
        hashPassword(generateSecurePassword())
      );
    }

    return existingUser;
  },
};
