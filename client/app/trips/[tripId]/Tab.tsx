import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Overview from './Overview';
import Itinerary from './Itinerary';
import Expenses from './Expenses';

const Tab = ({ trip }: { trip: TripData }) => {
  return (
    <Tabs
      defaultValue="overview"
      className="flex flex-col text-white-50 w-full h-full flex-grow"
    >
      <TabsList className="trip-details__tab" id="tablist">
        <TabsTrigger value="overview" className="trip-details__tab_trigger">
          Overview
        </TabsTrigger>
        <TabsTrigger value="itinerary" className="trip-details__tab_trigger">
          Itinerary
        </TabsTrigger>
        <TabsTrigger value="expenses" className="trip-details__tab_trigger">
          Expenses
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="overview"
        className="flex flex-col flex-1 h-full overflow-hidden"
      >
        <Overview trip={trip} />
      </TabsContent>
      <TabsContent
        value="itinerary"
        className="flex flex-col flex-1 h-full overflow-hidden"
      >
        <Itinerary trip={trip} />
      </TabsContent>
      <TabsContent
        value="expenses"
        className="flex flex-col flex-1 h-full overflow-hidden"
      >
        <Expenses trip={trip} />
      </TabsContent>
    </Tabs>
  );
};

export default Tab;
