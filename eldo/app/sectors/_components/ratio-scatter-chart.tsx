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

const RatioScatterChart = () => {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default RatioScatterChart;
