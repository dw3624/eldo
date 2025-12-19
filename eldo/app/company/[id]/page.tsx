import { SidebarTrigger } from '@/components/ui/sidebar';
import BackButton from './_components/back-button';
import DescSection from './_components/desc-section';

import FinIndicSection from './_components/fin-indic-section';
import FinInfoSection from './_components/fin-info-section';
import StockSection from './_components/stock-section';
import { getCorpDesc } from './_lib/get-corp-desc';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function SectionSkeleton({ title }: { title: string }) {
  return (
    <div className="w-full">
      <h2 className="scroll-m-36 border-b pb-2 font-semibold text-xl tracking-tight first:mt-0">
        {title}
      </h2>
      <div className="mt-6 space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full" />
        <div className="flex justify-end">
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </div>
  );
}

const CompanyDescPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const result = await getCorpDesc(id);
  if (!result.ok) throw new Error(result.error);
  const desc = result.data;

  // const desc = descRes.data;

  return (
    <section className="flex w-full min-w-0 flex-col">
      <header className="sticky top-13 z-100 border-b border-solid bg-white px-4 py-2.5">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="scroll-m-20 font-semibold tracking-tight">
            {desc.corpNameEn}
          </h1>{' '}
          |
          <sub>
            <BackButton />
          </sub>
        </div>
        <div className="mt-2 ml-9 text-xs">
          {desc.corpTicker} | {desc.stockExchange}
        </div>
      </header>
      <div className="flex w-full min-w-0 flex-col gap-12 px-6 py-8">
        <DescSection data={desc} />
        <Suspense fallback={<SectionSkeleton title="Stock Information" />}>
          <StockSection corpId={id} />
        </Suspense>
        <Suspense fallback={<SectionSkeleton title="Stock Information" />}>
          <FinInfoSection corpId={id} />
        </Suspense>
        <Suspense fallback={<SectionSkeleton title="Stock Information" />}>
          <FinIndicSection corpId={id} locale="en" />
        </Suspense>
      </div>
    </section>
  );
};

export default CompanyDescPage;
