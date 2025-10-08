'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { PlaneTakeoff, Notebook } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/service/userService';

type NavBarProps = {
  session?: { userId?: string } | null;
};

const NavBar = ({ session }: NavBarProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => userService.logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
      router.push('/signin');
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    },
  });

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link
          href="/"
          className="flex flex-row items-center gap-4 text-white-50"
        >
          <PlaneTakeoff />
          <span className="text-lg">Tripping</span>
        </Link>

        {session ? (
          <Link className="flex flex-row gap-2" href="/trips/plan">
            <Button className="text-white-50 hover:text-customgreys-darkGrey hover:bg-primary-700 cursor-pointer">
              <Notebook />
              New Trip
            </Button>
            <Button
              variant="ghost"
              className="text-white-50 hover:text-customgreys-darkGrey hover:bg-primary-700 cursor-pointer"
              onClick={() => mutate()}
            >
              Sign out
            </Button>
          </Link>
        ) : (
          <Link href="/signin">
            <Button
              variant="ghost"
              className="text-white-50 hover:text-customgreys-darkGrey hover:bg-primary-700 cursor-pointer"
            >
              Sign in
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
