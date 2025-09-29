import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import ActivityForm from './ActivityForm';

const ActivityDialog = ({
  index,
  actions,
}: {
  index: number;
  actions: EditItineraryActions;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full flex flex-row gap-2 text-green-300 opacity-70 hover:opacity-100 cursor-pointer transition-all duration-200 ease-in-out">
          <Plus className="" size={20} />
          <p className="text-sm">Add itinerary</p>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-customgreys-darkGrey outline-none border-none">
        <DialogTitle className="text-lg text-white-50">
          Add Activity
        </DialogTitle>
        <ActivityForm
          title=""
          notes=""
          index={-1}
          dayIndex={index}
          actions={actions}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ActivityDialog;
