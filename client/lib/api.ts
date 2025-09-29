import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use((response) => response);

export const request = {
  get: async <T>(url: string, config = {}) => {
    const res = await api.get<T>(url, { ...config, withCredentials: true });
    return res.data;
  },
  post: async <T>(url: string, data?: any, config = {}) => {
    const res = await api.post<T>(url, data, {
      ...config,
      withCredentials: true,
    });
    return res.data;
  },
  put: async <T>(url: string, data?: any, config = {}) => {
    const res = await api.put<T>(url, data, {
      ...config,
      withCredentials: true,
    });
    return res.data;
  },
  delete: async <T>(url: string, config = {}) => {
    const res = await api.delete<T>(url, { ...config, withCredentials: true });
    return res.data;
  },
};
