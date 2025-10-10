'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { userService } from '@/service/userService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';

const GoogleSignInButton = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (code: string) => userService.googleLogin({ code }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      router.push('/');
    },
  });

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async ({ code }) => {
      mutate(code);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <Button
      onClick={() => googleLogin()}
      disabled={isPending}
      variant="outline"
      className="w-full mt-4 bg-customgreys-secondarybg border-none outline-none text-white-50 hover:!bg-primary-700 hover:text-customgreys-darkGrey cursor-pointer flex items-center justify-center"
    >
      <Image src="/icons/google.svg" alt="Google" className="w-4 h-4 mr-2" width={16} height={16} />
      {isPending && <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />}
      Sign in with Google
    </Button>
  );
};

export default GoogleSignInButton;
