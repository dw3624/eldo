'use client';

import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export type CompanyList = {
  corpName: string;
  market: string;
  stockCode: string;
  fiscalPeriod: string;
};

export const columns: ColumnDef<CompanyList>[] = [
  {
    accessorKey: 'corpName',
    header: 'Corp Name',
    cell: ({ row }) => {
      const corpName: string = row.getValue('corpName');
      return <Link href={`company/${corpName}`}>{corpName}</Link>;
    },
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
