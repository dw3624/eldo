'use client';

import * as React from 'react';
import useSWR from 'swr';
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
import StockChartDashboard from './stock-chart';

type StockResp = {
  data: StockInfo[];
  snapshotIndicators: {
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

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function StockSection({
  corpId,
  exchange,
}: {
  corpId: string;
  exchange: string | null;
}) {
  const [cursor, setCursor] = React.useState<string | null>(null);
  const [allRows, setAllRows] = React.useState<StockInfo[]>([]);

  const { data, isLoading, isValidating } = useSWR<StockResp>(
    `/api/corps/${corpId}/stock-trades?limit=260${
      cursor ? `&cursor=${cursor}` : ''
    }`,
    fetcher,
    { revalidateOnFocus: false, keepPreviousData: true }
  );

  // 데이터가 로드되면 누적
  React.useEffect(() => {
    if (data?.data) {
      if (!cursor) {
        // 첫 로딩 시에는 데이터 교체
        setAllRows(data.data);
      } else {
        // 커서가 있을 때만 누적 (중복 방지를 위해 확인 로직 추가 가능)
        setAllRows((prev) => {
          const existingDates = new Set(prev.map((row) => row.tradeDate));
          const uniqueNewRows = data.data.filter(
            (newRow) => !existingDates.has(newRow.tradeDate)
          );
          return [...prev, ...uniqueNewRows];
        });
      }
    }
  }, [data, cursor]);

  // 렌더링 조건
  if (!data && allRows.length === 0 && isLoading) {
    return (
      <div className="w-full py-8 text-center text-muted-foreground">
        Loading stock data...
      </div>
    );
  }

  if (allRows.length === 0 && !isLoading) {
    return (
      <div className="w-full py-8 text-center text-muted-foreground">
        No stock data available
      </div>
    );
  }

  const currency = allRows[0]?.currency ?? '-';
  const snapshot = data?.snapshotIndicators; // 스냅샷은 최신 데이터 기준 유지
  const nextCursor = data?.page.nextCursor ?? null;
  // isValidating을 써서 네트워크 요청 중일 때 버튼을 비활성화
  const canLoadMore = !!nextCursor && !isValidating;

  return (
    <div className="w-full">
      <h2
        id="stock-info"
        className="scroll-m-36 border-b pb-2 font-semibold text-xl tracking-tight first:mt-0"
      >
        Stock Information
        <Label className="mt-2 block">[Currency: {currency}]</Label>
        {snapshot && (
          <div className="mt-2 text-xs text-muted-foreground">
            PER: {formatNumber(snapshot.perEnd)} | EV/EBITDA:{' '}
            {formatNumber(snapshot.evEbitdaEnd)} | EV:{' '}
            {formatNumber(snapshot.evEnd)}
          </div>
        )}
      </h2>

      <StockChartDashboard data={allRows} exchange={exchange} />

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
                    {allRows.map((row) => (
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
                            {col.labelEn}
                          </TableHead>
                        )
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allRows.map((row, idx) => (
                      <TableRow
                        key={`${row.tradeDate}-${idx}`}
                        className="text-right"
                      >
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
            onClick={() => setCursor(nextCursor)}
          >
            {isValidating ? 'Loading…' : nextCursor ? 'Load more' : 'No more'}
          </Button>
        </div>
      </div>
    </div>
  );
}
