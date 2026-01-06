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

import { useEmsecTree } from '@/hooks/use-emsec-tree';
import {
  analysisSelectionAtom,
  setDefaultAtom,
} from '@/lib/atoms/analysis-atoms';
import {
  AnalysisSelection,
  ChartType,
  Exchange,
  FY,
} from '@/lib/analysis/types';

const FISCAL_YEARS = ['LTM-0', 'LTM-1', 'LTM-2', 'LTM-3'];

const EXCHANGES = [
  { id: 'kospi', label: 'KOSPI' },
  { id: 'kosdaq', label: 'KOSDAQ' },
  { id: 'nye', label: 'NYSE' },
  { id: 'nasdaq', label: 'NASDAQ' },
];

const SectorsSidebar = () => {
  const [sel, setSel] = useAtom(analysisSelectionAtom);
  const [, goDefault] = useAtom(setDefaultAtom);

  const setChartType = (chartType: ChartType) => {
    goDefault();
    if (chartType === 'corpDist') {
      setSel({
        ...sel,
        chartType,
        selector: { chartType: 'corpDist', metric: 'corpCount' },
        level: 'default',
        parentId: undefined,
      });
      return;
    }
    if (chartType === 'ratioHeatmap') {
      setSel({
        ...sel,
        chartType,
        selector: {
          chartType: 'ratioHeatmap',
          metric: 'pbr',
          agg: 'med',
          basis: 'end',
        },
        level: 'default',
        parentId: undefined,
      });
      return;
    }
    if (chartType === 'ratioScatter') {
      setSel({
        ...sel,
        chartType,
        selector: {
          chartType: 'ratioScatter',
          metric: 'pbr',
          agg: 'med',
          basis: 'end',
        },
        level: 'default',
        parentId: undefined,
      });
      return;
    }
    setSel({
      ...sel,
      chartType,
      fy: 'LTM-0',
      selector: { chartType: 'changeDist', metric: 'revenue' },
      level: 'default',
      parentId: undefined,
    });
  };

  const { data: emsecTree = [], isLoading: isLoadingTree } = useEmsecTree();

  const onEmsecChange = (v: string) => {
    if (v === 'd') {
      setSel((p) => ({ ...p, level: 'default', parentId: undefined }));
      return;
    }
    const [prefix, idStr] = v.split(':');
    const id = Number(idStr);

    if (prefix === 's') {
      setSel((p) => ({ ...p, level: 'sector', parentId: id }));
      return;
    }
    if (prefix === 'i') {
      setSel((p) => ({ ...p, level: 'industry', parentId: id }));
      return;
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="pt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <Select
              value={sel.chartType}
              onValueChange={(val) => setChartType(val as ChartType)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Graph" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {GRAPH_ITEMS.map((item) => (
                    <SelectItem key={item.key} value={item.key}>
                      {item.labelEn}
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
          <SidebarGroupLabel>Exchange</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select
              value={sel.exchange}
              onValueChange={(val) =>
                setSel({
                  ...sel,
                  exchange: val as Exchange,
                  level: 'default',
                  parentId: undefined,
                })
              }
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
                value={
                  sel.level === 'default'
                    ? 'd'
                    : sel.level === 'sector'
                    ? `s:${sel.parentId}`
                    : `i:${sel.parentId}`
                }
                onValueChange={onEmsecChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a LTM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="d">All sectors</SelectItem>
                  </SelectGroup>
                  {emsecTree.map((sector) => (
                    <SelectGroup key={sector.id}>
                      {/* sector */}
                      <SelectItem value={`s:${sector.id}`}>
                        {sector.labelEn}
                      </SelectItem>

                      {/* industries */}
                      {sector.children?.map((industry) => (
                        <SelectItem
                          key={industry.id}
                          value={`i:${industry.id}`}
                          className="pl-6"
                        >
                          {industry.labelEn}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            )}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>기준연도</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select
              value={sel.fy}
              onValueChange={(val) =>
                setSel({
                  ...sel,
                  fy: val as FY,
                  level: 'default',
                  parentId: undefined,
                })
              }
              disabled={sel.chartType === 'changeDist'}
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

        {sel.chartType === 'corpDist' ? (
          <CorpDistMenu sel={sel as AnalysisSelection} onChange={setSel} />
        ) : sel.chartType === 'changeDist' ? (
          <ChangeDistMenu sel={sel as AnalysisSelection} onChange={setSel} />
        ) : (
          <RatioGraphMenu sel={sel as AnalysisSelection} onChange={setSel} />
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default SectorsSidebar;
