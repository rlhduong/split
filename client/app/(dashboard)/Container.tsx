import { useInfiniteQuery } from '@tanstack/react-query';
import { tripService } from '@/service/tripService';
import Card from './Card';
import Loader from '@/components/Loader';
import { useRef, useEffect } from 'react';

const Container = () => {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['trips'],
    queryFn: ({ pageParam }) => {
      return tripService.getTrips({ lastKey: pageParam });
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.lastKey || undefined,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const trips = data?.pages.flatMap((page) => page.trips) || [];

  if (error) return <div>Error loading trips</div>;
  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="dashboard-container relative">
        {trips.map((trip) => (
          <Card key={trip.id} trip={trip} />
        ))}
      </div>

      <div ref={loadMoreRef} className="w-full py-4 flex justify-center">
        {isFetchingNextPage && <Loader />}
      </div>
    </div>
  );
};

export default Container;
