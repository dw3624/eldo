'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import DescSection from './components/desc-section';
import FinIndicSection from './components/fin-indic-section';
import FinInfoSection from './components/fin-info-section';
import StockSection from './components/stock-section';

const HelpPage = () => {
  const router = useRouter();

  return (
    <section className="flex w-full flex-col">
      <header className="sticky top-13 z-100 border-b border-solid bg-white px-4 py-2.5">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="scroll-m-20 font-semibold tracking-tight">기업명</h1> |
          <sub>
            <Button
              size={'sm'}
              variant={'link'}
              onClick={() => router.back()}
              className="cursor-pointer px-0"
            >
              뒤로가기
            </Button>
          </sub>
        </div>
        <div className="mt-2 ml-9 text-xs">티커 | 상장시장</div>
      </header>
      <div className="flex flex-col gap-12 px-6 py-8">
        <DescSection />
        <StockSection />
        <FinInfoSection />
        <FinIndicSection />
      </div>
    </section>
  );
};

export default HelpPage;
