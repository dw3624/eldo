'use client';

import * as React from 'react';
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
import { GRAPH_ITEMS } from '../../_lib/constants';
import ChangeDistMenu from './change-dist';
import CorpDistMenu from './corp-dist';
import RatioGraphMenu from './ratio-graph';

import { useAtom } from 'jotai';
import {
  ChartType,
  chartTypeAtom,
  emsecIdAtom,
  exchangeAtom,
  fyAtom,
  currentFilterAtom,
  CorpDistFilter,
  StackBarChartFilter,
  RatioSpecificFilter,
} from '@/lib/atoms/filter-atoms';
import { useEmsecTree } from '@/hooks/use-emsec-tree';

const FISCAL_YEARS = ['LTM-0', 'LTM-1', 'LTM-2', 'LTM-3'];

const EXCHANGES = [
  { id: 'kospi', label: 'KOSPI' },
  { id: 'kosdaq', label: 'KOSDAQ' },
  { id: 'krx', label: 'KRX' },
  { id: 'nye', label: 'NYSE' },
  { id: 'nasdaq', label: 'NASDAQ' },
];

const SectorsSidebar = () => {
  const [fy, setFy] = useAtom(fyAtom);
  const [exchange, setExchange] = useAtom(exchangeAtom);
  const [emsecId, setEmsecId] = useAtom(emsecIdAtom);
  const [chartType, setChartType] = useAtom(chartTypeAtom);
  const [currentFilter, setCurrentFilter] = useAtom(currentFilterAtom);

  const { data: emsecTree = [], isLoading: isLoadingTree } = useEmsecTree();

  return (
    <Sidebar>
      <SidebarHeader className="pt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <Select
              value={chartType}
              onValueChange={(val) => setChartType(val as ChartType)}
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
            <Select
              value={exchange}
              onValueChange={setExchange}
              disabled={chartType === 'changeDist'}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a LTM" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {EXCHANGES.map((exchange) => (
                    <SelectItem key={exchange.id} value={exchange.id}>
                      {exchange.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Sector · Industry</SidebarGroupLabel>
          <SidebarGroupContent>
            {isLoadingTree ? (
              <div className="p-2 text-sm text-muted-foreground">Loading…</div>
            ) : (
              <Select
                value={emsecId}
                onValueChange={setEmsecId}
                disabled={chartType === 'changeDist'}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a LTM" />
                </SelectTrigger>
                <SelectContent>
                  <div>
                    {emsecTree.map((sector) => (
                      <SelectGroup key={sector.id}>
                        <SelectItem key={sector.id} value={sector.id}>
                          {sector.label}
                        </SelectItem>
                        {sector.children?.map((industry) => (
                          <SelectItem
                            key={industry.id}
                            value={industry.id}
                            className="ml-4"
                          >
                            {industry.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </div>
                </SelectContent>
              </Select>
            )}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>기준연도</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select
              value={fy}
              onValueChange={setFy}
              disabled={chartType === 'changeDist'}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a LTM" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {FISCAL_YEARS.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {chartType === 'corpDist' ? (
          <CorpDistMenu
            filter={currentFilter as CorpDistFilter}
            onChange={setCurrentFilter}
          />
        ) : chartType === 'changeDist' ? (
          <ChangeDistMenu
            filter={currentFilter as StackBarChartFilter}
            onChange={setCurrentFilter}
          />
        ) : (
          <RatioGraphMenu
            filter={currentFilter as RatioSpecificFilter}
            onChange={setCurrentFilter}
          />
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default SectorsSidebar;
