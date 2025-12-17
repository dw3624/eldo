'use client';

import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export type Corp = {
  id: string;
  corpName: string;
  corpNameListed: string | null;
  stockExchange: string | null;
  settlePeriod: string | null;
  ltmTotalAssets: number | null;
  ltmMarketCap: number | null;
  ltmRevenue: number | null;
  revenuePattern: number | null;
  operatingProfitPattern: number | null;
  perPrev: number | null;
  evEbitdaPrev: number | null;
};

export const columns: ColumnDef<Corp>[] = [
  {
    accessorKey: 'corpName',
    header: 'Corp Name',
    cell: ({ row }) => {
      const id = row['id'];
      const corpName: string = row.getValue('corpName');
      return <Link href={`company/${id}`}>{corpName}</Link>;
    },
    meta: { sortKey: 'corpName' },
  },
  {
    accessorKey: 'stockExchange',
    header: 'Exchange',
    meta: { sortKey: 'stockExchange' },
  },
  {
    accessorKey: 'corpTicker',
    header: 'Stock Code',
    meta: { sortKey: 'corpTicker' },
  },
  {
    accessorKey: 'settlePeriod',
    header: 'Fiscal Period',
    meta: { sortKey: 'settlePeriod' },
  },
  {
    accessorKey: 'ltmTotalAssets',
    header: 'LTM Total Assets',
  },
  {
    accessorKey: 'ltmMarketCap',
    header: 'LTM Market Cap',
  },
  {
    accessorKey: 'ltmRevenue',
    header: 'LTM Revenue',
  },
  {
    accessorKey: 'revenuePattern',
    header: 'Revenue Pattern',
  },
  {
    accessorKey: 'operatingProfitPattern',
    header: 'Operating Profit Pattern',
  },
  {
    accessorKey: 'perPrev',
    header: 'PER Prev',
  },
  {
    accessorKey: 'evEbitdaPrev',
    header: 'EV/EBITDA Prev',
  },
];
