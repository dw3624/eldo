'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { listedDistColumns } from '../_lib/dummy';

import {
  CorpDist,
  CorpDistStatRow,
  FinancialMetricRow,
  ListingAgeRow,
} from '@/lib/analysis/types';
import Heatmap from './heatmap';
import { cn } from '@/lib/utils';

export const CorpNumCols = [
  'Company Count',
  'Missing Ratio',
  'Revenue',
  'EBITDA',
  'Net Income',
  'Equity',
  'CFO',
  '',
];

const columns = [
  { key: 'labelEn', labelEn: 'EMSEC' },
  { key: 'corpCount', labelEn: 'Company' },
  { key: 'missing', labelEn: 'Missing' },
  { key: 'revenueZero', labelEn: 'Revenue <= 0' },
  { key: 'ebitdaZero', labelEn: 'EBITDA <= 0' },
];

const chartConfig = {
  usa: {
    label: 'USA',
    color: 'hsl(221, 83%, 53%)',
  },
  kor: {
    label: 'KOR',
    color: 'hsl(221, 83%, 53%)',
  },
} satisfies ChartConfig;

const formatNumber = (num: number | null) => {
  if (num == null) return '-';
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K`;
  }
  return num.toFixed(2);
};

const CorpDistChart = ({ data }: { data: CorpDist }) => {
  return (
    <div className="flex flex-col gap-6">
      {data.meta.selector.metric === 'corpCount' && (
        <section className="space-y-6">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead colSpan={2} />
                <TableHead className="text-center">Data</TableHead>
                <TableHead colSpan={5}>Proportion of values {`<=`} 0</TableHead>
                <TableHead />
              </TableRow>
              <TableRow>
                <TableHead />
                {CorpNumCols.map((col) => (
                  <TableHead
                    key={col}
                    className="truncate text-center break-normal"
                  >
                    {col}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {(data.rows as CorpDistStatRow[]).map((row) => {
                const chartMax = Math.max(...data.rows.map((r) => r.corpCount));
                // const usaChartData = [{ country: 'USA', value: row.usaCount }];
                // const korChartData = [{ country: 'KOR', value: row.corpCount }];
                return (
                  <TableRow key={`${row.emsecId}`}>
                    <TableCell className="truncate">{row.labelEn}</TableCell>
                    <TableCell className="text-end">
                      {row.corpCount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-end ">
                      {formatNumber(row.missingRatio * 100)}%
                    </TableCell>
                    <TableCell className="text-end ">
                      {formatNumber(row.revenueZeroRatio * 100)}%
                    </TableCell>
                    <TableCell className="text-end ">
                      {formatNumber(row.ebitdaZeroRatio * 100)}%
                    </TableCell>
                    <TableCell className="text-end">
                      {formatNumber(row.netIncomeZeroRatio * 100)}%
                    </TableCell>
                    <TableCell className="text-end ">
                      {formatNumber(row.equityZeroRatio * 100)}%
                    </TableCell>
                    <TableCell className="text-end ">
                      {formatNumber(row.cfoZeroRatio * 100)}%
                    </TableCell>
                    <TableCell>
                      <ChartContainer config={chartConfig}>
                        <BarChart
                          accessibilityLayer
                          data={[row]}
                          layout="vertical"
                        >
                          <XAxis type="number" hide domain={[0, chartMax]} />
                          <YAxis type="category" dataKey="country" hide />
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                          />
                          <Bar
                            dataKey="corpCount"
                            fill="var(--color-usa)"
                            radius={2}
                          />
                        </BarChart>
                      </ChartContainer>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <Table className="table-fixed">
            <TableHeader>
              <TableRow>
                {columns.map((item) => (
                  <TableHead
                    key={item.key}
                    className={cn(
                      item.labelEn === 'EMSEC' ? '' : 'text-center'
                    )}
                  >
                    {item.labelEn}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {(data.rows as CorpDistStatRow[]).map((row) => (
                <TableRow key={row.emsecId}>
                  <TableCell className="truncate">{row.labelEn}</TableCell>
                  <TableCell className="text-center">
                    {row.corpCount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.missing.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.revenueZero.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.ebitdaZero.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}
      {data.meta.selector.metric === 'listingAge' && (
        <section className="space-y-6">
          <Heatmap
            type="listingAge"
            data={data.rows as ListingAgeRow[]}
            columns={listedDistColumns}
            formatValue={formatNumber}
          />

          <Table className="table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead>EMSEC</TableHead>
                <TableHead className="text-center truncate">
                  Company Count
                </TableHead>
                <TableHead className="text-center truncate">Average</TableHead>
                <TableHead className="text-center truncate">Median</TableHead>
                {listedDistColumns.map((col) => (
                  <TableHead
                    key={col}
                    className="whitespace-normal break-keep py-4 text-center font-semibold text-xs truncate"
                  >
                    {col}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {(data.rows as ListingAgeRow[]).map((row) => (
                <TableRow key={row.emsecId}>
                  <TableCell className="truncate">{row.labelEn}</TableCell>
                  <TableCell className="text-center">
                    {row.corpCount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatNumber(row.avgYearsSinceListing)}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatNumber(row.medYearsSinceListing)}
                  </TableCell>
                  {row.bins.map((bin) => (
                    <TableCell key={bin.key} className="text-center">
                      {bin.val.toLocaleString()}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}
      {['marketCap', 'revenue', 'assets'].includes(
        data.meta.selector.metric
      ) && (
        <section>
          <Heatmap
            type="financialMetric"
            data={data.rows as FinancialMetricRow[]}
            columns={(data.rows as FinancialMetricRow[])[0].bins.map(
              (bin) => bin.key
            )}
            formatValue={formatNumber}
          />
          <Table className="table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead>EMSEC</TableHead>
                <TableHead className="text-center truncate">
                  Company Count
                </TableHead>
                <TableHead className="text-center truncate">Average</TableHead>
                <TableHead className="text-center truncate">Median</TableHead>
                {(data.rows as FinancialMetricRow[])[0].bins
                  .map((bin) => bin.key)
                  .map((col) => (
                    <TableHead
                      key={col}
                      className="whitespace-normal break-normal py-4 text-center font-semibold text-xs truncate"
                    >
                      {col}
                    </TableHead>
                  ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {(data.rows as FinancialMetricRow[]).map((row) => (
                <TableRow key={row.emsecId}>
                  <TableCell className="truncate">{row.labelEn}</TableCell>
                  <TableCell className="text-center">
                    {row.corpCount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatNumber(row.summary.avg)}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatNumber(row.summary.med)}
                  </TableCell>
                  {row.bins.map((bin) => (
                    <TableCell key={bin.key} className="text-center">
                      {bin.val.toLocaleString()}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}
    </div>
  );
};

export default CorpDistChart;
