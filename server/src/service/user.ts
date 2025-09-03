import { UserRepository } from '../repository/user';
import { cmpPassword, hashPassword } from '../lib/utils';

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
};
