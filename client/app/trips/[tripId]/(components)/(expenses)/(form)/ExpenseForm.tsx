'use client';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';

import { Form } from '@/components/ui/form';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { createExpenseSchema, CreateExpenseFormData } from '@/lib/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ExpenseService } from '@/service/expenseService';
import PayerInput from './PayerInput';
import CategoryInput from './CategoryInput';
import ParticipantsInput from './ParticipantsInput';
import AmountInput from './AmountInput';
import DescriptionInput from './DescriptionInput';

const ExpenseForm = ({
  tripId,
  participants,
}: {
  tripId: string;
  participants: Participant[];
}) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<CreateExpenseFormData>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      payer: '',
      amount: 0,
      category: '',
      description: '',
      participants: [],
    },
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: CreateExpenseFormData) =>
      ExpenseService.createExpense(tripId, data),
    onSuccess: () => {
      setIsOpen(false);

      queryClient.invalidateQueries({ queryKey: ['trip', tripId] });
      queryClient.invalidateQueries({ queryKey: ['expenses', tripId] });
      queryClient.invalidateQueries({ queryKey: ['settlements', tripId] });
    },
    onError: (error: any) => {
      console.error('Error adding traveller:', error);
    },
  });

  const handleSubmit = (data: CreateExpenseFormData) => {
    mutate(data);

    if (!isError) form.reset();
  };

  const handleOpenChagne = (open: boolean) => {
    setIsOpen(open);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChagne}>
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
        <Header />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <AmountInput form={form} />
            <PayerInput form={form} participants={participants} />
            <CategoryInput form={form} />
            <ParticipantsInput form={form} participants={participants} />
            <DescriptionInput form={form} />
            <div className="flex flex-row justify-end gap-4">
              <DialogClose asChild>
                <button
                  type="button"
                  className="general-button__text text-gray-400"
                  disabled={isPending}
                >
                  Cancel
                </button>
              </DialogClose>
              <button
                type="submit"
                className="general-button__text disabled:opacity-50"
                disabled={isPending}
              >
                Add
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseForm;

const Header = () => {
  return (
    <>
      <DialogTitle className="text-lg text-white-50">New Expense</DialogTitle>
      <DialogDescription className="text-gray-400 mb-4">
        Add a new expense to your trip
      </DialogDescription>
    </>
  );
};
