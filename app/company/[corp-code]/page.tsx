import { SidebarTrigger } from '@/components/ui/sidebar';
import BackButton from './_components/back-button';
import DescSection from './_components/desc-section';
import {
  CORP_DESC_DUMMY,
  FIN_INDIC_DUMMY,
  FINANCIAL_INFO_DUMMY,
  generateSampleData,
} from './_components/dummy';
import FinIndicSection from './_components/fin-indic-section';
import FinInfoSection from './_components/fin-info-section';
import StockSection from './_components/stock-section';

const CompanyDescPage = () => {
  const data = generateSampleData();
  const desc = CORP_DESC_DUMMY;
  const finInfo = FINANCIAL_INFO_DUMMY;
  const finIndic = FIN_INDIC_DUMMY;

  return (
    <section className="flex w-full min-w-0 flex-col">
      <header className="sticky top-13 z-100 border-b border-solid bg-white px-4 py-2.5">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="scroll-m-20 font-semibold tracking-tight">기업명</h1> |
          <sub>
            <BackButton />
          </sub>
        </div>
        <div className="mt-2 ml-9 text-xs">티커 | 상장시장</div>
      </header>
      <div className="flex w-full min-w-0 flex-col gap-12 px-6 py-8">
        <DescSection data={desc} />
        <StockSection data={data} />
        <FinInfoSection data={finInfo} />
        <FinIndicSection data={finIndic} />
      </div>
    </section>
  );
};

export default CompanyDescPage;
