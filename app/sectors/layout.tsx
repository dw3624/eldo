import type React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import SectorClientShell from './_components/client-shell';
import SectorsSidebar from './_components/sidebar';

const SectorsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SectorClientShell>
      <SidebarProvider className="min-h-[calc(100vh-3.25rem-10rem)]">
        <SectorsSidebar />
        {children}
      </SidebarProvider>
    </SectorClientShell>
  );
};

export default SectorsLayout;
