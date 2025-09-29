import { useQuery } from '@tanstack/react-query';
import { userService } from '@/service/userService';

export const useSession = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: userService.status,
    staleTime: 2 * 60 * 1000,
  });
};
