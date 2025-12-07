'use client';

import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import CorpDistChart from './_components/corp-dist-chart';
import GrowsStackbarChart from './_components/grows-stackbar-chart';
import RatioHeatmapChart from './_components/ratio-heatmap-chart';
import RatioScatterChart from './_components/ratio-scatter-chart';
import { getSpecificLabels } from './_lib/utils';
import { graphFilterAtom, selectedGraphMetaAtom } from './atom';

const SectorsPage = () => {
  const graphMeta = useAtomValue(selectedGraphMetaAtom);
  const graphFilter = useAtomValue(graphFilterAtom);

  const specificLabels = useMemo(
    () => getSpecificLabels(graphFilter),
    [graphFilter],
  );
  console.log(graphMeta, graphFilter);

  return (
    <section className="flex w-full flex-col">
      <header className="sticky top-13 z-100 border-b border-solid bg-white px-4 py-2.5">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="scroll-m-20 font-semibold tracking-tight">
            {graphMeta.title}
          </h1>
        </div>
        <div className="mt-2 ml-9 flex flex-wrap gap-x-2 gap-y-1 text-xs">
          <span>
            산업분류 {`>`} 상장시장 {`>`}
          </span>
          <span>{graphFilter.common.baseYear}</span>|{' '}
          {specificLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </header>
      <div className="space-y-6 px-6 py-8">
        {graphMeta.key === 'corpDist' ? (
          <CorpDistChart />
        ) : graphMeta.key === 'ratioHeatmap' ? (
          <RatioHeatmapChart />
        ) : graphMeta.key === 'ratioScatter' ? (
          <RatioScatterChart />
        ) : graphMeta.key === 'changeDist' ? (
          <GrowsStackbarChart />
        ) : null}
      </div>
    </section>
  );
};

export default SectorsPage;
