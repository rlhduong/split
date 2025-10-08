'use client';

import React from 'react';
import NavBar from '@/components/NavBar';
import Dashboard from './(dashboard)/Dashboard';
import Landing from './(landing)/Landing';
import { useSession } from '@/hook/useSession';

const Page = () => {
  const { data: session, isLoading } = useSession();

  return (
    <div className="flex flex-row justify-center w-full min-h-screen bg-customgreys-primarybg pb-20">
      <main className="flex flex-col h-full w-[90%] md:w-3/4 lg:w-2/3 gap-18">
        <NavBar session={session} isLoading={isLoading} />
        {!isLoading && (session ? <Dashboard /> : <Landing />)}
      </main>
    </div>
  );
};

export default Page;
