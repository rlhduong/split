import { Calendar } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import Map from './(components)/Map';

const Overview = ({ trip }: TripProps) => {
  return (
    <div className="trip-details__tab_content flex-col h-full flex-1 p-4">
      <h1 className="text-lg font-semibold text-gray-300">Trip Summary</h1>
      <div className="flex flex-row gap-2">
        <Calendar size={19} className="mt-0.5" />
        <div className="flex flex-col">
          <h1>Dates</h1>
          <p className="text-[0.8rem]">
            {format(new Date(trip.startDate), 'dd/MM/yyyy')} -{' '}
            {format(new Date(trip.endDate), 'dd/MM/yyyy')}
          </p>
          <p className="text-[0.8rem] text-gray-300">
            {`${
              differenceInDays(
                new Date(trip.endDate),
                new Date(trip.startDate)
              ) + 1
            }
                days`}
          </p>
        </div>
      </div>
      <Map locations={trip.locations} tripId={trip.id!} />
    </div>
  );
};

export default Overview;
