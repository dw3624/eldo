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

import { AnalysisSelection, ChangeMetric } from '@/lib/analysis/types';

const makeSelector = (metric: ChangeMetric) => {
  return { chartType: 'changeDist' as const, metric };
};
const ChangeDistMenu = ({
  sel,
  onChange,
}: {
  sel: AnalysisSelection;
  onChange: (f: AnalysisSelection) => void;
}) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Metric</SidebarGroupLabel>
      <SidebarGroupContent>
        <Select
          value={sel.selector.metric}
          onValueChange={(val) => {
            const metric = val as ChangeMetric;
            onChange({
              ...sel,
              chartType: 'changeDist',
              selector: makeSelector(metric),
            });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Data" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {CHANGE_DIST_ITEMS.map((item) => (
                <SelectItem key={item.key} value={item.key}>
                  {item.labelEn}
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
