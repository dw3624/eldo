import { SidebarTrigger } from '@/components/ui/sidebar';
import BackButton from './_components/back-button';
import DescSection from './_components/desc-section';

import FinIndicSection from './_components/fin-indic-section';
import FinInfoSection from './_components/fin-info-section';
import StockSection from './_components/stock-section';
import { getCorpDesc } from './_lib/get-corp-desc';

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
        <StockSection corpId={id} />
        <FinInfoSection corpId={id} />
        <FinIndicSection corpId={id} locale="en" />
      </div>
    </section>
  );
};

export default CompanyDescPage;
