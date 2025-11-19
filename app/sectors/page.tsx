'use client';

import { useAtom } from 'jotai';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  selectedCompanyDistAtom,
  selectedCompanyDistCurrencyAtom,
  selectedGraphAtom,
  selectedLTMAtom,
} from './atom';

const SectorsPage = () => {
  const [selectedGraph] = useAtom(selectedGraphAtom);
  const [selectedCompanyDistCurrency] = useAtom(
    selectedCompanyDistCurrencyAtom,
  );
  const [selectedCompanyDist] = useAtom(selectedCompanyDistAtom);
  const [selectedLTM] = useAtom(selectedLTMAtom);

  return (
    <section className="flex w-full flex-col">
      <header className="sticky top-13 z-100 border-b border-solid bg-white px-4 py-2.5">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="scroll-m-20 font-semibold tracking-tight">
            {selectedGraph.title}
          </h1>
        </div>
        <div className="mt-2 ml-9 text-xs">
          산업분류 {`>`} 상장시장 {`>`} {selectedLTM} |{' '}
          {selectedCompanyDist.label} {`>`} {selectedCompanyDistCurrency.label}
        </div>
      </header>
      <div className="px-6 py-8"></div>
    </section>
  );
};

export default SectorsPage;
