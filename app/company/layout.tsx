import type React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import CompanySidebar from './components/company-sidebar';

const HelpLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="min-h-[calc(100vh-3.25rem-10rem)]">
      <CompanySidebar />
      {children}
    </SidebarProvider>
  );
};

export default HelpLayout;
