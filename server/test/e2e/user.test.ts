import { request, clearAll } from './helper';
import { user1, user2 } from '../data/user';

beforeEach(async () => {
  await clearAll();
});

describe('User Endpoints', () => {
  describe('POST /users/register', () => {
    test('success', async () => {
      const res1 = await request({
        path: '/users/register',
        method: 'POST',
        body: {
          email: user1.email,
          password: user1.password,
        },
      });
      expect(res1.status).toBe(200);
      expect(res1.setCookies).toHaveLength(1);

      const res2 = await request({
        path: '/users/register',
        method: 'POST',
        body: {
          email: user2.email,
          password: user2.password,
        },
      });
      expect(res2.status).toBe(200);
      expect(res2.setCookies).toHaveLength(1);
    });
    test('fail - duplicate email', async () => {
      const res = await request({
        path: '/users/register',
        method: 'POST',
        body: {
          email: user1.email,
          password: user1.password,
        },
      });
      expect(res.status).toBe(200);
      expect(res.setCookies).toHaveLength(1);

      const res1 = await request({
        path: '/users/register',
        method: 'POST',
        body: {
          email: user1.email,
          password: user1.password,
        },
      });
      expect(res1.status).toBe(409);
      expect(res1.setCookies).toHaveLength(0);
    });
  });
  describe('POST /users/login', () => {
    test('success', async () => {
      await request({
        path: '/users/register',
        method: 'POST',
        body: {
          email: user1.email,
          password: user1.password,
        },
      });
      const res = await request({
        path: '/users/login',
        method: 'POST',
        body: {
          email: user1.email,
          password: user1.password,
        },
      });
      expect(res.status).toBe(200);
      expect(res.setCookies).toHaveLength(1);
    });
    test('fail - wrong password', async () => {
      request({
        path: '/users/register',
        method: 'POST',
        body: {
          email: user1.email,
          password: user1.password,
        },
      });
      const res = await request({
        path: '/users/login',
        method: 'POST',
        body: {
          email: user1.email,
          password: user2.password,
        },
      });
      expect(res.status).toBe(401);
      expect(res.setCookies).toHaveLength(0);
    });
    test('fail - wrong email', async () => {
      await request({
        path: '/users/register',
        method: 'POST',
        body: {
          email: user1.email,
          password: user1.password,
        },
      });
      const res = await request({
        path: '/users/login',
        method: 'POST',
        body: {
          email: user2.email,
          password: user1.password,
        },
      });
      expect(res.status).toBe(401);
      expect(res.setCookies).toHaveLength(0);
    });
  });
  describe('GET /users/status', () => {
    test('sucess', async () => {
      const reg = await request({
        path: '/users/register',
        method: 'POST',
        body: {
          email: user1.email,
          password: user1.password,
        },
      });

      const cookies = reg.setCookies;
      const res = await request({
        path: '/users/status',
        method: 'GET',
        cookies,
      });
      expect(res.status).toBe(200);
    });
    test('failure', async () => {
      const res = await request({
        path: '/users/status',
        method: 'GET',
      });
      expect(res.status).toBe(401);
    });
  });
  describe('POST /users/logout', () => {
    test('success', async () => {
      const reg = await request({
        path: '/users/register',
        method: 'POST',
        body: {
          email: user1.email,
          password: user1.password,
        },
      });

      const cookies = reg.setCookies;
      const res = await request({
        path: '/users/logout',
        method: 'POST',
        cookies,
      });
      expect(res.status).toBe(200);
    });
    test('failure', async () => {
      const res = await request({
        path: '/users/logout',
        method: 'POST',
      });
      expect(res.status).toBe(401);
    });
  });
});
