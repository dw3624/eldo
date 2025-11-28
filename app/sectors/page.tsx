'use client';

import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import DataTable from './_components/data-table';
import { listedDistColumns, listedDistData } from './_components/dummy';
import Heatmap from './_components/heatmap';
import { getSpecificLabels } from './_components/utils';
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
      <div className="px-6 py-8">
        <main className="space-y-6">
          <section>
            <Heatmap
              data={listedDistData}
              columns={listedDistColumns}
              title="산업별 기업 수 분포"
              caption="상장일 기준"
              showTotal={true}
              showAvg={true}
              showMed={true}
              onCellClick={(row, colIndex, value) => {
                console.log(
                  `${row.sector} - ${listedDistColumns[colIndex]} - ${value}`,
                );
              }}
            />
          </section>
          <section>
            <DataTable
              data={listedDistData}
              columns={listedDistColumns}
              title="산업별 기업 수 분포"
              showTotal={true}
              showAvg={true}
              showMed={true}
            />
          </section>
        </main>
      </div>
    </section>
  );
};

export default SectorsPage;
