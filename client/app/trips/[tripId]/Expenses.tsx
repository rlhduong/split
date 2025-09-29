'use client';

import TravellerList from './(components)/(traveller)/TravellerList';
import { ExpenseService } from '@/service/expenseService';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HandCoins, ChartBar } from 'lucide-react';
import ExpenseList from './(components)/(expenses)/ExpenseList';
import Loader from '@/components/Loader';
import SettleTab from './(components)/(expenses)/SettleTab';
import SpendingsTab from './(components)/(expenses)/SpendingsTab';

const Expenses = ({ trip }: TripProps) => {
  const { data: expenses, isLoading } = useQuery({
    queryKey: ['expenses', trip.id],
    queryFn: async () => {
      const res = await ExpenseService.getExpensesByTripId(trip.id!);
      return res;
    },
    staleTime: 10 * 60 * 1000,
  });

  return (
    <div className="flex-grow flex flex-col mt-4 gap-4">
      <div className="flex flex-col gap-2 sm:flex-row w-full">
        <TravellerList travellers={trip.participants} tripId={trip.id!} />
        <MyTabs total={trip.total} tripId={trip.id!} expenses={expenses!} />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <ExpenseList
          expenses={expenses!}
          tripId={trip.id!}
          participants={trip.participants}
        />
      )}
    </div>
  );
};

export default Expenses;

const MyTabs = ({
  total,
  tripId,
  expenses,
}: {
  total: number;
  tripId: string;
  expenses: ExpenseData[];
}) => {
  return (
    <Tabs
      defaultValue="settle"
      className="flex-1 sm:flex-3 p-4 rounded-md bg-customgreys-secondarybg"
    >
      <div className="flex flex-row items-center justify-end gap-4">
        <TabsList className="bg-customgreys-darkGrey text-white-50">
          <TabsTrigger
            value="settle"
            className="data-[state=active]:bg-customgreys-secondarybg"
          >
            <HandCoins className="text-primary-500" />
          </TabsTrigger>
          <TabsTrigger
            value="graph"
            className="data-[state=active]:bg-customgreys-secondarybg"
          >
            <ChartBar className="text-primary-500" />
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="settle">
        <SettleTab tripId={tripId} total={total} />
      </TabsContent>
      <TabsContent value="graph">
        <SpendingsTab expenses={expenses} />
      </TabsContent>
    </Tabs>
  );
};
