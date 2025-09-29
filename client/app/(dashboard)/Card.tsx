import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Calendar } from 'lucide-react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';

const TripCard = ({ trip }: { trip: TripData }) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onClick={() => router.push(`/trips/${trip.id}`)}
    >
      <Card className="trip-card gap-0">
        <CardHeader className="px-0">
          <CardTitle className="text-lg font-semibold">{trip.name}</CardTitle>
        </CardHeader>
        <CardDescription className=" text-gray-400">
          {trip.destination}
        </CardDescription>
        <CardDescription className=" text-gray-400">
          <Calendar className="inline mr-2 mb-1" size={16} />
          {format(new Date(trip.startDate), 'dd/MM/yyyy')} -{' '}
          {format(new Date(trip.endDate), 'dd/MM/yyyy')}
        </CardDescription>
      </Card>
    </motion.div>
  );
};

export default TripCard;
