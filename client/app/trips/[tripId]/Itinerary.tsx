import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import Day from './(components)/(itinerary)/Day';
import { useEditItinerary } from '@/hook/useEditItinerary';
import { Button } from '@/components/ui/button';
import { differenceInDays } from 'date-fns';

const Itinerary = ({ trip }: TripProps) => {
  const { currDays, ...actions } = useEditItinerary(trip.id!, trip.days);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    actions.swapDays(result.source.index, result.destination.index);
  };

  return (
    <div className="trip-details__tab_content flex-col justify-between overflow-hidden flex-1 pb-4 sm:pl-4">
      {currDays.length === 0 ? (
        <div className="flex flex-row justify-center">
          <p>No itinerary items. Add some!</p>
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="days">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-col gap-4 w-full items-center overflow-auto max-h-[50vh] p-4"
              >
                {currDays.map((day, index) => (
                  <Day
                    key={`day-${index}`}
                    day={day}
                    index={index}
                    actions={actions}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
      {currDays.length <
        differenceInDays(new Date(trip.endDate), new Date(trip.startDate)) +
          1 && (
        <div className="flex flex-row justify-center w-full ">
          <Button className="w-1/2 general-button" onClick={actions.addDay}>
            New Day
          </Button>
        </div>
      )}
    </div>
  );
};

export default Itinerary;
