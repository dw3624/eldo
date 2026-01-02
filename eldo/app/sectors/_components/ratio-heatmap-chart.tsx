import { RatioChart } from '@/lib/analysis/types';
import { listedDistColumns } from '../_lib/dummy';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Heatmap from './heatmap';

const RatioHeatmapChart = ({ data }: { data: RatioChart }) => {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>시가총액, 자산총계, 매출액 분포</CardTitle>
          <CardDescription>desc</CardDescription>
        </CardHeader>
        <CardContent>
          <Heatmap type="ratio" data={data.rows} columns={listedDistColumns} />
        </CardContent>
      </Card>
    </div>
  );
};

export default RatioHeatmapChart;
