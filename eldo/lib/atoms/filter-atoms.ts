import { atom } from 'jotai';
import { atomWithHash } from 'jotai-location';

export const fyAtom = atomWithHash<string>('fy', 'LTM-0');

export const exchangeAtom = atomWithHash<string>('exchange', 'kospi');

export const emsecIdAtom = atomWithHash<string>('emsecId', '3');

export const graphAtom = atomWithHash<string>('graph', 'corpDist');

export type CorpDistFilter = {
  var?: string;
  currency?: string;
};

export type RatioSpecificFilter = {
  group?: string;
  var1?: string;
  var2?: string;
  var3?: string;
};

export type StackBarChartFilter = {
  var?: string;
};

export type ChartType =
  | 'corpDist'
  | 'ratioHeatmap'
  | 'ratioScatter'
  | 'changeDist';

export type ChartFilterMap = {
  corpDist: CorpDistFilter;
  ratioHeatmap: RatioSpecificFilter;
  ratioScatter: RatioSpecificFilter;
  changeDist: StackBarChartFilter;
};

export interface ChartConfig<T extends ChartType = ChartType> {
  type: T;
  filter: ChartFilterMap[T];
}

export const chartTypeAtom = atomWithHash<ChartType>('chartType', 'corpDist');
export const corpDistFilterAtom = atomWithHash<CorpDistFilter>(
  'corpDistFilter',
  {}
);
export const ratioFilterAtom = atomWithHash<RatioSpecificFilter>(
  'ratioFilter',
  {}
);
export const changeDistFilterAtom = atomWithHash<StackBarChartFilter>(
  'changeDistFilter',
  {}
);

export const currentFilterAtom = atom(
  (get) => {
    const chartType = get(chartTypeAtom);
    switch (chartType) {
      case 'corpDist':
        return get(corpDistFilterAtom);
      case 'ratioHeatmap':
        return get(ratioFilterAtom);
      case 'ratioScatter':
        return get(ratioFilterAtom);
      case 'changeDist':
        return get(changeDistFilterAtom);
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (get, set, newFilter: any) => {
    const chartType = get(chartTypeAtom);
    switch (chartType) {
      case 'corpDist':
        set(corpDistFilterAtom, newFilter);
        break;
      case 'ratioHeatmap':
        set(ratioFilterAtom, newFilter);
        break;
      case 'ratioScatter':
        set(ratioFilterAtom, newFilter);
        break;
      case 'changeDist':
        set(changeDistFilterAtom, newFilter);
        break;
    }
  }
);

export const chartDataAtom = atom(async (get) => {
  const emsecId = get(emsecIdAtom);
  const fy = get(fyAtom);
  const exchange = get(exchangeAtom);
  const chartType = get(chartTypeAtom);
  const filter = get(currentFilterAtom);

  // API 호출
  const response = await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emsecId, fy, exchange, chartType, filter }),
  });

  return response.json();
});

// 모든 필터 리셋
export const resetFiltersAtom = atom(null, (get, set) => {
  set(corpDistFilterAtom, {});
  set(ratioFilterAtom, {});
  set(ratioFilterAtom, {});
  set(changeDistFilterAtom, {});
});

// 전체 리셋
export const resetAllAtom = atom(null, (get, set) => {
  set(emsecIdAtom, '3');
  set(fyAtom, 'LTM-0');
  set(exchangeAtom, 'kospi');
  set(chartTypeAtom, 'corpDist');
  set(resetFiltersAtom);
});
