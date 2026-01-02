import { atom } from 'jotai';
import type { AnalysisSelection } from '../analysis/types';

export const analysisSelectionAtom = atom<AnalysisSelection>({
  chartType: 'corpDist',
  fy: 'LTM-0',
  exchange: 'kospi',
  level: 'default',
  selector: { chartType: 'corpDist', metric: 'corpCount' },
});

export const setDefaultAtom = atom(null, (get, set) => {
  const prev = get(analysisSelectionAtom);
  set(analysisSelectionAtom, {
    ...prev,
    level: 'default',
    parentId: undefined,
  });
});
