'use client';

import * as React from 'react';
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { columns } from './columns';
import { DataTable } from './data-table';

type Corp = {
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

type ApiResponse = {
  data: Corp[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  sorting: { sort: string; order: 'asc' | 'desc' };
};

function toQS(sp: ReadonlyURLSearchParams) {
  // 현재 URL 파라미터를 그대로 API로 전달
  const params = new URLSearchParams(sp.toString());
  // 기본값 보정
  if (!params.get('page')) params.set('page', '1');
  if (!params.get('limit')) params.set('limit', '20');
  if (!params.get('sort')) params.set('sort', 'corpNameListed');
  if (!params.get('order')) params.set('order', 'asc');
  return params.toString();
}

async function fetchRows(qs: string): Promise<ApiResponse> {
  const res = await fetch(`/api/corps?${qs}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default function CompanyTableClient() {
  const sp = useSearchParams();
  const router = useRouter();
  const qc = useQueryClient();

  const qs = React.useMemo(() => toQS(sp), [sp]);

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ['corps', qs],
    queryFn: () => fetchRows(qs),
    placeholderData: (prev) => prev, // keepPreviousData 효과
    staleTime: 10_000,
  });

  // 다음 페이지 prefetch
  React.useEffect(() => {
    if (!data) return;
    const params = new URLSearchParams(qs);
    const page = Number(params.get('page') ?? 1);
    const totalPages = data.pagination.totalPages;

    const next = page + 1;
    if (next <= totalPages) {
      params.set('page', String(next));
      const nextQs = params.toString();
      qc.prefetchQuery({
        queryKey: ['corps', nextQs],
        queryFn: () => fetchRows(nextQs),
        staleTime: 10_000,
      });
    }
  }, [data, qs, qc]);

  const setParam = (
    patch: Record<string, string | null>,
    resetPage = false
  ) => {
    const params = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v === null) params.delete(k);
      else params.set(k, v);
    }
    if (resetPage) params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  if (isError)
    return (
      <div className="text-sm text-red-600">
        Error: {(error as Error).message}
      </div>
    );
  if (!data)
    return <div className="text-sm text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-2">
      <div className="text-sm text-muted-foreground">
        {isFetching ? 'Loading…' : null}
      </div>

      <DataTable
        columns={columns}
        data={data.data}
        pagination={data.pagination}
        sorting={data.sorting}
        onPageChange={(p) => setParam({ page: String(p) })}
        onSortChange={(sort: string, order: string) =>
          setParam({ sort, order }, true)
        }
      />
    </div>
  );
}
