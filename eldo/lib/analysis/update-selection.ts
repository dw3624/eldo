import type { AnalysisSelection, Level } from '@/lib/analysis/types';

export function setEmsec(
  prev: AnalysisSelection,
  next: { level: Level; parentId?: number }
): AnalysisSelection {
  if (next.level === 'default') {
    return { ...prev, level: 'default', parentId: undefined };
  }
  return { ...prev, level: next.level, parentId: next.parentId };
}

export function setChart<T extends AnalysisSelection>(
  prev: AnalysisSelection,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  next: T extends any
    ? { chartType: T['chartType']; selector: T['selector'] }
    : never
): AnalysisSelection {
  return { ...prev, ...next } as AnalysisSelection;
}
