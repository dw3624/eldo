'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { listedDistColumns, listedDistData } from '../_lib/dummy';
import ChartCard from './chart-card';

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

const CorpDistChart = ({ data }) => {
  console.log(data);
  return (
    <div className="flex flex-col gap-6">
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
              {data.map((row) => {
                const usaChartData = [{ country: 'USA', value: row.usaCount }];
                const korChartData = [{ country: 'KOR', value: row.corpCount }];
                return (
                  <TableRow key={`${row.id}`}>
                    <TableCell className="truncate">
                      {row.subIndustryEn ?? row.industryEn ?? row.sectorEn}
                    </TableCell>
                    <TableCell className="text-end">{row.corpCount}</TableCell>
                    <TableCell className="text-end">
                      {formatNumber(row.corpCountMissing * 100)}%
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
      </Card>
      <ChartCard
        data={listedDistData}
        columns={listedDistColumns}
        title="상장일 분포"
      />
    </div>
  );
};

export default CorpDistChart;
