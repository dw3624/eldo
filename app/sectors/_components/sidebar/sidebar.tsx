'use client';

import { useAtom, useSetAtom } from 'jotai';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  graphFilterAtom,
  setCommonFilterAtom,
  setGraphTypeAtom,
} from '../../atom';
import { GRAPH_ITEMS } from '../constants';
import { marketData, sectorData } from '../dummy';
import FilterTree from '../filter-tree';
import type { GraphCommonFilter, GraphKey } from '../types';
import ChangeDistMenu from './change-dist';
import CorpDistMenu from './corp-dist';
import RatioGraphMenu from './ratio-graph';

const SectorsSidebar = () => {
  // const segment = useSelectedLayoutSegment();
  const [graphFilter] = useAtom(graphFilterAtom);
  const setGraphType = useSetAtom(setGraphTypeAtom);
  const setCommonFilter = useSetAtom(setCommonFilterAtom);

  const handleGraphTypeChange = (type: GraphKey) => {
    setGraphType(type);
  };

  const handleBaseYearChange = (ltm: GraphCommonFilter['baseYear']) => {
    setCommonFilter({ baseYear: ltm });
  };

  return (
    <Sidebar>
      <SidebarHeader className="pt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <Select
              value={graphFilter.key}
              onValueChange={handleGraphTypeChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Graph" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {GRAPH_ITEMS.map((item) => (
                    <SelectItem key={item.key} value={item.key}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="pb-40">
        <SidebarGroup>
          <SidebarGroupLabel>Market</SidebarGroupLabel>
          <SidebarGroupContent>
            <FilterTree data={marketData} defaultSelectedIds={['nasdaq']} />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Sector · Industry</SidebarGroupLabel>
          <SidebarGroupContent>
            <FilterTree data={sectorData} defaultSelectedIds={['']} />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>기준연도</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select
              value={graphFilter.common.baseYear}
              onValueChange={(value) =>
                handleBaseYearChange(value as GraphCommonFilter['baseYear'])
              }
              disabled={graphFilter.key === 'changeDist'}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a LTM" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={'ltm'}>LTM</SelectItem>
                  {graphFilter.key === 'changeDist' ? null : (
                    <>
                      <SelectItem value={'ltm1'}>LTM-1</SelectItem>
                      <SelectItem value={'ltm2'}>LTM-2</SelectItem>
                      <SelectItem value={'ltm3'}>LTM-3</SelectItem>
                    </>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {graphFilter.key === 'corpDist' ? (
          <CorpDistMenu />
        ) : graphFilter.key === 'changeDist' ? (
          <ChangeDistMenu />
        ) : (
          <RatioGraphMenu />
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default SectorsSidebar;
