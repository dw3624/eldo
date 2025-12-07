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

export const StackBarData = [
  {
    sector: 'Finance and Assets',
    bad: 0.06,
    down: 0.04,
    turnDown: 0.05,
    recentDown: 0.07,
    downFlat: 0.1,
    flat: 0.18,
    upFlat: 0.15,
    recentUp: 0.12,
    turnUp: 0.1,
    up: 0.08,
    good: 0.05,
  },
  {
    sector: 'Information and Communication Technology',
    bad: 0.05,
    down: 0.03,
    turnDown: 0.07,
    recentDown: 0.08,
    downFlat: 0.07,
    flat: 0.1,
    upFlat: 0.2,
    recentUp: 0.15,
    turnUp: 0.12,
    up: 0.08,
    good: 0.05,
  },
  {
    sector: 'Energy',
    bad: 0.02,
    down: 0.08,
    turnDown: 0.05,
    recentDown: 0.05,
    downFlat: 0.08,
    flat: 0.12,
    upFlat: 0.2,
    recentUp: 0.15,
    turnUp: 0.12,
    up: 0.08,
    good: 0.05,
  },
];
const stackBarConfig = {
  bad: {
    label: 'Bad',
    color: '#1e3a8a', // 진한 남색
  },
  down: {
    label: 'Down',
    color: '#3b82f6', // 파랑
  },
  turnDown: {
    label: 'Turn Down',
    color: '#60a5fa', // 연한 파랑
  },
  recentDown: {
    label: 'Recent Down',
    color: '#93c5fd', // 매우 연한 파랑
  },
  downFlat: {
    label: 'Down & Flat',
    color: '#bfdbfe', // 아주 연한 파랑
  },
  flat: {
    label: 'Flat',
    color: '#e5e7eb', // 회색
  },
  upFlat: {
    label: 'Up & Flat',
    color: '#fef3c7', // 아주 연한 노랑
  },
  recentUp: {
    label: 'Recent Up',
    color: '#fde047', // 연한 노랑
  },
  turnUp: {
    label: 'Turn Up',
    color: '#fbbf24', // 노랑
  },
  up: {
    label: 'Up',
    color: '#f97316', // 주황
  },
  good: {
    label: 'Good',
    color: '#dc2626', // 빨강
  },
} satisfies ChartConfig;

const GrowsStackbarChart = () => {
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
              data={StackBarData}
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
                dataKey="sector"
                width={190}
                tick={{ fontSize: 12 }}
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend content={<ChartLegendContent />} />

              {/* 각 카테고리별 Bar */}
              <Bar dataKey="bad" stackId="a" fill="var(--color-bad)" />
              <Bar dataKey="down" stackId="a" fill="var(--color-down)" />
              <Bar
                dataKey="turnDown"
                stackId="a"
                fill="var(--color-turnDown)"
              />
              <Bar
                dataKey="recentDown"
                stackId="a"
                fill="var(--color-recentDown)"
              />
              <Bar
                dataKey="downFlat"
                stackId="a"
                fill="var(--color-downFlat)"
              />
              <Bar dataKey="flat" stackId="a" fill="var(--color-flat)" />
              <Bar dataKey="upFlat" stackId="a" fill="var(--color-upFlat)" />
              <Bar
                dataKey="recentUp"
                stackId="a"
                fill="var(--color-recentUp)"
              />
              <Bar dataKey="turnUp" stackId="a" fill="var(--color-turnUp)" />
              <Bar dataKey="up" stackId="a" fill="var(--color-up)" />
              <Bar dataKey="good" stackId="a" fill="var(--color-good)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrowsStackbarChart;
