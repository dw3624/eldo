import type { AnalysisSelection } from './types';

export function buildApiUrl(sel: AnalysisSelection): string {
  const sp = new URLSearchParams();

  sp.set('chartType', sel.chartType);
  sp.set('fy', sel.chartType === 'changeDist' ? 'LTM-0' : sel.fy);
  sp.set('exchange', sel.exchange);
  sp.set('level', sel.level);

  if (sel.level !== 'default') {
    if (sel.parentId === undefined)
      throw new Error('parentId is required for sector/industry');
    sp.set('parentId', String(sel.parentId));
  }

  // selector
  if (sel.selector.chartType === 'corpDist') {
    sp.set('metric', sel.selector.metric);
  } else if (sel.selector.chartType === 'changeDist') {
    sp.set('metric', sel.selector.metric);
  } else {
    sp.set('metric', sel.selector.metric);
    sp.set('agg', sel.selector.agg);
    sp.set('basis', sel.selector.basis);
  }

  return `/api/analysis?${sp.toString()}`;
}
