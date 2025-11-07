'use client';

import type { ColumnDef } from '@tanstack/react-table';

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
