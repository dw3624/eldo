'use client';

import React from 'react';

import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Scatter,
  ComposedChart,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartDataType {
  code: string;
  start: number;
  end: number;
  value: number;
  point: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as ChartDataType;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
        <p className="font-semibold">{data.code}</p>
        <p className="text-sm">시작: {data.start.toLocaleString()}억 원</p>
        <p className="text-sm">종료: {data.end.toLocaleString()}억 원</p>
      </div>
    );
  }
  return null;
};

const ValuationPage = () => {
  const chartData: ChartDataType[] = [
    { code: '015750', start: 500, end: 12800, value: 12300, point: 6650 },
    { code: '230360', start: 4200, end: 12500, value: 8300, point: 8350 },
    { code: '012860', start: 800, end: 1800, value: 1000, point: 1300 },
    { code: '067570', start: 500, end: 6200, value: 5700, point: 3350 },
    { code: '038110', start: 700, end: 6800, value: 6100, point: 3750 },
    { code: '122350', start: 300, end: 5500, value: 5200, point: 2900 },
  ];

  // 왼쪽 테이블 데이터
  const leftTableData = [
    { label: '매출 (LTM)', value: '4조 3,837억' },
    { label: 'EBITDA (LTM)', value: '4,620억' },
    { label: '당기순이익 (LTM)', value: '1,414억' },
    { label: '자산총계', value: '4조 2,884억' },
    { label: '자본총계', value: '1조 3,988억' },
    { label: '시가총액', value: '3,963억' },
  ];

  // 오른쪽 테이블 데이터
  const rightTableData = [
    { label: 'EMSEC (산업)', value: 'Auto Parts' },
    {
      label: 'EMTEC (기술)',
      value:
        'Advanced Materials and Chemistry, Battery & Energy Materials, Mobility and Transportation',
    },
    { label: '상장연차', value: '29년' },
    { label: '가치 구간 (10-90%)', value: '1,156억 - 1조 1,590억' },
    { label: 'P/S', value: '0.09' },
    { label: 'P/E', value: '2.80' },
    { label: '부채비율(D/E)', value: '2.07' },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="mt-10 lg:mt-16 [&:first-child]:mt-0">
          <h2
            id="peer"
            className="scroll-m-30 font-heading font-semibold text-2xl tracking-tight"
          >
            Valuation
          </h2>
          <p className="leading-relaxed [&:not(:first-child)]:mt-6">
            Determine the fair value of a unlisted firm using advanced AI/ML
            models.
          </p>
        </div>

        {/* 상단 통계 카드 */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-gray-500 mb-1">
                선택 기업 주요 가치(10%-90%)
              </div>
              <div className="text-2xl font-bold">1,156억 - 1조 1,590억</div>
              <div className="text-xs text-gray-400 mt-2">
                ※ X축은 &apos;억 원&apos; 단위, 에너지/(태양광)/물티캠
                &apos;조·억&apos; 원국적 표기
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-gray-500 mb-1">피어 개수</div>
              <div className="text-2xl font-bold">6</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-gray-500 mb-1">중앙 구간 폭</div>
              <div className="text-2xl font-bold">9.01×</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-gray-500 mb-1">
                구간 내 포함 비율
              </div>
              <div className="text-2xl font-bold">67%</div>
            </CardContent>
          </Card>
        </div>

        {/* 차트 */}
        <Card>
          <CardHeader>
            <CardTitle>피어 기업 비교</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart
                data={chartData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0, 14000]}
                  label={{ value: '억 원', position: 'bottom' }}
                />
                <YAxis dataKey="code" type="category" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="start" stackId="a" fill="transparent" />
                <Bar dataKey="value" stackId="a" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.code === '015750' ? '#1e3a8a' : '#93c5fd'}
                    />
                  ))}
                </Bar>
                <Scatter dataKey="point" fill="#000" shape="circle" r={4} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 상세 정보 섹션 */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-bold mb-4">상세: 015750</h2>

          <div className="grid grid-cols-2 gap-8">
            {/* 왼쪽 테이블 */}
            <div>
              <h3 className="font-semibold mb-3 text-gray-700">항목</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {leftTableData.map((row, index) => (
                      <tr key={index} className="border-b last:border-b-0">
                        <td className="px-4 py-3 font-medium text-gray-600 bg-gray-50">
                          {row.label}
                        </td>
                        <td className="px-4 py-3 text-right">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 오른쪽 테이블 */}
            <div>
              <h3 className="font-semibold mb-3 text-gray-700">속성</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {rightTableData.map((row, index) => (
                      <tr key={index} className="border-b last:border-b-0">
                        <td className="px-4 py-3 font-medium text-gray-600 bg-gray-50 w-48">
                          {row.label}
                        </td>
                        <td className="px-4 py-3 text-right text-sm">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuationPage;
