declare global {
  type Session = {
    userId?: string;
  };

  interface Participant {
    name: string;
    spent: number;
    net: number;
  }

  interface User {
    id: string;
    email: string;
    password: string;
  }

  interface TripLocation {
    latitude: number;
    longitude: number;
    address: string;
  }

  interface ItineraryItem {
    title: string;
    notes?: string;
    time?: number;
  }

  interface TripDay {
    itineraries: ItineraryItem[];
  }

  interface TripData {
    id?: string;
    userId: string;
    name: string;
    startDate: string;
    endDate: string;
    destination: string;
    participants: Participant[];
    total: number;
    days: TripDay[];
    locations: TripLocation[];
    createdAt?: string;
  }

  interface ExpenseData {
    tripId: string;
    category: string;
    description: string;
    amount: number;
    date: string;
    payer: string;
    participants: string[];
  }

  interface TripProps {
    trip: TripData;
  }

  interface ItineraryStore {
    currDays: TripDay[];
    tripId: string;
    setCurrDays: (days: TripDay[]) => void;
    setTripId: (tripId: string) => void;
    addDay: () => void;
    removeDay: (dayIndex: number) => void;
    addItineraryItem: (dayIndex: number, item: ItineraryItem) => void;
    editItineraryItem: (
      dayIndex: number,
      itemIndex: number,
      newItem: ItineraryItem
    ) => void;
    removeItineraryItem: (dayIndex: number, itemIndex: number) => void;
    swapDays: (fromIndex: number, toIndex: number) => void;
    swapItineraryItems: (
      dayIndex: number,
      fromIndex: number,
      toIndex: number
    ) => void;
  }

  interface EditItineraryActions {
    addDay: () => void;
    removeDay: (dayIndex: number) => void;
    addItineraryItem: (dayIndex: number, item: ItineraryItem) => void;
    editItineraryItem: (
      dayIndex: number,
      itemIndex: number,
      newItem: ItineraryItem
    ) => void;
    removeItineraryItem: (dayIndex: number, itemIndex: number) => void;
    swapDays: (fromIndex: number, toIndex: number) => void;
    swapItineraryItems: (
      dayIndex: number,
      fromIndex: number,
      toIndex: number
    ) => void;
  }

  interface ExpenseData {
    id: string;
    tripId: string;
    description: string;
    amount: number;
    createdAt: string;
    payer: string;
    participants: string[];
  }

  interface Settlement {
    from: string;
    to: string;
    amount: number;
  }
}

export {};
