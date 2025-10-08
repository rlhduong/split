'use client';

import Link from 'next/link';
import { Loader2Icon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginFormData, loginSchema } from '@/lib/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { userService } from '@/service/userService';
import GoogleSignInButton from '../GoogleSignInButton';

const Page = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({ email, password }: LoginFormData) =>
      userService.login({ email, password }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      router.push('/');
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <div className="flex flex-row w-full min-h-screen justify-center items-center bg-customgreys-primarybg">
      <main className="auth-form">
        <div className="flex flex-col w-full gap-4">
          <h1 className="auth-form__header">Welcome back</h1>
          <div className="flex flex-row gap-3 text-gray-500">
            <p>Don&#39;t have an account?</p>
            <Link href="/register" className="underline text-primary-600">
              Sign up
            </Link>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 gap-4 w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormControl>
                    <Input
                      {...field}
                      className="form__input"
                      placeholder="Email"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormControl>
                    <Input
                      {...field}
                      className="form__input"
                      type="password"
                      placeholder="Password"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-primary-600 w-full hover:!bg-primary-700 text-customgreys-darkGrey cursor-pointer"
              disabled={isPending}
            >
              {isPending ? <Loader2Icon className="animate-spin" /> : null}
              Sign in
            </Button>
          </form>
        </Form>

        <div className="flex flex-row justify-between items-center gap-3 mt-2 w-full">
          <hr className="flex-grow" />
          <p className="text-sm text-gray-500">Or continue with</p>
          <hr className="flex-grow" />
        </div>

        <GoogleSignInButton />
        {isError && (
          <p className="text-red-400 text-sm mt-2">
            Login failed. Please check your credentials and try again.
          </p>
        )}
      </main>
    </div>
  );
};

export default Page;
