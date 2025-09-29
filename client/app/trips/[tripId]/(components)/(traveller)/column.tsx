'use client';

import { ColumnDef } from '@tanstack/react-table';
export const columns: ColumnDef<Participant>[] = [
  {
    accessorKey: 'name',
    header: () => <div className="text-gray-400">Name</div>,
  },
  {
    accessorKey: 'spent',
    header: () => <div className="text-right text-gray-400">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('spent'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];
