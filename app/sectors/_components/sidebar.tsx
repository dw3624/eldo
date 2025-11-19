'use client';

import { useAtom } from 'jotai';
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
  selectedCompanyDistAtom,
  selectedCompanyDistCurrencyAtom,
  selectedGraphAtom,
  selectedLTMAtom,
  selectedRatioGraphAtom,
  selectedRatioGraphVar1Atom,
  selectedRatioGraphVar2Atom,
  selectedRatioGraphVar3Atom,
} from '../atom';
import {
  CORP_DIST_CURRENCY_ITEMS,
  CORP_DIST_ITEMS,
  GRAPH_ITEMS,
  RATIO_GRAPH_ITEMS,
} from './constants';
import { marketData, sectorData } from './dummy';
import FilterTree from './filter-tree';
import type { ExtendedSelector, FieldKey, Selector } from './types';

const SectorsSidebar = () => {
  // const segment = useSelectedLayoutSegment();
  const [selectedGraph, setSelectedGraph] = useAtom(selectedGraphAtom);
  const [selectedLTM, setSelectedLTM] = useAtom(selectedLTMAtom);

  const handleChangeGraph = (value: string) => {
    const item = GRAPH_ITEMS.find((item) => item.key === value);
    if (item) {
      setSelectedGraph(item);
    }
  };
  const handleChangeLTM = (value: string) => {
    setSelectedLTM(value);
  };

  return (
    <Sidebar>
      <SidebarHeader className="pt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <Select value={selectedGraph.key} onValueChange={handleChangeGraph}>
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
              value={selectedLTM}
              onValueChange={handleChangeLTM}
              disabled={selectedGraph.key === 'gdComps'}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a LTM" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={'ltm'}>LTM</SelectItem>
                  {selectedGraph.key === 'gdComps' ? null : (
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

        {selectedGraph.key === 'compDist' ? <CompanyDistMenu /> : <GroupMenu />}
      </SidebarContent>
    </Sidebar>
  );
};

export default SectorsSidebar;

const CompanyDistMenu = () => {
  const [selectedCompanyDist, setSelectedCompanyDist] = useAtom(
    selectedCompanyDistAtom,
  );
  const [selectedCompanyDistCurrency, setSelectedCompanyDistCurrency] = useAtom(
    selectedCompanyDistCurrencyAtom,
  );

  const handleChange = (value: string) => {
    const item = CORP_DIST_ITEMS.find((item) => item.key === value);
    if (item) {
      setSelectedCompanyDist(item);
    }
  };

  const handleChangeCurrency = (value: string) => {
    const item = CORP_DIST_CURRENCY_ITEMS.find((item) => item.key === value);
    if (item) {
      setSelectedCompanyDistCurrency(item);
    }
  };

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>DATA</SidebarGroupLabel>
        <SidebarGroupContent>
          <Select value={selectedCompanyDist.key} onValueChange={handleChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Data" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {CORP_DIST_ITEMS.map((item) => (
                  <SelectItem key={item.key} value={item.key}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </SidebarGroupContent>
      </SidebarGroup>
      {['corpNum', 'listDist'].includes(selectedCompanyDist.key) ? null : (
        <SidebarGroup>
          <SidebarGroupLabel>통화기준</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select
              value={selectedCompanyDistCurrency.key}
              onValueChange={handleChangeCurrency}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Data" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {CORP_DIST_CURRENCY_ITEMS.map((item) => (
                    <SelectItem key={item.key} value={item.key}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>
      )}
    </>
  );
};

const GroupMenu = () => {
  const [selectedRatioGraph, setSelectedRatioGraph] = useAtom(
    selectedRatioGraphAtom,
  );
  const [selectedRatioGraphVar1, setSelectedRatioGraphVar1] = useAtom(
    selectedRatioGraphVar1Atom,
  );
  const [selectedRatioGraphVar2, setSelectedRatioGraphVar2] = useAtom(
    selectedRatioGraphVar2Atom,
  );
  const [selectedRatioGraphVar3, setSelectedRatioGraphVar3] = useAtom(
    selectedRatioGraphVar3Atom,
  );

  const handleChange = (value: string) => {
    const group = RATIO_GRAPH_ITEMS.find((item) => item.key === value);
    if (!group) return;

    setSelectedRatioGraph(group);
    setSelectedRatioGraphVar1(group.fields1?.[0] ?? null);
    setSelectedRatioGraphVar2(group.fields2?.[0] ?? null);
    setSelectedRatioGraphVar3(group.fields3?.[0] ?? { key: '', label: '' });
  };
  const handleChangeVar = (
    groupValue: ExtendedSelector['key'],
    field: FieldKey,
    value: Selector['key'],
  ) => {
    const group = RATIO_GRAPH_ITEMS.find((group) => group.key === groupValue);
    if (!group) return;

    const items = group[field] ?? [];
    const item = items.find((item) => item.key === value);
    if (!item) return;

    switch (field) {
      case 'fields1':
        setSelectedRatioGraphVar1(item);
        break;
      case 'fields2':
        setSelectedRatioGraphVar2(item);
        break;
      case 'fields3':
        setSelectedRatioGraphVar3(item);
        break;
    }
  };

  return (
    <>
      {/* Group Select */}
      <SidebarGroup>
        <SidebarGroupLabel>Group</SidebarGroupLabel>
        <SidebarGroupContent>
          <Select value={selectedRatioGraph.key} onValueChange={handleChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Group" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {RATIO_GRAPH_ITEMS.map((item) => (
                  <SelectItem key={item.key} value={item.key}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Variable 1: fields1 이 있으면 공통 렌더 */}
      {selectedRatioGraph.fields1 && (
        <SidebarGroup>
          <SidebarGroupLabel>Variable 1</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select
              value={selectedRatioGraphVar1?.key ?? ''}
              onValueChange={(value) =>
                handleChangeVar(selectedRatioGraph.key, 'fields1', value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Variable 1" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {selectedRatioGraph.fields1.map((item) => (
                    <SelectItem key={item.key} value={item.key}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>
      )}

      {/* Variable 2: fields2 이 있으면 */}
      {selectedRatioGraph.fields2 && (
        <SidebarGroup>
          <SidebarGroupLabel>Variable 2</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select
              value={selectedRatioGraphVar2?.key ?? ''}
              onValueChange={(value) =>
                handleChangeVar(selectedRatioGraph.key, 'fields2', value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Variable 2" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {selectedRatioGraph.fields2.map((item) => (
                    <SelectItem key={item.key} value={item.key}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>
      )}

      {/* Variable 3: multiple 그룹 + fields3 있을 때만 */}
      {selectedRatioGraph.fields3 && (
        <SidebarGroup>
          <SidebarGroupLabel>Variable 3</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select
              value={selectedRatioGraphVar3?.key ?? ''}
              onValueChange={(value) =>
                handleChangeVar(selectedRatioGraph.key, 'fields3', value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Variable 3" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {selectedRatioGraph.fields3.map((item) => (
                    <SelectItem key={item.key} value={item.key}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>
      )}
    </>
  );
};
