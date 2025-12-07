import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import DataTable from './data-table';
import Heatmap from './heatmap';

export type ChartCardDataRow = {
  sector: string;
  total: number;
  avg: number;
  med: number;
  ranges: number[];
};
export type ChartCardProps = {
  data: ChartCardDataRow[];
  columns: string[];
  title?: string;
  description?: string;
  type?: 'heatmap' | 'bar';
  formatValue?: (value: number) => string;
};

const ChartCard = ({
  data,
  columns,
  title = 'Heatmap',
  description,
  type = 'heatmap',
  formatValue = (num: number) => num.toLocaleString('ko-KR'),
}: ChartCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <Heatmap data={data} columns={columns} formatValue={formatValue} />
        <DataTable data={data} columns={columns} formatValue={formatValue} />
      </CardContent>
    </Card>
  );
};

export default ChartCard;
