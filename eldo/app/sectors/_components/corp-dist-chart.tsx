'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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

export const CorpNumCols = [
  '기업수',
  '미수집비율',
  '매출액',
  'EBITDA',
  '지배순이익',
  '자기자본',
  'CFO',
  // 'USA',
  'KOR',
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
  console.log(data);
  return (
    <div className="flex flex-col gap-6">
      {data.meta.selector.metric === 'corpCount' && (
        <Card>
          <CardHeader>
            <CardTitle>기업수</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead colSpan={2} />
                  <TableHead>데이터</TableHead>
                  <TableHead colSpan={5}>수집된 값이 0이하인 비율</TableHead>
                  <TableHead colSpan={2} />
                </TableRow>
                <TableRow>
                  <TableHead />
                  {CorpNumCols.map((col) => (
                    <TableHead key={col} className="truncate">
                      {col}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {(data.rows as CorpDistStatRow[]).map((row) => {
                  // const usaChartData = [{ country: 'USA', value: row.usaCount }];
                  // const korChartData = [{ country: 'KOR', value: row.corpCount }];
                  return (
                    <TableRow key={`${row.emsecId}`}>
                      <TableCell className="truncate">{row.labelEn}</TableCell>
                      <TableCell className="text-end">
                        {row.corpCount}
                      </TableCell>
                      <TableCell className="text-end">
                        {formatNumber(row.missingRatio * 100)}%
                      </TableCell>
                      <TableCell className="text-end">
                        {formatNumber(row.revenueZeroRatio * 100)}%
                      </TableCell>
                      <TableCell className="text-end">
                        {formatNumber(row.ebitdaZeroRatio * 100)}%
                      </TableCell>
                      <TableCell className="text-end">
                        {formatNumber(row.netIncomeZeroRatio * 100)}
                      </TableCell>
                      <TableCell className="text-end">
                        {formatNumber(row.equityZeroRatio * 100)}%
                      </TableCell>
                      <TableCell className="text-end">
                        {formatNumber(row.cfoZeroRatio * 100)}%
                      </TableCell>
                      <TableCell>
                        <ChartContainer config={chartConfig}>
                          <BarChart
                            accessibilityLayer
                            data={[row]}
                            layout="vertical"
                          >
                            <XAxis type="number" hide domain={[0, 400]} />
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
          </CardContent>
          <CardContent>
            <Table className="table-fixed">
              <TableHeader>
                <TableRow>
                  {columns.map((item) => (
                    <TableHead key={item.key}>{item.labelEn}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {(data.rows as CorpDistStatRow[]).map((row) => (
                  <TableRow key={row.emsecId}>
                    <TableCell className="truncate">{row.labelEn}</TableCell>
                    <TableCell className="text-center">
                      {formatNumber(row.corpCount)}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatNumber(row.missing)}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatNumber(row.revenueZero)}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatNumber(row.ebitdaZero)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
      {data.meta.selector.metric === 'listingAge' && (
        <Card>
          <CardHeader>
            <CardTitle>title</CardTitle>
            <CardDescription>desc</CardDescription>
          </CardHeader>
          <CardContent>
            <Heatmap
              type="listingAge"
              data={data.rows as ListingAgeRow[]}
              columns={listedDistColumns}
              formatValue={formatNumber}
            />
          </CardContent>
          <CardContent>
            <Table className="table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead>기업수</TableHead>
                  <TableHead>상장연수 평균값</TableHead>
                  <TableHead>상장연수 중앙값</TableHead>
                  {listedDistColumns.map((col) => (
                    <TableHead
                      key={col}
                      className="whitespace-normal break-keep py-4 text-center font-semibold text-xs"
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
                      {formatNumber(row.corpCount)}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatNumber(row.avgYearsSinceListing)}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatNumber(row.medYearsSinceListing)}
                    </TableCell>
                    {row.bins.map((bin) => (
                      <TableCell key={bin.key} className="text-center">
                        {formatNumber(bin.val)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
      {['marketCap', 'revenue', 'assets'].includes(
        data.meta.selector.metric
      ) && (
        <Card>
          <CardHeader>
            <CardTitle>title</CardTitle>
            <CardDescription>desc</CardDescription>
          </CardHeader>
          <CardContent>
            <Heatmap
              type="financialMetric"
              data={data.rows as FinancialMetricRow[]}
              columns={(data.rows as FinancialMetricRow[])[0].bins.map(
                (bin) => bin.key
              )}
              formatValue={formatNumber}
            />
          </CardContent>
          <CardContent>
            <Table className="table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead>기업수</TableHead>
                  <TableHead>평균값</TableHead>
                  <TableHead>중앙값</TableHead>
                  {(data.rows as FinancialMetricRow[])[0].bins
                    .map((bin) => bin.key)
                    .map((col) => (
                      <TableHead
                        key={col}
                        className="whitespace-normal break-keep py-4 text-center font-semibold text-xs"
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
                      {formatNumber(row.corpCount)}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatNumber(row.summary.avg)}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatNumber(row.summary.med)}
                    </TableCell>
                    {row.bins.map((bin) => (
                      <TableCell key={bin.key} className="text-center">
                        {formatNumber(bin.val)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CorpDistChart;
