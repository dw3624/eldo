'use client';

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
import {
  CORP_DIST_CURRENCY_ITEMS,
  CORP_DIST_ITEMS,
} from '../../_lib/constants';
import { CorpDistFilter } from '@/lib/atoms/filter-atoms';

const CorpDistMenu = ({
  filter,
  onChange,
}: {
  filter: CorpDistFilter;
  onChange: (f: CorpDistFilter) => void;
}) => {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>DATA</SidebarGroupLabel>
        <SidebarGroupContent>
          <Select
            value={filter.var}
            onValueChange={(val) => onChange({ ...filter, var: val })}
          >
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

      {filter.var && ['corpNum', 'listDist'].includes(filter.var) ? null : (
        <SidebarGroup>
          <SidebarGroupLabel>통화기준</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select
              value={filter.currency}
              onValueChange={(val) => onChange({ ...filter, currency: val })}
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
