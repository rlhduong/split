import { useState } from 'react';
import ExpenseForm from './(form)/ExpenseForm';
import { DataTable } from './data-table';
import { columns } from './column';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

const ExpenseList = ({
  tripId,
  participants,
  expenses,
}: {
  tripId: string;
  participants: Participant[];
  expenses: ExpenseData[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <div className="flex flex-col">
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <div className="flex flex-row justify-between items-center p-2 bg-customgreys-secondarybg rounded-t-md">
          <h1 className="text-gray-400">Expenses</h1>
          <DialogTrigger asChild>
            <button className="flex flex-row gap-1 items-center general-button__text">
              <Plus className="" size={17} />
              <p className="text-sm">New Expense</p>
            </button>
          </DialogTrigger>
        </div>
        <DialogContent className="sm:max-w-[425px] bg-customgreys-darkGrey outline-none border-none">
          <ExpenseForm
            tripId={tripId}
            participants={participants}
            handleOpenChange={handleOpenChange}
          />
        </DialogContent>
      </Dialog>
      <DataTable columns={columns(participants)} data={expenses} />
    </div>
  );
};

export default ExpenseList;
