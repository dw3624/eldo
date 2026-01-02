'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import CorpDistChart from './_components/corp-dist-chart';
import GrowsStackbarChart from './_components/grows-stackbar-chart';
import RatioHeatmapChart from './_components/ratio-heatmap-chart';
import RatioScatterChart from './_components/ratio-scatter-chart';

import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Suspense } from 'react';
import { useAtomValue } from 'jotai';
import { analysisSelectionAtom } from '@/lib/atoms/analysis-atoms';
import { useAnalysisData } from '@/lib/hooks/use-analysis-data';
import { GRAPH_ITEMS } from './_lib/constants';

const SectorsPage = () => {
  const sel = useAtomValue(analysisSelectionAtom);
  console.log(sel);
  const { data, error, isLoading } = useAnalysisData(sel);
  console.log(data);

  const pageTitle = GRAPH_ITEMS.find(
    (item) => item.key === data?.meta?.chartType
  )?.title;

  if (isLoading) {
    return (
      <div className="flex-1 p-6">
        <Skeleton className="mb-4 h-24" />
        <Skeleton className="h-[600px]" />
      </div>
    );
  }

  // return (
  //   <div>
  //     그래프: {chartType} 기준연도: {fy} 시장: {exchange} emsec: {emsecId}
  //   </div>
  // );

  return (
    <section className="flex w-full flex-col">
      <header className="sticky top-13 z-15 border-b border-solid bg-white px-4 py-2.5">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="scroll-m-20 font-semibold tracking-tight">
            {pageTitle}
          </h1>
        </div>
        <div className="mt-2 ml-9 flex flex-wrap gap-x-2 gap-y-1 text-xs">
          <span>
            {data.meta.exchange} {`>`}
          </span>
          <span>{data.meta.fy}</span>
        </div>
      </header>
      <div className="space-y-6 px-6 py-8">
        {isLoading && (
          <div className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground shadow-lg">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Updating...</span>
          </div>
        )}

        <div className="mb-6 grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Records
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.stats.rowCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Corps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.stats.corpCountTotal.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Graph Content */}
        <Suspense fallback={<div className="mt-2 ml-9 text-xs">Loading…</div>}>
          {data.meta.chartType === 'corpDist' && <CorpDistChart data={data} />}
          {data.meta.chartType === 'ratioHeatmap' && (
            <RatioHeatmapChart data={data} />
          )}
          {data.meta.chartType === 'ratioScatter' && (
            <RatioScatterChart data={data} />
          )}
          {data.meta.chartType === 'changeDist' && (
            <GrowsStackbarChart data={data.rows} />
          )}
        </Suspense>
      </div>
    </section>
  );
};

export default SectorsPage;
