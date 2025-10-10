import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { useState } from 'react';

interface FormData {
  title: string;
  notes: string;
  time: number;
}

const ActivityForm = ({
  data,
  dayIndex,
  index,
  actions,
}: {
  data: FormData;
  dayIndex: number;
  index: number;
  actions: EditItineraryActions;
}) => {
  const [formData, setFormData] = useState(data);

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
        <div className="grid gap-3">
          <TimeInput formData={formData} onChange={setFormData} />
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

const TimeInput = ({
  formData,
  onChange,
}: {
  formData: FormData;
  onChange: (data: FormData) => void;
}) => {
  const timeToString = (time: number): string => {
    const hours = Math.floor(time / 100);
    const minutes = time % 100;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  };

  const stringToTime = (timeString: string): number => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 100 + minutes;
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = e.target.value; // "14:00"
    const militaryTime = stringToTime(timeValue); // 1400
    onChange({
      ...formData,
      time: militaryTime,
    });
  };

  return (
    <Input
      type="time"
      value={timeToString(formData.time)}
      onChange={handleTimeChange}
      className="form__input !w-1/5 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
    />
  );
};

export default ActivityForm;
