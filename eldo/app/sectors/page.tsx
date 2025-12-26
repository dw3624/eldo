'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import CorpDistChart from './_components/corp-dist-chart';
import GrowsStackbarChart from './_components/grows-stackbar-chart';
import RatioHeatmapChart from './_components/ratio-heatmap-chart';
import RatioScatterChart from './_components/ratio-scatter-chart';

import { useAtom, useAtomValue } from 'jotai';
import {
  chartTypeAtom,
  currentFilterAtom,
  emsecIdAtom,
  exchangeAtom,
  fyAtom,
} from '@/lib/atoms/filter-atoms';
import { useAnalysisData } from '@/hooks/use-analysis';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Suspense } from 'react';

const SectorsPage = () => {
  const chartType = useAtomValue(chartTypeAtom);
  const exchange = useAtomValue(exchangeAtom);
  const emsecId = useAtomValue(emsecIdAtom);
  const fy = useAtomValue(fyAtom);
  const [currentFilter, setCurrentFilter] = useAtom(currentFilterAtom);

  console.log(currentFilter);
  const { data, isLoading, isFetching, stats } = useAnalysisData();
  console.log(data);

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
            {/* {graphMeta.title} */}
          </h1>
        </div>
        <div className="mt-2 ml-9 flex flex-wrap gap-x-2 gap-y-1 text-xs">
          <span>
            산업분류 {`>`} 상장시장 {`>`}
          </span>
          {/* <span>{graphFilter.common.baseYear}</span>|{' '} */}
          {/* {specificLabels.map((label) => ( */}
          {/* <span key={label}>{label}</span> */}
          {/* ))} */}
        </div>
      </header>
      <div className="space-y-6 px-6 py-8">
        {isFetching && (
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
              <div className="text-2xl font-bold">{stats.totalRecords}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Filtered Records
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.displayRecords}</div>
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
                {stats.totalCorps.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Graph Content */}
        <Suspense fallback={<div className="mt-2 ml-9 text-xs">Loading…</div>}>
          {chartType === 'corpDist' && <CorpDistChart data={data} />}
          {chartType === 'changeDist' && <GrowsStackbarChart data={data} />}
          {chartType === 'ratioHeatmap' && <RatioHeatmapChart data={data} />}
          {chartType === 'ratioScatter' && <RatioScatterChart data={data} />}
        </Suspense>
      </div>
    </section>
  );
};

export default SectorsPage;
