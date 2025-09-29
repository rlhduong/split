import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { useState } from 'react';

const ActivityForm = ({
  title,
  notes,
  dayIndex,
  index,
  actions,
}: {
  title: string;
  notes: string;
  dayIndex: number;
  index: number;
  actions: EditItineraryActions;
}) => {
  const [formData, setFormData] = useState({ title, notes });

  const handleSubmit = () => {
    if (index === -1) {
      actions.addItineraryItem(dayIndex, formData);
    } else {
      actions.editItineraryItem(dayIndex, index, formData);
    }
  };

  return (
    <>
      <div className="grid gap-4 ">
        <div className="grid gap-3">
          <Input
            placeholder="Title"
            className="form__input"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div className="grid gap-3">
          <Input
            placeholder="Notes"
            className="form__input"
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button
            variant="outline"
            className="border-gray-500 bg-customgreys-darkGrey text-gray-500 hover:!bg-gray-500 hover:!text-gray-800 cursor-pointer"
          >
            Cancel
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button className="general-button" onClick={handleSubmit}>
            Save
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};

export default ActivityForm;
