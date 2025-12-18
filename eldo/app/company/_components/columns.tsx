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
      const id = row['original']['id'];
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
    cell: ({ row }) => {
      const val: string = row.getValue('ltmTotalAssets') || '-';
      return <div className="text-right">{val}</div>;
    },
  },
  {
    accessorKey: 'ltmMarketCap',
    header: 'LTM Market Cap',
    cell: ({ row }) => {
      const val: string = row.getValue('ltmMarketCap') || '-';
      return <div className="text-right">{val}</div>;
    },
  },
  {
    accessorKey: 'ltmRevenue',
    header: 'LTM Revenue',
    cell: ({ row }) => {
      const val: string = row.getValue('ltmRevenue') || '-';
      return <div className="text-right">{val}</div>;
    },
  },
  {
    accessorKey: 'revenuePattern',
    header: 'Revenue Pattern',
    cell: ({ row }) => {
      const val: string = row.getValue('revenuePattern') || '-';
      return <div className="text-right">{val}</div>;
    },
  },
  {
    accessorKey: 'operatingProfitPattern',
    header: 'Operating Profit Pattern',
    cell: ({ row }) => {
      const val: string = row.getValue('operatingProfitPattern') || '-';
      return <div className="text-right">{val}</div>;
    },
  },
  {
    accessorKey: 'perPrev',
    header: 'PER Prev',
    cell: ({ row }) => {
      const val: string = row.getValue('perPrev') || '-';
      return <div className="text-right">{val}</div>;
    },
  },
  {
    accessorKey: 'evEbitdaPrev',
    header: 'EV/EBITDA Prev',
    cell: ({ row }) => {
      const val: string = row.getValue('evEbitdaPrev') || '-';
      return <div className="text-right">{val}</div>;
    },
  },
];
