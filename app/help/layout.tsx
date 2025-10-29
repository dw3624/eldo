import type React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import HelpSidebar from './components/help-sidebar';

const HelpLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="min-h-[calc(100vh-3.25rem-10rem)]">
      <HelpSidebar />
      {children}
    </SidebarProvider>
  );
};

export default HelpLayout;
