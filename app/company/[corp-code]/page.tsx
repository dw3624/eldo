import { SidebarTrigger } from '@/components/ui/sidebar';
import BackButton from './components/back-button';
import DescSection from './components/desc-section';
import FinIndicSection from './components/fin-indic-section';
import FinInfoSection from './components/fin-info-section';
import StockSection from './components/stock-section';
import { generateSampleData } from './components/test';

const CompanyDescPage = () => {
  const data = generateSampleData();

  return (
    <section className="flex w-full flex-col">
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
      <div className="flex flex-col gap-12 px-6 py-8">
        <DescSection />
        <StockSection data={data} />
        <FinInfoSection />
        <FinIndicSection />
      </div>
    </section>
  );
};

export default CompanyDescPage;
