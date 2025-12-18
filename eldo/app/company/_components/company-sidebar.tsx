/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import {
  ReadonlyURLSearchParams,
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
import { TOC_CONTENTS } from '../[id]/_components/constants';
import FilterTree from './filter-tree';
import { marketData } from './test';
import { useEmsecTree } from './use-emsec-tree';

function setQuery(
  sp: ReadonlyURLSearchParams,
  patch: Record<string, string | string[] | null>,
  resetPage = true
) {
  const params = new URLSearchParams(sp.toString());

  for (const [k, v] of Object.entries(patch)) {
    params.delete(k);
    if (v === null) continue;
    if (Array.isArray(v)) v.filter(Boolean).forEach((x) => params.append(k, x));
    else if (v !== '') params.set(k, v);
  }
  if (resetPage) params.set('page', '1');
  return params.toString();
}

export default function CompanySidebar() {
  const { data: sectorData = [], isLoading } = useEmsecTree();

  const segment = useSelectedLayoutSegment();
  const isDetail = segment !== null;

  const router = useRouter();
  const sp = useSearchParams();

  // URL -> 초기값 주입 (새로고침/뒤로가기 대응)
  const urlQ = sp.get('q') ?? '';
  const urlExchange = sp.getAll('exchange'); // multiple
  const urlEmsec = sp.getAll('emsec'); // leaf ids

  // draft states
  const [q, setQ] = React.useState(urlQ);
  const [draftExchanges, setDraftExchanges] = React.useState<Set<string>>(
    () => new Set(urlExchange)
  );
  const [draftEmsec, setDraftEmsec] = React.useState<Set<string>>(
    () => new Set(urlEmsec.map((x) => `emsec:${x}`))
  );

  // URL이 바뀌면 draft도 동기화 (중요)
  React.useEffect(() => setQ(urlQ), [urlQ]);
  React.useEffect(
    () => setDraftExchanges(new Set(urlExchange)),
    [urlExchange.join('|')]
  );
  React.useEffect(() => {
    setDraftEmsec(new Set(urlEmsec.map((x) => `emsec:${x}`)));
  }, [urlEmsec.join('|')]);

  const apply = () => {
    const emsecIds = Array.from(draftEmsec)
      .filter((x) => x.startsWith('emsec:'))
      .map((x) => x.replace('emsec:', ''));

    router.push(
      `?${setQuery(sp, {
        q: q || null,
        exchange: Array.from(draftExchanges),
        emsec: emsecIds,
      })}`
    );
  };

  const clear = () => {
    setQ('');
    setDraftExchanges(new Set());
    setDraftEmsec(new Set());
    router.push(`?${setQuery(sp, { q: null, exchange: null, emsec: null })}`);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <ButtonGroup>
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search..."
          />
          <Button
            variant="outline"
            aria-label="Search"
            className="cursor-pointer"
            onClick={apply}
          >
            <SearchIcon />
          </Button>
        </ButtonGroup>

        {!isDetail && (
          <div className="mt-2 flex gap-2">
            <Button size="sm" className="flex-1" onClick={apply}>
              Apply
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              onClick={clear}
            >
              Clear
            </Button>
          </div>
        )}
      </SidebarHeader>

      {isDetail ? (
        <SidebarContent className="pb-40">
          <SidebarGroup>
            <SidebarGroupLabel>Table Of Contents</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {TOC_CONTENTS.map((item, i) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild>
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
              <FilterTree
                data={marketData}
                selectedIds={draftExchanges}
                onChange={(next) => setDraftExchanges(next)}
              />
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>
              Sector · Industry · Sub-industry
            </SidebarGroupLabel>
            <SidebarGroupContent>
              {isLoading ? (
                <div className="p-2 text-sm text-muted-foreground">
                  Loading…
                </div>
              ) : (
                <FilterTree
                  data={sectorData}
                  selectedIds={draftEmsec}
                  onChange={(next) => setDraftEmsec(next)}
                />
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      )}
    </Sidebar>
  );
}
