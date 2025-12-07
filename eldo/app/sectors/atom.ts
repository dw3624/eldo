'use client';

import { atom } from 'jotai';
import { GRAPH_ITEMS, RATIO_GRAPH_ITEMS } from './_lib/constants';
import type {
  GraphCommonFilter,
  GraphFilterState,
  GraphKey,
  GraphSpecificFilter,
  RatioSpecificFilter,
} from './_lib/types';

const createDefaultRatioSpecific = (): RatioSpecificFilter => {
  const firstGroup = RATIO_GRAPH_ITEMS[0];
  return {
    groupKey: firstGroup?.key ?? '',
    var1Key: firstGroup?.fields1?.[0]?.key ?? '',
    var2Key: firstGroup?.fields2?.[0]?.key ?? '',
    var3Key: firstGroup?.fields3?.[0]?.key ?? '',
  };
};

export const graphFilterAtom = atom<GraphFilterState>({
  key: 'corpDist',
  common: {
    sectorIds: [],
    marketIds: [],
    baseYear: 'ltm',
  },
  specific: {
    corpDist: { varKey: 'corpNum', currencyKey: 'usdM' },
    ratioHeatmap: createDefaultRatioSpecific(),
    ratioScatter: createDefaultRatioSpecific(),
    changeDist: { varKey: 'revenueStatus' },
  },
});

// 그래프 타입 바꾸는 액션 atom
export const setGraphTypeAtom = atom(null, (get, set, nextKey: GraphKey) => {
  const prev = get(graphFilterAtom);
  set(graphFilterAtom, { ...prev, key: nextKey });
});

export const setCommonFilterAtom = atom(
  null,
  (get, set, partial: Partial<GraphCommonFilter>) => {
    const prev = get(graphFilterAtom);
    set(graphFilterAtom, {
      ...prev,
      common: {
        ...prev.common,
        ...partial,
      },
    });
  },
);

export const setSpecificFilterAtom = atom(
  null,
  (
    get,
    set,
    payload: {
      type: GraphKey;
      partial: Partial<GraphSpecificFilter[GraphKey]>;
    },
  ) => {
    const prev = get(graphFilterAtom);

    set(graphFilterAtom, {
      ...prev,
      specific: {
        ...prev.specific,
        [payload.type]: {
          ...prev.specific[payload.type],
          ...payload.partial,
        },
      },
    });
  },
);

export const selectedGraphMetaAtom = atom((get) => {
  const { key } = get(graphFilterAtom);
  return GRAPH_ITEMS.find((g) => g.key === key) ?? GRAPH_ITEMS[0];
});
