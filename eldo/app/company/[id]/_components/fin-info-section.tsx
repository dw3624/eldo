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
import { FINANCIAL_INFO_FIELDS } from './fields';

import { AnnualRow } from './types';
import FinMetricsCharts from './fin-metric-cards';

type ApiResp = {
  meta: {
    page: number;
    yearsPerPage: number;
    totalYears: number;
    totalPages: number;
    currency: string | null;
  };
  data: AnnualRow[]; // 표에 뿌릴 3~5년
  graph: AnnualRow[]; // 최근 5년(차트)
};

export default function FinInfoSection({ corpId }: { corpId: string }) {
  const [page, setPage] = React.useState(1);
  const [yearsPerPage, setYearsPerPage] = React.useState<3 | 4 | 5>(5);
  const [resp, setResp] = React.useState<ApiResp | null>(null);
  const [loading, setLoading] = React.useState(false);

  const fetchPage = React.useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams();
      qs.set('page', String(page));
      qs.set('yearsPerPage', String(yearsPerPage));
      const res = await fetch(
        `/api/corps/${corpId}/statements?${qs.toString()}`,
        {
          cache: 'no-store',
        }
      );
      if (!res.ok) throw new Error('Failed to fetch statements');
      const json: ApiResp = await res.json();
      setResp(json);
    } finally {
      setLoading(false);
    }
  }, [corpId, page, yearsPerPage]);

  React.useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  const cols = resp?.data ?? [];
  const chart = resp?.graph ?? [];

  const totalPages = resp?.meta.totalPages ?? 1;
  const currency = resp?.meta.currency ?? null;

  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div>
      <h2
        id="fin-info"
        className="scroll-m-36 border-b pb-2 font-semibold text-xl tracking-tight first:mt-0"
      >
        Financial Information
        <Label className="mt-2 block">[Currency: {currency ?? '-'}]</Label>
      </h2>

      <div className="mt-6 space-y-6">
        {/* Controls */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">View</span>
            {[3, 4, 5].map((n) => (
              <Button
                key={n}
                variant={yearsPerPage === n ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setYearsPerPage(n as 3 | 4 | 5);
                  setPage(1);
                }}
              >
                {n}Y
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!canPrev || loading}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </Button>
            <div className="text-sm text-muted-foreground">
              Page <span className="text-foreground font-medium">{page}</span> /{' '}
              {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={!canNext || loading}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>

        {/* Charts (최근 5년) */}
        <FinMetricsCharts data={chart} />

        {/* Table (3~5년) */}
        <div className="rounded-md border overflow-x-auto">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead colSpan={2} style={{ width: 240 }} />
                {cols.map((col) => (
                  <TableHead
                    key={col.label}
                    className="whitespace-nowrap font-semibold text-center"
                    style={{ width: 140 }}
                  >
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {FINANCIAL_INFO_FIELDS.flatMap((group) =>
                group.fields.map((field, i) => {
                  const visibleFields = group.fields.length;
                  const firstRow =
                    i === 0 ? (
                      <TableCell
                        rowSpan={visibleFields}
                        className="align-top font-semibold truncate"
                      >
                        {group.label.en}
                      </TableCell>
                    ) : null;

                  return (
                    <TableRow key={`${group.key}-${field.key}`}>
                      {firstRow}
                      <TableCell className="whitespace-nowrap truncate">
                        {field.label.en}
                      </TableCell>

                      {cols.map((col) => {
                        const v = col[field.key];
                        return (
                          <TableCell
                            key={`${group.key}-${field.key}-${col.label}`}
                            className="whitespace-nowrap text-right"
                          >
                            {field.key === 'year'
                              ? `${v}`
                              : field.type === 'date' && typeof v !== 'number'
                              ? formatDate(v)
                              : typeof v === 'number'
                              ? formatNumber(v)
                              : v ?? '-'}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {loading && (
          <div className="text-sm text-muted-foreground">Loading...</div>
        )}
      </div>
    </div>
  );
}
