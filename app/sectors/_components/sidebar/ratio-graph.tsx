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
import { RATIO_GRAPH_ITEMS } from '../constants';
import type { RatioSpecificFilter } from '../types';

const RatioGraphMenu = () => {
  const [graphFilter] = useAtom(graphFilterAtom);
  const setSpecificFilter = useSetAtom(setSpecificFilterAtom);

  const isRatioType =
    graphFilter.type === 'ratioHeatmap' || graphFilter.type === 'ratioScatter';
  if (!isRatioType) return null;

  const specific =
    graphFilter.specific[graphFilter.type as 'ratioHeatmap' | 'ratioScatter'];

  const handleGroupChange = (value: string) => {
    const group = RATIO_GRAPH_ITEMS.find((item) => item.key === value);
    if (!group) return;

    setSpecificFilter({
      type: graphFilter.type,
      partial: {
        groupKey: group.key,
        var1Key: group.fields1?.[0]?.key ?? '',
        var2Key: group.fields2?.[0]?.key ?? '',
        var3Key: group.fields3?.[0]?.key ?? '',
      },
    });
  };

  const handleVarChange = (field: keyof RatioSpecificFilter, value: string) => {
    setSpecificFilter({
      type: graphFilter.type,
      partial: { [field]: value },
    });
  };

  const selectedRatioGraph =
    RATIO_GRAPH_ITEMS.find((g) => g.key === specific.groupKey) ??
    RATIO_GRAPH_ITEMS[0];

  return (
    <>
      {/* Group Select */}
      <SidebarGroup>
        <SidebarGroupLabel>Group</SidebarGroupLabel>
        <SidebarGroupContent>
          <Select value={specific.groupKey} onValueChange={handleGroupChange}>
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
              value={specific.var1Key ?? ''}
              onValueChange={(value) => handleVarChange('var1Key', value)}
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
              value={specific.var2Key ?? ''}
              onValueChange={(value) => handleVarChange('var2Key', value)}
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
              value={specific.var3Key ?? ''}
              onValueChange={(value) => handleVarChange('var3Key', value)}
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
