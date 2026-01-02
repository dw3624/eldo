import {
  ComposedChart,
  Legend,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type ChartConfig, ChartContainer } from '@/components/ui/chart';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RatioChart } from '@/lib/analysis/types';

export const CorpNumCols = [
  '기업수',
  '미수집비율',
  '매출액',
  'EBITDA',
  '지배순이익',
  '자기자본',
  'CFO',
  'USA',
  'KOR',
];

const scatterChartConfig = {
  avg: {
    label: 'Average',
    color: 'hsl(221, 83%, 53%)',
  },
  hrm: {
    label: 'Median',
    color: 'hsl(221, 83%, 53%)',
  },
  med: {
    label: 'Median',
    color: 'hsl(221, 83%, 53%)',
  },
  corpCount: {
    label: 'Median',
    color: 'hsl(221, 83%, 53%)',
  },
} satisfies ChartConfig;

const RatioScatterChart = ({ data }: { data: RatioChart }) => {
  const aggKey = data.meta.selector.agg as keyof typeof scatterChartConfig;
  const chartData = data.rows.map((r) => ({
    ...r,
    corpCount: r.corpCount,
    ...r.summary,
  }));
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col-reverse lg:flex-row gap-8">
            <div className="w-full lg:w-1/3 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead />
                    <TableHead>기업수</TableHead>
                    <TableHead>
                      {aggKey && scatterChartConfig[aggKey].label}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chartData.map((row) => (
                    <TableRow key={row.emsecId}>
                      <TableCell>{row.labelEn}</TableCell>
                      <TableCell>{row.corpCount}</TableCell>
                      <TableCell>{row[aggKey]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="w-full lg:flex-1 min-h-[400px]">
              <ChartContainer
                config={scatterChartConfig}
                className="aspect=[1.618] w-full"
              >
                <ComposedChart
                  layout="vertical"
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="industry" name="industry" />
                  <Tooltip />
                  <Legend />
                  <Scatter dataKey={'corpCount'} fill="#8014d8" />
                  <Scatter dataKey={'avg'} fill="#8aa4d8" />
                  <Scatter dataKey={'hrm'} fill="#413ea0" />
                  {/* <Scatter dataKey={'ratio'} fill="#8884d8" /> */}
                  <Scatter dataKey={'med'} fill="#ff7300" line />
                </ComposedChart>
              </ChartContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RatioScatterChart;
