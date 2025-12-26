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
import { CHANGE_DIST_ITEMS } from '../../_lib/constants';
import { StackBarChartFilter } from '@/lib/atoms/filter-atoms';

const ChangeDistMenu = ({
  filter,
  onChange,
}: {
  filter: StackBarChartFilter;
  onChange: (f: StackBarChartFilter) => void;
}) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Variable</SidebarGroupLabel>
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
              {CHANGE_DIST_ITEMS.map((item) => (
                <SelectItem key={item.key} value={item.key}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default ChangeDistMenu;
