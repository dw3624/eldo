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
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { graphFilterAtom, setSpecificFilterAtom } from '../../atom';
import { CORP_DIST_CURRENCY_ITEMS, CORP_DIST_ITEMS } from '../constants';

const CorpDistMenu = () => {
  const [graphFilter] = useAtom(graphFilterAtom);
  const setSpecificFilter = useSetAtom(setSpecificFilterAtom);
  const specific = graphFilter.specific.corpDist;

  const handleVarChange = (value: string) => {
    setSpecificFilter({
      type: 'corpDist',
      partial: { varKey: value },
    });
  };

  const handleCurrencyChange = (value: string) => {
    setSpecificFilter({
      type: 'corpDist',
      partial: { currencyKey: value },
    });
  };

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>DATA</SidebarGroupLabel>
        <SidebarGroupContent>
          <Select value={specific.varKey} onValueChange={handleVarChange}>
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

      {['corpNum', 'listDist'].includes(specific.varKey) ? null : (
        <SidebarGroup>
          <SidebarGroupLabel>통화기준</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select
              value={specific.currencyKey ?? ''}
              onValueChange={handleCurrencyChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Currency" />
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

export default CorpDistMenu;
