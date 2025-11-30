import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
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
import ChartCard from './chart-card';
import { listedDistColumns, listedDistData, salesDistColumns } from './dummy';

export const CorpNumCols = [
  '기업수',
  '미수집비율',
  '매출액',
  ' EBITDA',
  '지배순이익',
  '자기자본',
  'CFO',
  'USA',
  'KOR',
];
interface IndustryData {
  sector: string;
  corpCount: number;
  marketCap: number;
  sales: number;
  ebitda: number;
  operatingIncome: number;
  netIncome: number;
  cfo: number;
  usaCount: number;
  korCount: number;
}
const industryData: IndustryData[] = [
  {
    sector: 'Technology',
    corpCount: 450,
    marketCap: 2500000,
    sales: 850000,
    ebitda: 180000,
    operatingIncome: 150000,
    netIncome: 120000,
    cfo: 140000,
    usaCount: 320,
    korCount: 130,
  },
  {
    sector: 'Healthcare',
    corpCount: 380,
    marketCap: 1800000,
    sales: 620000,
    ebitda: 140000,
    operatingIncome: 115000,
    netIncome: 95000,
    cfo: 108000,
    usaCount: 280,
    korCount: 100,
  },
  {
    sector: 'Finance',
    corpCount: 290,
    marketCap: 1500000,
    sales: 450000,
    ebitda: 98000,
    operatingIncome: 82000,
    netIncome: 68000,
    cfo: 75000,
    usaCount: 210,
    korCount: 80,
  },
  {
    sector: 'Consumer',
    corpCount: 520,
    marketCap: 1200000,
    sales: 780000,
    ebitda: 125000,
    operatingIncome: 98000,
    netIncome: 75000,
    cfo: 89000,
    usaCount: 380,
    korCount: 140,
  },
  {
    sector: 'Industrial',
    corpCount: 410,
    marketCap: 980000,
    sales: 560000,
    ebitda: 89000,
    operatingIncome: 72000,
    netIncome: 58000,
    cfo: 65000,
    usaCount: 295,
    korCount: 115,
  },
  {
    sector: 'Energy',
    corpCount: 180,
    marketCap: 1100000,
    sales: 890000,
    ebitda: 165000,
    operatingIncome: 142000,
    netIncome: 118000,
    cfo: 135000,
    usaCount: 125,
    korCount: 55,
  },
  {
    sector: 'Materials',
    corpCount: 240,
    marketCap: 750000,
    sales: 420000,
    ebitda: 68000,
    operatingIncome: 55000,
    netIncome: 42000,
    cfo: 48000,
    usaCount: 170,
    korCount: 70,
  },
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
const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K`;
  }
  return num.toString();
};

export const scatterData = [
  {
    industry: 'Materials',
    corpNum: 10,
    med: 23,
    avg: 22,
    halAvg: 13,
    ratio: 0.04,
  },
  {
    industry: 'Financial',
    corpNum: 12,
    med: 33,
    avg: 12,
    halAvg: 32,
    ratio: 0.43,
  },
  { industry: 'Energy', corpNum: 6, med: 3, avg: 25, halAvg: 32, ratio: 0.03 },
  {
    industry: 'Industrial',
    corpNum: 8,
    med: 43,
    avg: 24,
    halAvg: 33,
    ratio: 0.15,
  },
];
const scatterChartConfig = {
  avg: {
    label: 'Average',
    color: 'hsl(221, 83%, 53%)',
  },
  med: {
    label: 'Median',
    color: 'hsl(221, 83%, 53%)',
  },
} satisfies ChartConfig;

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

const CorpDistChart = () => {
  const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;

  return (
    <div className="flex flex-col gap-6">
      <ChartContainer config={stackBarConfig} className="w-full">
        <BarChart
          data={StackBarData}
          layout="vertical"
          stackOffset="sign"
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 5,
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
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, name) => (
                  <div className="flex items-center justify-between gap-4">
                    <span>
                      {
                        stackBarConfig[name as keyof typeof stackBarConfig]
                          ?.label
                      }
                      :
                    </span>
                    <span className="font-semibold">
                      {formatPercent(Number(value))}
                    </span>
                  </div>
                )}
              />
            }
          />
          <Legend
            verticalAlign="top"
            align="right"
            layout="vertical"
            wrapperStyle={{
              paddingLeft: '20px',
              fontSize: '12px',
            }}
            iconType="square"
            iconSize={12}
          />
          <ReferenceLine
            x={0}
            stroke="#000"
            strokeWidth={2}
            strokeDasharray="5 5"
            label={{
              value: '평균',
              position: 'top',
              fill: '#000',
              fontSize: 10,
            }}
          />
          {/* 각 카테고리별 Bar */}
          <Bar dataKey="bad" stackId="a" fill="var(--color-bad)" />
          <Bar dataKey="down" stackId="a" fill="var(--color-down)" />
          <Bar dataKey="turnDown" stackId="a" fill="var(--color-turnDown)" />
          <Bar
            dataKey="recentDown"
            stackId="a"
            fill="var(--color-recentDown)"
          />
          <Bar dataKey="downFlat" stackId="a" fill="var(--color-downFlat)" />
          <Bar dataKey="flat" stackId="a" fill="var(--color-flat)" />
          <Bar dataKey="upFlat" stackId="a" fill="var(--color-upFlat)" />
          <Bar dataKey="recentUp" stackId="a" fill="var(--color-recentUp)" />
          <Bar dataKey="turnUp" stackId="a" fill="var(--color-turnUp)" />
          <Bar dataKey="up" stackId="a" fill="var(--color-up)" />
          <Bar dataKey="good" stackId="a" fill="var(--color-good)" />
        </BarChart>
      </ChartContainer>
      <div className="w-full">
        <div className="inline-flex min-w-full">
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>r</TableHead>
                  <TableHead>s</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>2</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="max-w-[1000px] flex-1">
            <ChartContainer config={scatterChartConfig} className="">
              <ComposedChart
                layout="vertical"
                style={{
                  width: '100%',
                  aspectRatio: 1.618,
                }}
                data={scatterData}
                margin={{
                  top: 20,
                  right: 0,
                  bottom: 0,
                  left: 0,
                }}
              >
                <XAxis type="number" />
                <YAxis type="category" dataKey="industry" name="industry" />
                <Tooltip />
                <Legend />
                <Scatter dataKey={'corpNum'} fill="#8014d8" />
                <Scatter dataKey={'avg'} fill="#8aa4d8" />
                <Scatter dataKey={'halAvg'} fill="#413ea0" />
                <Scatter dataKey={'ratio'} fill="#8884d8" />
                <Scatter dataKey={'med'} fill="#ff7300" line />
              </ComposedChart>
            </ChartContainer>
          </div>
        </div>
      </div>
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
              {industryData.map((row) => {
                const usaChartData = [{ country: 'USA', value: row.usaCount }];
                const korChartData = [{ country: 'KOR', value: row.korCount }];
                return (
                  <TableRow key={row.sector}>
                    <TableCell className="truncate">{row.sector}</TableCell>
                    <TableCell>{row.corpCount}</TableCell>
                    <TableCell>{formatNumber(row.marketCap)}</TableCell>
                    <TableCell>{formatNumber(row.sales)}</TableCell>
                    <TableCell>{formatNumber(row.ebitda)}</TableCell>
                    <TableCell>{formatNumber(row.operatingIncome)}</TableCell>
                    <TableCell>{formatNumber(row.netIncome)}</TableCell>
                    <TableCell>{formatNumber(row.cfo)}</TableCell>
                    <TableCell className="p-2">
                      <ChartContainer config={chartConfig} className="h-8 w-24">
                        <BarChart
                          accessibilityLayer
                          data={usaChartData}
                          layout="vertical"
                          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        >
                          <XAxis type="number" hide domain={[0, 400]} />
                          <YAxis type="category" dataKey="country" hide />
                          <ChartTooltip
                            cursor={false}
                            content={
                              <ChartTooltipContent
                                hideLabel
                                formatter={(value) => (
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold">USA:</span>
                                    <span>{value}</span>
                                  </div>
                                )}
                              />
                            }
                          />
                          <Bar
                            dataKey="value"
                            fill="var(--color-usa)"
                            radius={2}
                            barSize={12}
                          />
                        </BarChart>
                      </ChartContainer>
                    </TableCell>
                    {/* KOR 바차트 */}
                    <TableCell className="p-2">
                      <ChartContainer config={chartConfig} className="h-8 w-24">
                        <BarChart
                          accessibilityLayer
                          data={korChartData}
                          layout="vertical"
                          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        >
                          <XAxis type="number" hide domain={[0, 400]} />
                          <YAxis type="category" dataKey="country" hide />
                          <ChartTooltip
                            cursor={false}
                            content={
                              <ChartTooltipContent
                                hideLabel
                                formatter={(value) => (
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold">KOR:</span>
                                    <span>{value}</span>
                                  </div>
                                )}
                              />
                            }
                          />
                          <Bar
                            dataKey="value"
                            fill="var(--color-kor)"
                            radius={2}
                            barSize={12}
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
      <ChartCard
        data={listedDistData}
        columns={salesDistColumns}
        title="시가총액, 자산총계, 매출액 분포"
      />
    </div>
  );
};

export default CorpDistChart;
