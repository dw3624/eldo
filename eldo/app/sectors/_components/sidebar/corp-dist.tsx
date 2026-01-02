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
import { AnalysisSelection, CorpDistMetric } from '@/lib/analysis/types';
import { CORP_DIST_ITEMS } from '../../_lib/constants';

const makeSelector = (metric: CorpDistMetric) => {
  return { chartType: 'corpDist' as const, metric };
};

const CorpDistMenu = ({
  sel,
  onChange,
}: {
  sel: AnalysisSelection;
  onChange: (f: AnalysisSelection) => void;
}) => {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>DATA</SidebarGroupLabel>
        <SidebarGroupContent>
          <Select
            value={sel.selector.metric}
            onValueChange={(val) => {
              const metric = val as CorpDistMetric;
              onChange({
                ...sel,
                chartType: 'corpDist',
                selector: makeSelector(metric),
              });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Data" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {CORP_DIST_ITEMS.map((item) => (
                  <SelectItem key={item.key} value={item.key}>
                    {item.labelEn}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* {['corpNum', 'listDist'].includes(sel.selector.metric) ? null : (
        <SidebarGroup>
          <SidebarGroupLabel>통화기준</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select
              value={sel.selector.currency}
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
      )} */}
    </>
  );
};

export default CorpDistMenu;
