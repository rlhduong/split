import { tripService } from '@/service/tripService';
import { useMemo, useEffect, useCallback } from 'react';
import { create } from 'zustand';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const EditItineraryStore = create<ItineraryStore>((set, get) => ({
  currDays: [],
  tripId: '',

  setCurrDays: (days) => set({ currDays: days }),
  setTripId: (tripId) => set({ tripId }),

  addDay: () => {
    const updatedDays = [...get().currDays, { itineraries: [] }];
    set({ currDays: updatedDays });
  },

  removeDay: (dayIndex) => {
    const updatedDays = get().currDays.filter((_, index) => index !== dayIndex);
    set({ currDays: updatedDays });
  },

  addItineraryItem: (dayIndex, item) => {
    const updatedDays = get().currDays.map((day, index) => {
      if (index === dayIndex) {
        return { itineraries: [...day.itineraries, item] };
      }
      return day;
    });
    set({ currDays: updatedDays });
  },

  editItineraryItem: (dayIndex, itemIndex, newItem) => {
    const updatedDays = get().currDays.map((day, dIndex) => {
      if (dIndex === dayIndex) {
        const updatedItineraries = day.itineraries.map((itinerary, iIndex) =>
          iIndex === itemIndex ? { ...itinerary, ...newItem } : itinerary
        );
        return { itineraries: updatedItineraries };
      }
      return day;
    });
    set({ currDays: updatedDays });
  },

  removeItineraryItem: (dayIndex, itemIndex) => {
    const updatedDays = get().currDays.map((day, dIndex) => {
      if (dIndex === dayIndex) {
        const updatedItineraries = day.itineraries.filter(
          (_, iIndex) => iIndex !== itemIndex
        );
        return { itineraries: updatedItineraries };
      }
      return day;
    });
    set({ currDays: updatedDays });
  },

  swapDays: (fromIndex, toIndex) => {
    const updatedDays = Array.from(get().currDays);
    const [movedDay] = updatedDays.splice(fromIndex, 1);
    updatedDays.splice(toIndex, 0, movedDay);
    set({ currDays: updatedDays });
  },

  swapItineraryItems: (dayIndex, fromIndex, toIndex) => {
    const updatedDays = get().currDays.map((day, dIndex) => {
      if (dIndex === dayIndex) {
        const updatedItineraries = Array.from(day.itineraries);
        const [movedItem] = updatedItineraries.splice(fromIndex, 1);
        updatedItineraries.splice(toIndex, 0, movedItem);
        return { itineraries: updatedItineraries };
      }
      return day;
    });
    set({ currDays: updatedDays });
  },
}));

export const useEditItinerary = (tripId: string, days: TripDay[]) => {
  const store = EditItineraryStore();
  const queryClient = useQueryClient();

  const currDays = useMemo(() => {
    const daysFromStore = EditItineraryStore.getState().currDays;
    return daysFromStore.length ? daysFromStore : days;
  }, [store.currDays, days, tripId]);

  useEffect(() => {
    const currTripId = EditItineraryStore.getState().tripId;
    if (currTripId !== tripId) {
      store.setCurrDays(days);
      store.setTripId(tripId);
    }
  }, [tripId]);

  const update = useCallback(async () => {
    try {
      const currentDays = EditItineraryStore.getState().currDays;
      const currTripId = EditItineraryStore.getState().tripId;
      await tripService.updateTrip(currTripId, { days: currentDays });
      queryClient.invalidateQueries({ queryKey: ['trip', currTripId] });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to save';
      console.error('❌ Save failed:', err);
    } finally {
    }
  }, [tripId]);

  const executeWithUpdate = useCallback(
    (action: () => void) => {
      action();
      update();
    },
    [update]
  );

  return {
    currDays,
    addDay: () => executeWithUpdate(store.addDay),
    removeDay: (dayIndex: number) => {
      executeWithUpdate(() => store.removeDay(dayIndex));
      toast.success(`Day ${dayIndex + 1} removed successfully`);
      return;
    },
    addItineraryItem: (dayIndex: number, item: any) =>
      executeWithUpdate(() => store.addItineraryItem(dayIndex, item)),
    editItineraryItem: (dayIndex: number, itemIndex: number, newItem: any) =>
      executeWithUpdate(() =>
        store.editItineraryItem(dayIndex, itemIndex, newItem)
      ),
    removeItineraryItem: (dayIndex: number, itemIndex: number) =>
      executeWithUpdate(() => store.removeItineraryItem(dayIndex, itemIndex)),
    swapDays: (fromIndex: number, toIndex: number) =>
      executeWithUpdate(() => store.swapDays(fromIndex, toIndex)),
    swapItineraryItems: (
      dayIndex: number,
      fromIndex: number,
      toIndex: number
    ) =>
      executeWithUpdate(() =>
        store.swapItineraryItems(dayIndex, fromIndex, toIndex)
      ),

    update,
  };
};
