import { useQuery } from '@tanstack/react-query';
import { tripService } from '@/service/tripService';
import Card from './Card';
import Loader from '@/components/Loader';

const Container = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['trips'],
    queryFn: tripService.getTrips,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
  if (error) return <div>Error loading trips</div>;
  if (isLoading) return <Loader />;
  return (
    <div className="dashboard-container">
      {data?.trips.map((trip) => (
        <Card key={trip.id} trip={trip} />
      ))}
    </div>
  );
};

export default Container;
