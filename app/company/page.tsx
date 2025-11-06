import { SidebarTrigger } from '@/components/ui/sidebar';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { companies } from './components/test';

const HelpPage = () => {
  return (
    <section className="flex w-full flex-col">
      <header className="sticky top-13 z-100 border-b border-solid bg-white px-4 py-2.5">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="scroll-m-20 font-semibold tracking-tight">
            Company Lookup
          </h1>
        </div>
        <div className="mt-2 ml-9 text-xs">
          검색어 | 산업분류 {`>`} 상장시장
        </div>
      </header>
      <div className="px-6 py-8">
        <DataTable columns={columns} data={companies} />
      </div>
    </section>
  );
};

export default HelpPage;
