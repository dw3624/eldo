import { listedDistData, salesDistColumns } from '../_lib/dummy';
import ChartCard from './chart-card';

const RatioHeatmapChart = () => {
  return (
    <div className="flex flex-col gap-6">
      <ChartCard
        data={listedDistData}
        columns={salesDistColumns}
        title="시가총액, 자산총계, 매출액 분포"
      />
    </div>
  );
};

export default RatioHeatmapChart;
