'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { tripService } from '@/service/tripService';
import { useSession } from '@/hook/useSession';
import NavBar from '@/components/NavBar';
import Tab from './Tab';
import { Loader } from 'lucide-react';

const Page = () => {
  const { tripId } = useParams();
  const { data: session } = useSession();

  const { data: trip, isLoading } = useQuery({
    queryKey: ['trip', tripId],
    queryFn: () => tripService.getTripById(tripId as string),
    staleTime: 1 * 60 * 1000,
  });

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-customgreys-primarybg pb-10">
      <main className="flex flex-col flex-grow w-[90%] md:w-3/4 lg:w-2/3 gap-18">
        <NavBar session={session} />
        {isLoading ? (
          <div className="flex items-center justify-center flex-grow ">
            <Loader />
          </div>
        ) : (
          <div className="flex flex-col gap-8 w-full h-full flex-grow">
            <h1 className="text-white-50 text-3xl w-full">{trip?.name}</h1>
            <Tab trip={trip!} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Page;
