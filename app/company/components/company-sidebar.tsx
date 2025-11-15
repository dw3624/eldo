'use client';

import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { TOC_CONTENTS } from '../[corp-code]/components/constants';
import FilterTree from './filter-tree';
import { marketData, sectorData } from './test';

const CompanySidebar = () => {
  const segment = useSelectedLayoutSegment();
  const isDetail = segment !== null;

  return (
    <Sidebar>
      <SidebarHeader>
        <ButtonGroup>
          <Input placeholder="Search..." />
          <Button
            variant={'outline'}
            aria-label="Search"
            className="cursor-pointer"
          >
            <SearchIcon />
          </Button>
        </ButtonGroup>
      </SidebarHeader>
      {isDetail ? (
        <SidebarContent className="pb-40">
          <SidebarGroup>
            <SidebarGroupLabel>Table Of Contents</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {TOC_CONTENTS.map((item, i) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton>
                      <Link href={`#${item.id}`}>
                        {i + 1}. {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      ) : (
        <SidebarContent className="pb-40">
          <SidebarGroup>
            <SidebarGroupLabel>Market</SidebarGroupLabel>
            <SidebarGroupContent>
              <FilterTree data={marketData} defaultSelectedIds={['nasdaq']} />
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>
              Sector · Industry · Sub-industry
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <FilterTree data={sectorData} defaultSelectedIds={['']} />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      )}
    </Sidebar>
  );
};

export default CompanySidebar;
