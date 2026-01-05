/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import useSWR from 'swr';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  useRouter,
  useSearchParams,
  useSelectedLayoutSegment,
} from 'next/navigation';
import * as React from 'react';
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
import { TOC_FIELDS } from '../[id]/_components/fields';

const EXCHANGES = [
  { id: 'all', label: 'All Exchanges' },
  { id: 'ko_all', label: 'All KOREA' },
  { id: 'kospi', label: 'KOSPI' },
  { id: 'kosdaq', label: 'KOSDAQ' },
  { id: 'us_all', label: 'All USA' },
  { id: 'nye', label: 'NYSE' },
  { id: 'nasdaq', label: 'NASDAQ' },
];

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function CompanySidebar() {
  const segment = useSelectedLayoutSegment();
  const isDetail = segment !== null;

  const router = useRouter();
  const sp = useSearchParams();

  const { data: emsecTree = [], isLoading } = useSWR(
    '/api/emsec/tree',
    fetcher
  );

  const urlQ = sp.get('q') ?? '';
  const urlExchange = sp.get('exchange') || 'all';
  const urlEmsec = sp.get('emsec') || 'all';

  const [q, setQ] = React.useState(urlQ);

  React.useEffect(() => setQ(urlQ), [urlQ]);

  const updateFilter = React.useCallback(
    (patch: Record<string, string | null>) => {
      const params = new URLSearchParams(sp.toString());

      for (const [k, v] of Object.entries(patch)) {
        if (v === null || v === '' || v === 'all') {
          params.delete(k);
        } else {
          params.set(k, v);
        }
      }

      params.set('page', '1');
      router.push(`?${params.toString()}`);
    },
    [sp, router]
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter({ q: q.trim() || null });
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <form onSubmit={onSubmit}>
          <ButtonGroup>
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search companies..."
            />
            <Button type="submit" variant="outline" aria-label="Search">
              <SearchIcon />
            </Button>
          </ButtonGroup>
        </form>
      </SidebarHeader>

      {isDetail ? (
        <SidebarContent className="pb-40">
          <SidebarGroup>
            <SidebarGroupLabel>Table Of Contents</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {TOC_FIELDS.map((item, i) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild>
                      <Link href={`#${item.id}`}>
                        {i + 1}. {item.label.en}
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
            <SidebarGroupLabel>Exchange</SidebarGroupLabel>
            <SidebarGroupContent>
              <Select
                value={urlExchange}
                onValueChange={(val) => updateFilter({ exchange: val })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select market" />
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
            <SidebarGroupLabel>
              Sector · Industry · Sub-industry
            </SidebarGroupLabel>
            <SidebarGroupContent>
              {isLoading ? (
                <div className="p-2 text-sm text-muted-foreground">
                  Loading...
                </div>
              ) : (
                <Select
                  value={urlEmsec}
                  onValueChange={(val) => updateFilter({ emsec: val })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select sector/industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">All sectors</SelectItem>
                    </SelectGroup>
                    {emsecTree.map((sector: any) => (
                      <SelectGroup key={sector.id}>
                        <SelectItem value={`${sector.id}`}>
                          {sector.labelEn}
                        </SelectItem>

                        {sector.children?.map((industry: any) => (
                          <SelectGroup key={industry.id}>
                            <SelectItem
                              value={`${industry.id}`}
                              className="pl-6"
                            >
                              {industry.labelEn}
                            </SelectItem>
                            {industry.children?.map((subIndustry: any) => (
                              <SelectItem
                                key={subIndustry.id}
                                value={`${subIndustry.id}`}
                                className="pl-12 truncate"
                              >
                                {subIndustry.labelEn}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      )}
    </Sidebar>
  );
}
