import { Delete, SquarePen } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog';
import ActivityForm from './ActivityForm';
import { Draggable } from '@hello-pangea/dnd';

const Itinerary = ({
  itinerary,
  dayIndex,
  index,
  actions,
}: {
  itinerary: ItineraryItem;
  dayIndex: number;
  index: number;
  actions: EditItineraryActions;
}) => {
  return (
    <Draggable draggableId={`day-${dayIndex}-itinerary-${index}`} index={index}>
      {(provided) => (
        <div
          className="w-full bg-gray-800 flex flex-row justify-between items-center rounded-md py-2 px-4"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex flex-col">
            <p className="">{itinerary.title}</p>
            <p className="text-gray-400 text-sm">{itinerary.notes}</p>
          </div>
          <div className="flex flex-row gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <button>
                  <SquarePen
                    className="text-green-200 hover:!text-green-300 cursor-pointer"
                    size={16}
                  />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-customgreys-darkGrey outline-none border-none">
                <DialogTitle className="text-lg text-white-50">
                  Add Activity
                </DialogTitle>
                <ActivityForm
                  title={itinerary.title}
                  notes={itinerary.notes!}
                  dayIndex={dayIndex}
                  index={index}
                  actions={actions}
                />
              </DialogContent>
            </Dialog>
            <button>
              <Delete
                className="text-red-400 hover:!text-red-500 cursor-pointer"
                size={16}
                onClick={() => actions.removeItineraryItem(dayIndex, index)}
              />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Itinerary;
