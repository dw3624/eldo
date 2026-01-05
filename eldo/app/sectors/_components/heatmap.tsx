'use client';

// import { useState } from 'react';
import {
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import {
  FinancialMetricRow,
  ListingAgeRow,
  RatioChartRow,
} from '@/lib/analysis/types';

export type HeatmapProps = {
  type: 'listingAge' | 'financialMetric' | 'ratio';
  data: ListingAgeRow[] | FinancialMetricRow[] | RatioChartRow[];
  columns: string[];
  caption?: string;
  formatValue?: (value: number | null) => string;
  colorScheme?: {
    positive?: number; // HSL hue value (default: 210)
    negative?: number; // HSL hue value (default: 0)
    total?: number; // HSL hue value (default: 220)
  };
  cellClassName?: string;
};

const Heatmap = ({
  type,
  data,
  columns,
  caption,
  formatValue = (num: number | null) =>
    num ? num.toLocaleString('ko-KR') : '-',
  colorScheme = {},
  cellClassName,
}: HeatmapProps) => {
  const colors = {
    positive: colorScheme.positive ?? 210,
    negative: colorScheme.negative ?? 0,
    total: colorScheme.total ?? 220,
  };

  const allValues = data
    .filter((d) => d.emsecId !== 0)
    .flatMap((d) => d.bins.map((bin) => bin.val));
  const totalValues = data
    .filter((d) => d.emsecId === 0)
    .flatMap((d) => d.bins.map((bin) => bin.val));

  const positiveValues = allValues.filter((v) => v >= 0);
  const negativeValues = allValues.filter((v) => v < 0);

  const maxPositive =
    positiveValues.length > 0 ? Math.max(...positiveValues) : 0;
  const minPositive =
    positiveValues.length > 0 ? Math.min(...positiveValues) : 0;
  const maxNegative =
    negativeValues.length > 0 ? Math.max(...negativeValues) : 0;
  const minNegative =
    negativeValues.length > 0 ? Math.min(...negativeValues) : 0;

  const maxTotal = Math.max(...totalValues);
  const minTotal = Math.min(...totalValues);

  const getColor = (value: number, type: 'total' | 'range') => {
    if (value === null || value === undefined) {
      return 'rgb(255, 255, 255)';
    }

    // total 또는 total 색상
    if (type === 'total') {
      const normalized = (value - minTotal) / (maxTotal - minTotal) || 0;
      const lightness = 70 - normalized * 35;
      return `hsl(${colors.total}, 15%, ${lightness}%)`;
    }

    // 음수 색상
    if (value < 0) {
      const normalized =
        minNegative !== maxNegative
          ? (value - maxNegative) / (minNegative - maxNegative)
          : 1;
      const saturation = 70 + normalized * 30;
      const lightness = 85 - normalized * 50;
      return `hsl(${colors.negative}, ${saturation}%, ${lightness}%)`;
    }

    // 양수 색상
    const normalized =
      minPositive !== maxPositive
        ? (value - minPositive) / (maxPositive - minPositive)
        : 0;
    const saturation = 70 + normalized * 30;
    const lightness = 85 - normalized * 50;
    return `hsl(${colors.positive}, ${saturation}%, ${lightness}%)`;
  };

  const getTextColor = (value: number, threshold: number = 200) => {
    return Math.abs(value) > threshold
      ? 'text-primary-foreground'
      : 'text-primary';
  };

  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <table className="w-full table-fixed border-collapse text-sm">
            {caption && (
              <TableCaption className="caption-top text-end">
                {caption}
              </TableCaption>
            )}
            <TableHeader>
              <TableRow className="bg-secondary text-secondary-foreground">
                <TableHead />
                <TableHead className="font-semibold text-center truncate">
                  Company Count
                </TableHead>

                {['listingAge', 'financialMetric'].includes(type) && (
                  <TableHead className="font-semibold text-center truncate">
                    Average
                  </TableHead>
                )}
                {['listingAge', 'financialMetric'].includes(type) && (
                  <TableHead className="font-semibold text-center truncate">
                    Median
                  </TableHead>
                )}
                {columns.map((col) => (
                  <TableHead
                    key={col}
                    className="whitespace-normal break-keep py-4 text-center font-semibold text-xs truncate"
                  >
                    {['corpDist', 'financialMetric'].includes(type) ? (
                      <span>
                        {parseInt(col.split('_')[0]).toLocaleString()}
                        <br />~ {parseInt(col.split('_')[1]).toLocaleString()}
                      </span>
                    ) : (
                      col
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.labelEn} className="font-semibold">
                  <TableCell className="truncate bg-secondary py-6 text-secondary-foreground">
                    {row.labelEn}
                  </TableCell>

                  <TableCell
                    className={cn('border text-center', cellClassName)}
                    style={{
                      backgroundColor: getColor(row.corpCount, 'total'),
                    }}
                  >
                    <span
                      className={cn(
                        'font-semibold',
                        getTextColor(row.corpCount)
                      )}
                    >
                      {row.corpCount.toLocaleString()}
                    </span>
                  </TableCell>

                  {type === 'listingAge' && (
                    <>
                      <TableCell
                        className={cn('border text-center', cellClassName)}
                        style={{
                          backgroundColor: getColor(
                            (row as ListingAgeRow).avgYearsSinceListing,
                            'total'
                          ),
                        }}
                      >
                        <span
                          className={cn(
                            'font-semibold',
                            getTextColor(
                              (row as ListingAgeRow).avgYearsSinceListing
                            )
                          )}
                        >
                          {formatValue(
                            (row as ListingAgeRow).avgYearsSinceListing
                          )}
                        </span>
                      </TableCell>
                      <TableCell
                        className={cn('border text-center', cellClassName)}
                        style={{
                          backgroundColor: getColor(
                            (row as ListingAgeRow).medYearsSinceListing,
                            'total'
                          ),
                        }}
                      >
                        <span
                          className={cn(
                            'font-semibold',
                            getTextColor(
                              (row as ListingAgeRow).medYearsSinceListing
                            )
                          )}
                        >
                          {formatValue(
                            (row as ListingAgeRow).medYearsSinceListing
                          )}
                        </span>
                      </TableCell>
                    </>
                  )}
                  {type === 'financialMetric' && (
                    <>
                      <TableCell
                        className={cn('border text-center', cellClassName)}
                        style={{
                          backgroundColor: getColor(
                            (row as FinancialMetricRow).summary.avg,
                            'total'
                          ),
                        }}
                      >
                        <span
                          className={cn(
                            'font-semibold',
                            getTextColor(
                              (row as FinancialMetricRow).summary.avg
                            )
                          )}
                        >
                          {formatValue((row as FinancialMetricRow).summary.avg)}
                        </span>
                      </TableCell>
                      <TableCell
                        className={cn('border text-center', cellClassName)}
                        style={{
                          backgroundColor: getColor(
                            (row as FinancialMetricRow).summary.med,
                            'total'
                          ),
                        }}
                      >
                        <span
                          className={cn(
                            'font-semibold',
                            getTextColor(
                              (row as FinancialMetricRow).summary.med
                            )
                          )}
                        >
                          {formatValue((row as FinancialMetricRow).summary.med)}
                        </span>
                      </TableCell>
                    </>
                  )}

                  {row.bins.map((bin, i) => {
                    const isTotal = row.emsecId === 0;
                    return (
                      <Tooltip key={`${row.labelEn}_${i}`}>
                        <TooltipTrigger asChild>
                          <TableCell
                            className={cn('border text-center', cellClassName)}
                            style={{
                              backgroundColor: getColor(
                                bin.val,
                                isTotal ? 'total' : 'range'
                              ),
                            }}
                          >
                            <span
                              className={cn(
                                'font-medium',
                                getTextColor(bin.val)
                              )}
                            >
                              {formatValue(bin.val)}
                            </span>
                          </TableCell>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="flex flex-col gap-1.5 p-1">
                            <div className="font-semibold text-primary-foreground">
                              {row.labelEn}
                            </div>
                            <div className="flex justify-between gap-2 text-secondary">
                              <div className="flex">
                                <div
                                  className="mr-1.5 w-1.5 rounded-md"
                                  style={{
                                    backgroundColor: getColor(
                                      bin.val,
                                      isTotal ? 'total' : 'range'
                                    ),
                                  }}
                                />
                                <div>{columns[i]}</div>
                              </div>
                              <div className="font-semibold text-primary-foreground">
                                {formatValue(bin.val)}
                              </div>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;
