import { SearchIcon } from 'lucide-react';

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
} from '@/components/ui/sidebar';
import FilterTree from './filter-tree';
import { marketData, sectorData } from './test';

const CompanySidebar = () => {
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
      <SidebarContent className="mb-40">
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
    </Sidebar>
  );
};

export default CompanySidebar;
