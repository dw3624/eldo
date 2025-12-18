/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { formatNumber, formatDate } from '../_lib/utils';
import { FINANCIAL_INDIC_FIELDS } from './fields';

type Locale = 'en' | 'ko';

type IndicCol = Record<string, string | number | null> & {
  label: string;
  reportId: number;
  statementId: number;
  periodStart: string | null;
  periodEnd: string | null;
  currency: string | null;
};

type ApiRes = {
  data: IndicCol[];
  summary: null | {
    perPrev: number | null;
    pbrPrev: number | null;
    evEbitdaPrev: number | null;
    revenuePattern_3y: string | null;
    operatingProfitPattern_3y: string | null;
    ebitdaPattern_3y: string | null;
  };
  page: { limit: number; nextCursor: string | null };
};

function renderIndicValue(
  field: { type?: string },
  value: string | number | null
) {
  if (value == null || value === '') return '-';

  if (field.type === 'date' && typeof value === 'string') {
    return formatDate(value); // "YYYY/MM/DD"
  }

  if (field.type === 'percent') {
    const n = Number(value);
    if (Number.isNaN(n)) return '-';
    return `${formatNumber(n * 100)}%`;
  }

  if (typeof value === 'number') return formatNumber(value);
  return String(value);
}

export default function FinIndicSection({
  corpId,
  locale = 'en',
  initialCursor = null,
}: {
  corpId: string;
  locale?: Locale;
  initialCursor?: string | null;
}) {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<IndicCol[]>([]);
  const [summary, setSummary] = React.useState<ApiRes['summary']>(null);
  const [nextCursor, setNextCursor] = React.useState<string | null>(null);

  // prev를 위해 cursor 히스토리 스택
  const [cursorStack, setCursorStack] = React.useState<string[]>([]);
  const [currentCursor, setCurrentCursor] = React.useState<string | null>(
    initialCursor
  );

  const fetchPage = React.useCallback(
    async (cursor: string | null) => {
      setLoading(true);
      try {
        const qs = new URLSearchParams();
        qs.set('limit', '5');
        if (cursor) qs.set('cursor', cursor);

        const res = await fetch(
          `/api/corps/${corpId}/indicators?${qs.toString()}`,
          {
            cache: 'no-store',
          }
        );
        if (!res.ok) throw new Error('Failed to fetch indicators');

        const json: ApiRes = await res.json();
        setData(json.data);
        setSummary(json.summary);
        setNextCursor(json.page.nextCursor);
      } finally {
        setLoading(false);
      }
    },
    [corpId]
  );

  React.useEffect(() => {
    fetchPage(currentCursor);
  }, [currentCursor]);

  const currency = data[0]?.currency ?? '-';

  const onNext = () => {
    if (!nextCursor) return;
    setCursorStack((s) => (currentCursor ? [...s, currentCursor] : [...s]));
    setCurrentCursor(nextCursor);
  };

  const onPrev = () => {
    setCursorStack((s) => {
      if (!s.length) return s;
      const prev = s[s.length - 1];
      setCurrentCursor(prev);
      return s.slice(0, -1);
    });
  };

  console.log(data);

  return (
    <div>
      <h2
        id="fin-indic"
        className="scroll-m-36 border-b pb-2 font-semibold text-xl tracking-tight first:mt-0"
      >
        {locale === 'en' ? 'Financial Indicators' : '재무지표'}
        <Label className="mt-2 block">
          {locale === 'en' ? `[Currency: ${currency}]` : `[통화: ${currency}]`}
        </Label>
      </h2>

      <div className="mt-6 space-y-6">
        {/* 상단 요약 */}
        <Table className="table-fixed">
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                {locale === 'en' ? 'PER (Prev Day)' : 'PER 전일'}
              </TableCell>
              <TableCell className="text-right">
                {summary?.perPrev == null ? '-' : formatNumber(summary.perPrev)}
              </TableCell>

              <TableCell className="font-medium">
                {locale === 'en' ? 'PBR (Prev Day)' : 'PBR 전일'}
              </TableCell>
              <TableCell className="text-right">
                {summary?.pbrPrev == null ? '-' : formatNumber(summary.pbrPrev)}
              </TableCell>

              <TableCell className="font-medium">
                {locale === 'en' ? 'EV/EBITDA (Prev Day)' : 'EV/EBITDA 전일'}
              </TableCell>
              <TableCell className="text-right">
                {summary?.evEbitdaPrev == null
                  ? '-'
                  : formatNumber(summary.evEbitdaPrev)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">
                {locale === 'en'
                  ? 'Revenue Pattern (3Y LTM)'
                  : '매출액 증감(최근 3LTM)'}
              </TableCell>
              <TableCell className="text-right">
                {summary?.revenuePattern_3y ?? '-'}
              </TableCell>

              <TableCell className="font-medium">
                {locale === 'en'
                  ? 'Op Profit Pattern (3Y LTM)'
                  : '영업이익 증감(최근 3LTM)'}
              </TableCell>
              <TableCell className="text-right">
                {summary?.operatingProfitPattern_3y ?? '-'}
              </TableCell>

              <TableCell className="font-medium">
                {locale === 'en'
                  ? 'EBITDA Pattern (3Y LTM)'
                  : 'EBITDA 증감(최근 3LTM)'}
              </TableCell>
              <TableCell className="text-right">
                {summary?.ebitdaPattern_3y ?? '-'}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* 메인 테이블 */}
        <div className="space-y-3">
          {loading && !data.length ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-60 w-full" />
            </div>
          ) : (
            <Table className="table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead colSpan={2} style={{ width: 220 }} />
                  {data.map((col) => (
                    <TableHead
                      key={`${col.reportId}-${col.statementId}`}
                      className="whitespace-nowrap font-semibold text-center"
                      style={{ width: 120 }}
                    >
                      {col.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {FINANCIAL_INDIC_FIELDS.flatMap((section) =>
                  section.fields.map((field, i) => {
                    const firstRow =
                      i === 0 ? (
                        <TableCell
                          rowSpan={section.fields.length}
                          className="align-top font-semibold"
                        >
                          {'label' in section
                            ? typeof section.label === 'string'
                              ? section.label
                              : section.label[locale]
                            : ''}
                        </TableCell>
                      ) : null;

                    const fieldLabel =
                      typeof field.label === 'string'
                        ? field.label
                        : field.label[locale];

                    return (
                      <TableRow key={`${section.key}-${field.key}`}>
                        {firstRow}
                        <TableCell className="whitespace-nowrap">
                          {fieldLabel}
                        </TableCell>

                        {data.map((col) => (
                          <TableCell
                            key={`${section.key}-${field.key}-${col.reportId}-${col.statementId}`}
                            className={
                              field.type === 'number' ||
                              field.type === 'percent'
                                ? 'whitespace-nowrap text-right'
                                : 'whitespace-nowrap'
                            }
                          >
                            {renderIndicValue(field, col[field.key])}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          )}

          {/* 버튼형 페이지네이션(커서 기반) */}
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onPrev}
              disabled={!cursorStack.length || loading}
            >
              {locale === 'en' ? 'Prev' : '이전'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onNext}
              disabled={!nextCursor || loading}
            >
              {locale === 'en' ? 'Next' : '다음'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
