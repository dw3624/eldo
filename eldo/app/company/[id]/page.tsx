import { SidebarTrigger } from '@/components/ui/sidebar';
import BackButton from './_components/back-button';
import DescSection from './_components/desc-section';

import FinIndicSection from './_components/fin-indic-section';
import FinInfoSection from './_components/fin-info-section';
import StockSection from './_components/stock-section';

const CompanyDescPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const descRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/corps/${id}/desc`,
    {
      cache: 'no-store',
    }
  );
  if (!descRes.ok) throw new Error('Failed to fetch desc');
  const desc = await descRes.json();

  return (
    <section className="flex w-full min-w-0 flex-col">
      <header className="sticky top-13 z-100 border-b border-solid bg-white px-4 py-2.5">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="scroll-m-20 font-semibold tracking-tight">
            {desc.data.corpNameEn}
          </h1>{' '}
          |
          <sub>
            <BackButton />
          </sub>
        </div>
        <div className="mt-2 ml-9 text-xs">
          {desc.data.corpTicker} | {desc.data.stockExchange}
        </div>
      </header>
      <div className="flex w-full min-w-0 flex-col gap-12 px-6 py-8">
        <DescSection data={desc.data} />
        <StockSection corpId={id} />
        <FinInfoSection corpId={id} />
        <FinIndicSection corpId={id} locale="en" />
      </div>
    </section>
  );
};

export default CompanyDescPage;
