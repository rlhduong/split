import { request } from '@/lib/api';

export const userService = {
  login: (data: { email: string; password: string }) =>
    request.post('/users/login', data),

  register: (data: { email: string; password: string }) =>
    request.post('/users/register', data),

  logout: () => request.post('/users/logout'),

  status: async () => {
    const res = await request.get('/users/status');
    return res as Session | null;
  },
};
