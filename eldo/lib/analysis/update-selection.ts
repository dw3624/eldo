import type { AnalysisSelection, Level, Selector } from '@/lib/analysis/types';

export function setEmsec(
  prev: AnalysisSelection,
  next: { level: Level; parentId?: number }
): AnalysisSelection {
  if (next.level === 'default') {
    return { ...prev, level: 'default', parentId: undefined };
  }
  return { ...prev, level: next.level, parentId: next.parentId };
}

export function setChart(
  prev: AnalysisSelection,
  next: { chartType: AnalysisSelection['chartType']; selector: Selector }
): AnalysisSelection {
  return { ...prev, chartType: next.chartType, selector: next.selector };
}
