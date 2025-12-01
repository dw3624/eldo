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
  ' EBITDA',
  '지배순이익',
  '자기자본',
  'CFO',
  'USA',
  'KOR',
];
type IndustryData = {
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
};
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

const CorpDistChart = () => {
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
                    <TableCell>
                      <ChartContainer config={chartConfig}>
                        <BarChart
                          accessibilityLayer
                          data={usaChartData}
                          layout="vertical"
                        >
                          <XAxis type="number" hide domain={[0, 400]} />
                          <YAxis type="category" dataKey="country" hide />
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                          />
                          <Bar
                            dataKey="value"
                            fill="var(--color-usa)"
                            radius={2}
                          />
                        </BarChart>
                      </ChartContainer>
                    </TableCell>
                    {/* KOR 바차트 */}
                    <TableCell>
                      <ChartContainer config={chartConfig}>
                        <BarChart
                          accessibilityLayer
                          data={korChartData}
                          layout="vertical"
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
    </div>
  );
};

export default CorpDistChart;
