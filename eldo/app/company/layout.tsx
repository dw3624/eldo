import type React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import CompanySidebar from './_components/company-sidebar';
import { Suspense } from 'react';

const CompanyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="min-h-[calc(100vh-3.25rem-10rem)]">
      <Suspense fallback={<div className="p-4 text-sm">Loading filters…</div>}>
        <CompanySidebar />
      </Suspense>
      {children}
    </SidebarProvider>
  );
};

export default CompanyLayout;
