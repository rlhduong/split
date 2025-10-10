import { columns } from './column';
import { DataTable } from './data-table';
import TravellerForm from './TravellerForm';

const TravellerList = ({
  tripId,
  travellers,
}: {
  tripId: string;
  travellers: Participant[];
}) => {
  return (
    <div className="flex flex-col flex-1 sm:flex-2">
      <TravellerForm tripId={tripId} />
      <DataTable columns={columns} data={travellers} />
    </div>
  );
};

export default TravellerList;
