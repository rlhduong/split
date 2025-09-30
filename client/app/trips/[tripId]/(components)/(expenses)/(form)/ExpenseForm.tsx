'use client';

import {
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';

import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
  handleOpenChange,
  expense,
}: {
  tripId: string;
  participants: Participant[];
  handleOpenChange: (open: boolean) => void;
  expense?: ExpenseData;
}) => {
  const queryClient = useQueryClient();

  const form = useForm<CreateExpenseFormData>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      payer: expense?.payer || '',
      amount: expense?.amount || 0,
      category: expense?.category || 'other',
      description: expense?.description || '',
      participants: expense?.participants || [],
    },
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: CreateExpenseFormData) => {
      if (expense) {
        return ExpenseService.updateExpense(tripId, expense.id, data);
      }
      return ExpenseService.createExpense(tripId, data);
    },
    onSuccess: () => {
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

    if (!isError) {
      form.reset();
      handleOpenChange(false);
    }
  };

  return (
    <>
      <Header />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
              {expense ? 'Save Changes' : 'Add'}
            </button>
          </div>
        </form>
      </Form>
    </>
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
