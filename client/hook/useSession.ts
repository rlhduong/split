import { useQuery } from '@tanstack/react-query';
import { userService } from '@/service/userService';
import { isAxiosError } from 'axios';

async function statusFn() {
  try {
    const r = await userService.status();
    return r?.userId ? r : null;
  } catch (e: unknown) {
    if (isAxiosError(e) && e.response?.status === 401) {
      return null; // handle unauthorized
    }
    throw e; // rethrow other errors
  }
}

export const useSession = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: statusFn,
    staleTime: 2 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
