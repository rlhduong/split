import { describe, expect, test, beforeEach } from '@jest/globals';
import { user, POST, DELETE } from './helper';

beforeEach(async () => {
  await DELETE('/clear');
});

describe('register', () => {
  test('Invalid username', async () => {
    let res = await POST('/admin/auth/register', { ...user, username: 'a' });
    expect(res.status).toBe(400);

    res = await POST('/admin/auth/register', {
      ...user,
      username: 'a'.repeat(21),
    });
    expect(res.status).toBe(400);
  });

  test('Invalid password', async () => {
    let res = await POST('/admin/auth/register', {
      ...user,
      password: '123456',
    });
    expect(res.status).toBe(400);

    res = await POST('/admin/auth/register', { ...user, password: '1234567' });
    expect(res.status).toBe(400);

    res = await POST('/admin/auth/register', {
      ...user,
      password: '1234567test',
    });
    expect(res.status).toBe(400);
  });

  test('Valid registration', async () => {
    const res = await POST('/admin/auth/register', user);
    expect(res.status).toBe(200);
  });
});
