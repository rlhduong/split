import { UserService } from '../../src/service/user';
import { UserRepository } from '../../src/repository/user';
import { user1, user2 } from '../data/user';
import * as hashUtils from '../../src/lib/utils';

jest.mock('../../src/repository/user');
const mockedUserRepository = UserRepository as jest.Mocked<
  typeof UserRepository
>;

beforeEach(() => jest.clearAllMocks());

describe('UserService', () => {
  describe('register', () => {
    test('success', async () => {
      mockedUserRepository.getUserByEmail.mockResolvedValue(undefined);
      mockedUserRepository.createUser.mockResolvedValue(user1);

      const newUser = await UserService.register(user1.email, user1.password);
      expect(mockedUserRepository.getUserByEmail).toHaveBeenCalledWith(
        user1.email
      );
      expect(mockedUserRepository.createUser).toHaveBeenCalledWith(
        user1.email,
        expect.any(String)
      );
    });
    test('fail - user already exists', async () => {
      mockedUserRepository.getUserByEmail.mockResolvedValue(user1);

      await expect(
        UserService.register(user1.email, user1.password)
      ).rejects.toThrow('User already exists');
      expect(mockedUserRepository.getUserByEmail).toHaveBeenCalledWith(
        user1.email
      );
      expect(mockedUserRepository.createUser).not.toHaveBeenCalled();
    });
  });
  describe('login', () => {
    test('success', async () => {
      jest.spyOn(hashUtils, 'cmpPassword').mockReturnValue(true);
      mockedUserRepository.getUserByEmail.mockResolvedValue(user1);
      const user = await UserService.login(user1.email, user1.password);
      expect(user).toEqual(user1);
    });
    test('fail - invalid password', async () => {
      jest.spyOn(hashUtils, 'cmpPassword').mockReturnValue(false);
      mockedUserRepository.getUserByEmail.mockResolvedValue(user1);

      await expect(
        UserService.login(user1.email, user1.password)
      ).rejects.toThrow('Invalid email or password');
      expect(mockedUserRepository.getUserByEmail).toHaveBeenCalledWith(
        user1.email
      );
    });
    test('fail - user not found', async () => {
      mockedUserRepository.getUserByEmail.mockResolvedValue(undefined);

      await expect(
        UserService.login(user2.email, user2.password)
      ).rejects.toThrow('Invalid email or password');
      expect(mockedUserRepository.getUserByEmail).toHaveBeenCalledWith(
        user2.email
      );
    });
  });
});
