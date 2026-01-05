import type React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import CompanySidebar from './_components/company-sidebar';
import { SWRConfig } from 'swr';

const EMSEC_TREE_KEY = 'http://localhost:3000/api/emsec/tree';

async function fetchEmsecTree() {
  const res = await fetch(EMSEC_TREE_KEY, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error(`Failed to fetch emsec tree: ${res.status}`);
  }
  return res.json();
}

const CompanyLayout = async ({ children }: { children: React.ReactNode }) => {
  const emsecTree = await fetchEmsecTree();

  return (
    <SWRConfig value={{ fallback: { [EMSEC_TREE_KEY]: emsecTree } }}>
      <SidebarProvider className="min-h-[calc(100vh-3.25rem-10rem)]">
        <CompanySidebar />
        {children}
      </SidebarProvider>
    </SWRConfig>
  );
};

export default CompanyLayout;
