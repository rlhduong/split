import { useQuery } from '@tanstack/react-query';
import { ExpenseService } from '@/service/expenseService';
import Loader from '@/components/Loader';

const SettleTab = ({ tripId, total }: { tripId: string; total: number }) => {
  const { data: settlements, isLoading } = useQuery({
    queryKey: ['settlements', tripId],
    queryFn: async () => {
      const res = await ExpenseService.settle(tripId);
      return res;
    },
    staleTime: 10 * 60 * 1000,
  });
  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-row">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold ">Settlements</h3>
          <p className="text-sm text-gray-400">
            Review and confirm the settlements for this trip.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Total</h3>
          <p className="text-4xl text-gray-400">${total.toFixed(2)}</p>
        </div>
      </div>
      <ol className="list-inside w-full">
        {settlements?.map((settlement, index) => (
          <li key={`settle-${index}`} className="mb-2">
            <span className="text-primary-500 font-semibold">
              {settlement.from}
            </span>{' '}
            pays{' '}
            <span className="text-primary-500 font-semibold">
              {settlement.to}
            </span>{' '}
            <span className="text-primary-600">
              ${settlement.amount.toFixed(2)}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default SettleTab;
