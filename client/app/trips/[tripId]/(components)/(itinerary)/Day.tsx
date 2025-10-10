'use client';

import {
  Draggable,
  DragDropContext,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd';
import { Grip, Trash, PanelTopOpen } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useState } from 'react';
import ItineraryItem from './ItineraryItem';
import { motion } from 'framer-motion';
import ActivityDialog from './ActivityDialog';
const Day = ({
  day,
  index,
  actions,
}: {
  day: { itineraries: ItineraryItem[] };
  index: number;
  actions: EditItineraryActions;
}) => {
  const [open, setOpen] = useState(false);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    actions.swapItineraryItems(
      index,
      result.source.index,
      result.destination.index
    );
  };

  return (
    <Draggable draggableId={`day-${index}`} index={index}>
      {(provided) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className=" w-full md:w-3/4 xl:w-1/2"
        >
          <div
            className="flex flex-col "
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <Collapsible open={open} onOpenChange={setOpen}>
              <div className="bg-customgreys-secondarybg rounded-lg p-4 flex flex-row justify-between">
                <div className="flex flex-row gap-4">
                  <div {...provided.dragHandleProps}>
                    <Grip className="text-primary-500 hover:!text-primary-700" />
                  </div>
                  Day {index + 1}
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <CollapsibleTrigger>
                    <PanelTopOpen
                      className="text-yellow-200 hover:!text-yellow-300 cursor-pointer"
                      size={19}
                    />
                  </CollapsibleTrigger>
                  <Trash
                    className="text-red-400 hover:!text-red-500 cursor-pointer"
                    size={19}
                    onClick={() => actions.removeDay(index)}
                  />
                </div>
              </div>
              <CollapsibleContent>
                <div className="flex flex-col gap-2 items-end w-full mt-2">
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={`day-${index}-itineraries`}>
                      {(provided) => (
                        <div
                          className="flex flex-col w-4/5 gap-2"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {day.itineraries.map((item, idx) => (
                            <ItineraryItem
                              key={`itinerary-item-${idx}`}
                              itinerary={item}
                              index={idx}
                              dayIndex={index}
                              actions={actions}
                            />
                          ))}
                          {provided.placeholder}
                          <ActivityDialog index={index} actions={actions} />
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </motion.div>
      )}
    </Draggable>
  );
};

export default Day;
