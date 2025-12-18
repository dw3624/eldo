'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { formatCompact, formatNumber } from '../_lib/utils';

export type AnnualRow = {
  label: string; // "YYYY"
  currency: string | null;

  assetsTtl: number | null;
  liabilitiesTtl: number | null;
  equityTtl: number | null;

  revenue: number | null;
  operatingProfit: number | null;
  netIncome: number | null;
};

type MetricKey =
  | 'assetsTtl'
  | 'liabilitiesTtl'
  | 'equityTtl'
  | 'revenue'
  | 'operatingProfit'
  | 'netIncome';

const chartConfig = {
  value: {
    label: 'Value',
    // shadcn chart는 CSS 변수 기반 컬러를 많이 씁니다.
    // 실제 색상은 테마에서 관리되므로 여기서 하드코딩 느낌이 덜합니다.
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

function MetricChartCard({
  title,
  metricKey,
  data,
  currency,
}: {
  title: string;
  metricKey: MetricKey;
  data: AnnualRow[];
  currency?: string | null;
}) {
  // recharts는 dataKey를 문자열로 받으니, value로 매핑해서 통일합니다.
  const normalized = React.useMemo(
    () =>
      data.map((d) => ({
        label: d.label,
        value: d[metricKey] ?? null,
      })),
    [data, metricKey]
  );

  return (
    <Card>
      <CardHeader className="py-3">
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <ChartContainer config={chartConfig} className="h-[100px] w-full">
          <BarChart data={normalized} margin={{ left: 8, right: 8 }}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              interval={0}
              minTickGap={6}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              width={48}
              tickFormatter={(v) => formatCompact(Number(v), currency)}
            />

            {/* Tooltip: full number (축은 compact, 툴팁은 full) */}
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => {
                    const num =
                      typeof value === 'number' ? value : Number(value);
                    return `${formatNumber(num)}${
                      currency ? ` ${currency}` : ''
                    }`;
                  }}
                  labelFormatter={(label) => `Year: ${label}`}
                />
              }
            />

            <Bar dataKey="value" fill="var(--color-value)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default function FinMetricsCharts({
  data,
}: {
  data: AnnualRow[]; // 최근 5년 (오래된 -> 최신 순 권장)
}) {
  const currency = data?.[data.length - 1]?.currency ?? null;

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      <MetricChartCard
        title="Total Assets (Last 5Y)"
        metricKey="assetsTtl"
        data={data}
        currency={currency}
      />
      <MetricChartCard
        title="Total Liabilities (Last 5Y)"
        metricKey="liabilitiesTtl"
        data={data}
        currency={currency}
      />
      <MetricChartCard
        title="Total Equity (Last 5Y)"
        metricKey="equityTtl"
        data={data}
        currency={currency}
      />
      <MetricChartCard
        title="Revenue (Last 5Y)"
        metricKey="revenue"
        data={data}
        currency={currency}
      />
      <MetricChartCard
        title="Operating Profit (Last 5Y)"
        metricKey="operatingProfit"
        data={data}
        currency={currency}
      />
      <MetricChartCard
        title="Net Income (Last 5Y)"
        metricKey="netIncome"
        data={data}
        currency={currency}
      />
    </div>
  );
}
