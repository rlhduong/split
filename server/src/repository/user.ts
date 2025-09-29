import User from '../models/User.model';
import { v4 as uuidv4 } from 'uuid';
import { User as UserType } from '../types';

export const UserRepository = {
  createUser: async (email: string, password: string) => {
    const user = new User({
      id: uuidv4(),
      email,
      password,
    });

    await user.save();
    return user as unknown as UserType;
  },

  getUserByEmail: async (email: string) => {
    const users = await User.query('email').eq(email).using('email').exec();
    if (!users || users.length === 0) {
      return undefined;
    }

    return users[0] as unknown as UserType;
  },

  getUserById: async (id: string) => {
    const user = await User.get(id);
    if (!user) {
      return undefined;
    }
    return user as unknown as UserType;
  },
};
