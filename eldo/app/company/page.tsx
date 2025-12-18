import { SidebarTrigger } from '@/components/ui/sidebar';
import CompanyTableClient from './_components/data-table-client';
import PageHeader from './_components/page-header';

const CompanyPage = () => {
  return (
    <section className="flex w-full flex-col">
      <header className="sticky top-13 z-15 border-b border-solid bg-white px-4 py-2.5">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="scroll-m-20 font-semibold tracking-tight">
            Company Lookup
          </h1>
        </div>
        <PageHeader />
      </header>
      <div className="px-6 py-8">
        <CompanyTableClient />
      </div>
    </section>
  );
};

export default CompanyPage;
