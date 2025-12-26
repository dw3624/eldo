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
import { RATIO_GRAPH_ITEMS } from '../../_lib/constants';

import { RatioSpecificFilter } from '@/lib/atoms/filter-atoms';

const RatioGraphMenu = ({
  filter,
  onChange,
}: {
  filter: RatioSpecificFilter;
  onChange: (f: RatioSpecificFilter) => void;
}) => {
  const selectedRatioGraph =
    RATIO_GRAPH_ITEMS.find((g) => g.key === filter.group) ??
    RATIO_GRAPH_ITEMS[0];

  return (
    <>
      {/* Group Select */}
      <SidebarGroup>
        <SidebarGroupLabel>Group</SidebarGroupLabel>
        <SidebarGroupContent>
          <Select
            value={filter.group}
            onValueChange={(val) => onChange({ ...filter, group: val })}
          >
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

      {/* Variable 1 */}
      {selectedRatioGraph.fields1 && (
        <SidebarGroup>
          <SidebarGroupLabel>Variable 1</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select
              value={filter.var1 ?? ''}
              onValueChange={(val) => onChange({ ...filter, var1: val })}
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
              value={filter.var2 ?? ''}
              onValueChange={(val) => onChange({ ...filter, var2: val })}
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
              value={filter.var3 ?? ''}
              onValueChange={(val) => onChange({ ...filter, var3: val })}
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

export default RatioGraphMenu;
