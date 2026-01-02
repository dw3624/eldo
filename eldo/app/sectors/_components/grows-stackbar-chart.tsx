import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ChangeDistRow } from '@/lib/analysis/types';

const stackBarConfig = {
  bd: { label: 'Bad', color: '#1e3a8a' },
  td: { label: 'Down', color: '#3b82f6' },
  dn: { label: 'Turn Down', color: '#60a5fa' },
  rd: { label: 'Recent Down', color: '#93c5fd' },
  df: { label: 'Down & Flat', color: '#bfdbfe' },
  ft: { label: 'Flat', color: '#e5e7eb' },
  uf: { label: 'Up & Flat', color: '#fef3c7' },
  ru: { label: 'Recent Up', color: '#fde047' },
  up: { label: 'Turn Up', color: '#fbbf24' },
  tu: { label: 'Up', color: '#f97316' },
  gu: { label: 'Good', color: '#dc2626' },
} satisfies ChartConfig;

const GrowsStackbarChart = ({ data }: { data: ChangeDistRow[] }) => {
  const chartData = data.map((row) => {
    const { dist } = row;
    // 해당 행의 모든 수치 합계 계산
    const total = Object.values(dist).reduce((acc, val) => acc + (val || 0), 0);

    return {
      label: row.label,
      labelEn: row.labelEn,
      bd: total > 0 ? (dist.bd || 0) / total : 0,
      td: total > 0 ? (dist.td || 0) / total : 0,
      dn: total > 0 ? (dist.dn || 0) / total : 0,
      rd: total > 0 ? (dist.rd || 0) / total : 0,
      df: total > 0 ? (dist.df || 0) / total : 0,
      ft: total > 0 ? (dist.ft || 0) / total : 0,
      uf: total > 0 ? (dist.uf || 0) / total : 0,
      ru: total > 0 ? (dist.ru || 0) / total : 0,
      up: total > 0 ? (dist.up || 0) / total : 0,
      tu: total > 0 ? (dist.tu || 0) / total : 0,
      gu: total > 0 ? (dist.gu || 0) / total : 0,
    };
  });

  const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>기업수</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={stackBarConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              stackOffset="sign"
              margin={{
                top: 20,
                right: 0,
                left: 0,
                bottom: 20,
              }}
            >
              <XAxis
                type="number"
                domain={[0, 1]}
                tickFormatter={formatPercent}
                label={{
                  value: '비율',
                  position: 'insideBottom',
                  offset: -10,
                }}
              />
              <YAxis
                type="category"
                dataKey="labelEn"
                tick={{ fontSize: 12 }}
                width={100}
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend content={<ChartLegendContent />} />

              {/* 각 카테고리별 Bar */}
              <Bar dataKey="bd" stackId="a" fill="var(--color-bd)" />
              <Bar dataKey="td" stackId="a" fill="var(--color-td)" />
              <Bar dataKey="dn" stackId="a" fill="var(--color-dn)" />
              <Bar dataKey="rd" stackId="a" fill="var(--color-rd)" />
              <Bar dataKey="df" stackId="a" fill="var(--color-df)" />
              <Bar dataKey="ft" stackId="a" fill="var(--color-ft)" />
              <Bar dataKey="uf" stackId="a" fill="var(--color-uf)" />
              <Bar dataKey="ru" stackId="a" fill="var(--color-ru)" />
              <Bar dataKey="up" stackId="a" fill="var(--color-up)" />
              <Bar dataKey="tu" stackId="a" fill="var(--color-tu)" />
              <Bar dataKey="gu" stackId="a" fill="var(--color-gu)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrowsStackbarChart;
