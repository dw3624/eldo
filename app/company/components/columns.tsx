'use client';

import type { ColumnDef } from '@tanstack/react-table';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'corpName',
    header: 'Corp Name',
  },
  {
    accessorKey: 'market',
    header: 'Market',
  },
  {
    accessorKey: 'stockCode',
    header: 'Stock Code',
  },
  {
    accessorKey: 'fiscalPeriod',
    header: 'Fiscal Period',
  },
];
