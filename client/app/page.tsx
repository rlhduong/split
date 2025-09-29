'use client';

import React from 'react';
import NavBar from '@/components/NavBar';
import Dashboard from './(dashboard)/Dashboard';
import { useSession } from '@/hook/useSession';


const page = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-row justify-center w-full min-h-screen bg-customgreys-primarybg">
      <main className="flex flex-col h-full w-[90%] md:w-3/4 lg:w-2/3 gap-18">
        <NavBar session={session} />
        <Dashboard />
      </main>
    </div>
  );
};

export default page;
