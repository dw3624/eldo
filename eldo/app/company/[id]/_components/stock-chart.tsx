import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { StockInfo } from './types';

const StockChartDashboard = ({
  data: rawData,
  exchange: exchange,
}: {
  data: StockInfo[];
  exchange: string | null;
}) => {
  const data = useMemo(() => {
    return [...rawData].sort(
      (a, b) =>
        new Date(a.tradeDate).getTime() - new Date(b.tradeDate).getTime()
    );
  }, [rawData]);

  if (!data || data.length === 0) return <div>No Data Found.</div>;

  // 현재가 및 가격 범위 계산
  const lastIdx = data.length - 1;
  const currentPrice = data[lastIdx].priceCloseAdj;
  const prevPrice = data[lastIdx - 1]?.priceCloseAdj || currentPrice;
  const currentChange = currentPrice - prevPrice;
  const changePercent = (currentChange / prevPrice) * 100;

  // 3. 통계 계산 (정렬된 데이터를 기반으로 하므로 52주 계산이 정확해짐)
  const allTimeHigh = Math.max(...data.map((d) => d.priceHighAdj));
  const allTimeLow = Math.min(...data.map((d) => d.priceLowAdj));

  const recent52Weeks = data.slice(-252);
  const week52High = Math.max(...recent52Weeks.map((d) => d.priceHighAdj));
  const week52Low = Math.min(...recent52Weeks.map((d) => d.priceLowAdj));

  // 가격 범위 바 위치 계산
  const calculatePosition = (value: number, min: number, max: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  const currentPos52Week = calculatePosition(
    currentPrice,
    week52Low,
    week52High
  );
  const currentPosAllTime = calculatePosition(
    currentPrice,
    allTimeLow,
    allTimeHigh
  );

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('ko-KR').format(value);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4 bg-white">
      <Card className="border shadow-sm">
        {/* <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold">
              주가정보 [Currency: {currency}]
            </CardTitle>
          </div>
        </CardHeader> */}
        <CardContent>
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-1">Stock Chart</div>
            <div className="text-xs text-gray-500 mb-2">{exchange ?? '-'}</div>

            {/* 현재가 표시 */}
            <div className="flex items-baseline gap-2 mb-4">
              <span
                className={`text-2xl font-bold ${
                  currentChange >= 0 ? 'text-red-500' : 'text-blue-500'
                }`}
              >
                {formatPrice(currentPrice)}
              </span>
              <span
                className={`text-sm ${
                  currentChange >= 0 ? 'text-red-500' : 'text-blue-500'
                }`}
              >
                {currentChange > 0 ? '▲' : '▼'}{' '}
                {formatPrice(Math.abs(currentChange))} (
                {changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>

          {/* 주가 차트 */}
          <div className="mb-2">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={data}
                margin={{ top: 5, right: 0, left: 10, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="tradeDate"
                  tick={{ fontSize: 11 }}
                  tickFormatter={formatDate}
                  interval={Math.floor(data.length / 8)}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  domain={['dataMin - 5000', 'dataMax + 5000']}
                  tickFormatter={formatPrice}
                  orientation="right"
                />
                <Tooltip
                  formatter={(value) => [
                    formatPrice(Number(value)),
                    'Closing Price',
                  ]}
                  labelFormatter={(label) => `Date: ${formatDate(label)}`}
                />
                <Area
                  type="monotone"
                  dataKey="priceCloseAdj"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  fill="url(#colorPrice)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* 거래량 차트 */}
          <div className="mb-4">
            <ResponsiveContainer width="100%" height={80}>
              <BarChart
                data={data}
                margin={{ top: 0, right: 5, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="tradeDate" hide />
                <Bar dataKey="tradeVolume" fill="#b4b4b4" opacity={0.5} />
                <Tooltip
                  formatter={(value) => [formatPrice(Number(value)), 'Volume']}
                  labelFormatter={(label) => `Date: ${formatDate(label)}`}
                  cursor={{ fill: 'transparent' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 가격 범위 표시 */}
          <div className="space-y-3 mt-6">
            {/* 최근 52주 가격 범위 */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>52-week Price Range</span>
              </div>
              <div className="relative h-8 bg-gray-100 rounded">
                {/* 배경 바 */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-orange-100 rounded"></div>

                {/* 현재가 표시 점 */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full z-10"
                  style={{ left: `${currentPos52Week}%` }}
                ></div>

                {/* 가격 레이블 */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-medium text-blue-700">
                  ₩{formatPrice(week52Low)}
                </div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-orange-700">
                  ₩{formatPrice(week52High)}
                </div>
              </div>
            </div>

            {/* ELDO 시가총액 예측 */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>ELDO Market Cap Forecast</span>
              </div>
              <div className="relative h-8 bg-gray-100 rounded">
                {/* 배경 바 */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-orange-100 rounded"></div>

                {/* 현재가 표시 점 */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full z-10"
                  style={{ left: `${currentPosAllTime}%` }}
                ></div>

                {/* 가격 레이블 */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-medium text-blue-700">
                  ₩{formatPrice(Math.floor(allTimeLow / 1000) * 1000)}
                </div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-orange-700">
                  ₩{formatPrice(Math.ceil(allTimeHigh / 1000) * 1000)}
                </div>
              </div>
            </div>
          </div>

          {/* 범례 설명 */}
          <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-600 space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-100 border border-blue-300"></div>
              <span>post-IPO Low / 52-week Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-100 border border-orange-300"></div>
              <span>post-IPO High / 52-week High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-black rounded-full"></div>
              <span>Current Stock Price</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockChartDashboard;
