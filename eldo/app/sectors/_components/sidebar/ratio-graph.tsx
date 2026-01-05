'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import {
  AGG_ITEMS,
  BASIS_ITEMS,
  RATIO_GRAPH_ITEMS,
} from '../../_lib/constants';

import {
  Agg,
  AnalysisSelection,
  Basis,
  RatioMetric,
} from '@/lib/analysis/types';

const DEFAULT_RATIO_SELECTOR = {
  chartType: 'ratioHeatmap' as const,
  metric: 'per' as RatioMetric,
  agg: 'med' as Agg,
  basis: 'end' as Basis,
};

const MULTIPLE_METRICS: RatioMetric[] = [
  'per',
  'psr',
  'pcr',
  'pbr',
  // 'evSales',
  // 'evEbitda',
];

const needsBasis = (m: RatioMetric) => MULTIPLE_METRICS.includes(m);

const makeRatioSelector = (
  chartType: 'ratioHeatmap' | 'ratioScatter',
  metric: RatioMetric,
  agg: Agg,
  basis: Basis
) => {
  return {
    chartType,
    metric,
    agg,
    basis,
  };
};

const RatioGraphMenu = ({
  sel,
  onChange,
}: {
  sel: AnalysisSelection;
  onChange: (f: AnalysisSelection) => void;
}) => {
  const isRatioType =
    sel.selector?.chartType === 'ratioHeatmap' ||
    sel.selector?.chartType === 'ratioScatter';

  const ratioSel = (
    isRatioType ? sel.selector : DEFAULT_RATIO_SELECTOR
  ) as typeof DEFAULT_RATIO_SELECTOR;

  const currentChartType = isRatioType
    ? (sel.selector.chartType as 'ratioHeatmap' | 'ratioScatter')
    : 'ratioHeatmap';

  return (
    <>
      {/* Metric */}
      <SidebarGroup>
        <SidebarGroupLabel>Metric</SidebarGroupLabel>
        <SidebarGroupContent>
          <Select
            value={sel.selector.metric}
            onValueChange={(val) => {
              const metric = val as RatioMetric;
              const nextBasis: Basis = needsBasis(metric)
                ? ratioSel.basis
                : 'none';

              onChange({
                ...sel,
                chartType: currentChartType,
                selector: makeRatioSelector(
                  currentChartType,
                  metric,
                  ratioSel.agg,
                  nextBasis
                ),
              } as AnalysisSelection);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Variable 1" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {RATIO_GRAPH_ITEMS.map((item) => (
                  <div key={item.key}>
                    <SelectLabel>{item.labelEn}</SelectLabel>
                    {item.metrics.map((metric) => (
                      <SelectItem key={metric.key} value={metric.key}>
                        {metric.labelEn}
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Agg */}
      <SidebarGroup>
        <SidebarGroupLabel>Aggregates</SidebarGroupLabel>
        <SidebarGroupContent>
          <Select
            value={sel.selector.agg}
            onValueChange={(val) => {
              const agg = val as Agg;
              onChange({
                ...sel,
                chartType: currentChartType,
                selector: makeRatioSelector(
                  currentChartType,
                  ratioSel.metric,
                  agg,
                  ratioSel.basis
                ),
              } as AnalysisSelection);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Variable 2" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {AGG_ITEMS.map((agg) => (
                  <SelectItem key={agg.key} value={agg.key}>
                    {agg.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Basis */}
      {needsBasis(ratioSel.metric) && (
        <SidebarGroup>
          <SidebarGroupLabel>Basis</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select
              value={sel.selector.basis}
              onValueChange={(val) => {
                const basis = val as Basis;
                onChange({
                  ...sel,
                  chartType: currentChartType,
                  selector: makeRatioSelector(
                    currentChartType,
                    ratioSel.metric,
                    ratioSel.agg,
                    basis
                  ),
                } as AnalysisSelection);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Basis" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {BASIS_ITEMS.map((item) => (
                    <SelectItem key={item.key} value={item.key}>
                      {item.labelEn}
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
