import type React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import HelpSidebar from './_components/help-sidebar';

const HelpLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="min-h-[calc(100vh-3.25rem-10rem)]">
      <HelpSidebar />
      <section className="flex flex-col">
        <header className="sticky top-13 z-15 border-b border-solid bg-white px-4 py-2.5">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="scroll-m-20 font-semibold tracking-tight">
              Help Page
            </h1>
          </div>
        </header>
        {children}
      </section>
    </SidebarProvider>
  );
};

export default HelpLayout;
