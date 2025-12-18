'use client';

import * as React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate, formatNumber } from '../_lib/utils';
import { STOCK_INFO_FIELDS } from './constants';
import type { StockInfo } from './types';

type StockResp = {
  data: StockInfo[];
  snapshotIndicators: {
    currency: string | null;
    evEnd: number | null;
    perEnd: number | null;
    pbrEnd: number | null;
    psrEnd: number | null;
    pcrEnd: number | null;
    evSalesEnd: number | null;
    evEbitdaEnd: number | null;
    marketCapEnd: number | null;
  } | null;
  page: { limit: number; nextCursor: string | null };
};

export default function StockSection({ corpId }: { corpId: string }) {
  const [rows, setRows] = React.useState<StockInfo[]>([]);
  const [currency, setCurrency] = React.useState<string | null>(null);
  const [snapshot, setSnapshot] =
    React.useState<StockResp['snapshotIndicators']>(null);
  const [nextCursor, setNextCursor] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const fetchPage = React.useCallback(
    async (cursor?: string | null) => {
      setLoading(true);
      try {
        const qs = new URLSearchParams();
        qs.set('limit', '30');
        if (cursor) qs.set('cursor', cursor);

        const res = await fetch(
          `/api/corps/${corpId}/stock-trades?${qs.toString()}`,
          {
            cache: 'no-store',
          }
        );
        if (!res.ok) throw new Error('Failed to fetch stock');

        const json: StockResp = await res.json();

        setRows((prev) => (cursor ? [...prev, ...json.data] : json.data));
        setSnapshot(json.snapshotIndicators);
        setNextCursor(json.page.nextCursor);

        const cur = json.data?.[0]?.currency ?? null;
        if (cur) setCurrency(cur);
      } finally {
        setLoading(false);
      }
    },
    [corpId]
  );

  React.useEffect(() => {
    fetchPage(null);
  }, [fetchPage]);

  const canLoadMore = !!nextCursor && !loading;

  return (
    <div className="w-full">
      <h2
        id="stock-info"
        className="scroll-m-36 border-b pb-2 font-semibold text-xl tracking-tight first:mt-0"
      >
        Stock Information
        <Label className="mt-2 block">[Currency: {currency ?? '-'}]</Label>
        {snapshot && (
          <div className="mt-2 text-xs text-muted-foreground">
            PER: {formatNumber(snapshot.perEnd)} | EV/EBITDA:{' '}
            {formatNumber(snapshot.evEbitdaEnd)} | EV:{' '}
            {formatNumber(snapshot.evEnd)}
          </div>
        )}
      </h2>

      <div className="mt-6 space-y-6">
        <div className="w-full overflow-x-auto">
          <div className="max-h-[520px] overflow-y-auto border rounded-md">
            <div className="inline-flex min-w-full">
              {/* sticky 날짜 */}
              <div className="sticky left-0 z-10 bg-white">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24 text-center">
                        Trade Date
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.tradeDate} className="text-center">
                        <TableCell className="text-center font-medium">
                          {row.tradeDate
                            ? formatDate(row.tradeDate, 'stock')
                            : '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* 나머지 컬럼 */}
              <div className="flex-1">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {STOCK_INFO_FIELDS.filter((col) => !('fixed' in col)).map(
                        (col) => (
                          <TableHead
                            key={col.key}
                            className="whitespace-nowrap text-right"
                            style={{ minWidth: col.width || 100 }}
                          >
                            {col.label}
                          </TableHead>
                        )
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.tradeDate} className="text-right">
                        {/* 아래는 row 키들이 API dto와 정확히 일치해야 합니다 */}
                        <TableCell className="whitespace-nowrap text-right">
                          {formatNumber(row.outstandingShares)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-right">
                          {formatNumber(row.tradeVolume)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-right">
                          {formatNumber(row.priceCloseAdj)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-right">
                          {formatNumber(row.priceOpenAdj)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-right font-bold text-red-600">
                          {formatNumber(row.priceHighAdj)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-right font-bold text-blue-600">
                          {formatNumber(row.priceLowAdj)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-right">
                          {formatNumber(row.marketCapAdj)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-right">
                          {formatNumber(row.evEnd)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-right">
                          {formatNumber(row.perEnd)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-right">
                          {formatNumber(row.pbrEnd)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-right">
                          {formatNumber(row.psrEnd)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-right">
                          {formatNumber(row.pcrEnd)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-right">
                          {formatNumber(row.evSalesEnd)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-right">
                          {formatNumber(row.evEbitdaEnd)}
                        </TableCell>

                        {/* 지표는 “snapshot”이면 모든 행이 동일하니 굳이 row에 넣지 말고 상단 요약 추천 */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            variant="outline"
            disabled={!canLoadMore}
            onClick={() => fetchPage(nextCursor)}
          >
            {loading ? 'Loading…' : nextCursor ? 'Load more' : 'No more'}
          </Button>
        </div>
      </div>
    </div>
  );
}
