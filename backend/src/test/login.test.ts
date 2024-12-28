import { describe, expect, test, beforeAll } from '@jest/globals';
import { user, POST, DELETE } from './helper';

beforeAll(async () => {
  await DELETE('/clear');
  await POST('/admin/auth/register', user);
});

describe('login', () => {
  test('Invalid username', async () => {
    let res = await POST('/admin/auth/login', { ...user, username: 'a' });
    expect(res.status).toBe(401);
  });

  test('Invalid password', async () => {
    let res = await POST('/admin/auth/login', {
      ...user,
      password: '123456',
    });
    expect(res.status).toBe(401);

    res = await POST('/admin/auth/login', { ...user, password: '1234567' });
    expect(res.status).toBe(401);

    res = await POST('/admin/auth/login', {
      ...user,
      password: '1234567test',
    });
    expect(res.status).toBe(401);
  });

  test('Valid login', async () => {
    const res = await POST('/admin/auth/login', user);
    expect(res.status).toBe(200);
  });
});
