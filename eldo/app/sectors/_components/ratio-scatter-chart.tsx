import {
  ComposedChart,
  Legend,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
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
  'Compnay Count',
  'Missing Ratio',
  'Revenue',
  'EBITDA',
  'Net Income',
  'Equity',
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
      <section>
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          <div className="w-full lg:w-1/3 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead />
                  <TableHead>Company Count</TableHead>
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
                    <TableCell>{row[aggKey]?.toFixed(2)}</TableCell>
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
                  top: 10,
                  right: 10,
                  bottom: 10,
                  left: 5,
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
      </section>
    </div>
  );
};

export default RatioScatterChart;
