'use client';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

import { ColumnDef } from '@tanstack/react-table';
export const columns: ColumnDef<ExpenseData>[] = [
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
];
