'use client';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { MoreHorizontal } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ExpenseForm from './(form)/ExpenseForm';
import { ExpenseService } from '@/service/expenseService';

export const columns = (
  participants: Participant[]
): ColumnDef<ExpenseData>[] => [
  {
    accessorKey: 'payer',
    header: () => <div className="text-gray-400">Name</div>,
    size: 350,
    cell: ({ row }) => {
      return (
        <div className="font-medium text-primary-700">
          {row.getValue('payer')}
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    size: 150,
    header: () => <div className="text-gray-400">Category</div>,
  },
  {
    accessorKey: 'description',
    header: () => <div className="text-gray-400">Description</div>,
    size: 150,
    cell: ({ row }) => {
      const description: string = row.getValue('description');

      return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="truncate max-w-[150px] cursor-default">
              {description}
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="bg-customgreys-tooltip border-none text-white-50">
            <p className="text-sm">{description}</p>
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    accessorKey: 'participants',
    size: 40,
    header: () => <div className="text-gray-400">Participants</div>,
    cell: ({ row }) => {
      const participants: string[] = row.getValue('participants');

      return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="text-primary-500">
              Show
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="flex flex-row gap-2 bg-customgreys-tooltip border-none">
            {participants.map((participant) => (
              <p
                key={`participant-badge-${participant}`}
                className="px-2 rounded-lg cursor-pointer text-primary-400"
              >
                {participant}
              </p>
            ))}
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-right text-gray-400">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: 'actions',
    size: 10,
    cell: ({ row }) => {
      const expense = row.original;
      const queryClient = useQueryClient();
      const [isEditOpen, setIsEditOpen] = useState(false);

      const { mutate } = useMutation({
        mutationFn: () =>
          ExpenseService.deleteExpense(expense.tripId, expense.id),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['trip', expense.tripId] });
          queryClient.invalidateQueries({
            queryKey: ['expenses', expense.tripId],
          });
          queryClient.invalidateQueries({
            queryKey: ['settlements', expense.tripId],
          });
        },
        onError: (error: any) => {
          console.error('Error adding traveller:', error);
        },
      });

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 text-primary-400 hover:bg-customgreys-darkGrey hover:text-primary-500"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-customgreys-tooltip border-none"
            >
              <DropdownMenuLabel className="text-white-50">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuItem
                className="actions-button"
                onClick={() => navigator.clipboard.writeText(expense.id)}
              >
                Copy expense ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="actions-button"
                onClick={() => setIsEditOpen(true)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="actions-button"
                onClick={() => mutate()}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogContent className="sm:max-w-[425px] bg-customgreys-darkGrey outline-none border-none">
              <ExpenseForm
                tripId={expense.tripId}
                participants={participants}
                handleOpenChange={setIsEditOpen}
                expense={expense}
              />
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
