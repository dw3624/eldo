'use client';

import { atom } from 'jotai';
import {
  CORP_DIST_CURRENCY_ITEMS,
  CORP_DIST_ITEMS,
  GRAPH_ITEMS,
  RATIO_GRAPH_ITEMS,
} from './_components/constants';
import type {
  ExtendedSelector,
  FilterVars,
  Graph,
  Selector,
  TopFilter,
} from './_components/types';

export const selectedGraphAtom = atom<Graph>(GRAPH_ITEMS[0]);
export const selectedLTMAtom = atom('ltm');

// 기업분포
export const selectedCompanyDistAtom = atom<Selector>(CORP_DIST_ITEMS[0]);
export const selectedCompanyDistCurrencyAtom = atom<Selector>(
  CORP_DIST_CURRENCY_ITEMS[0],
);

// 비율히트맵, 비율점도표
export const selectedRatioGraphAtom = atom<ExtendedSelector>(
  RATIO_GRAPH_ITEMS[0],
);
export const selectedRatioGraphVar1Atom = atom<Selector>(
  RATIO_GRAPH_ITEMS[0].fields1[0],
);
export const selectedRatioGraphVar2Atom = atom<Selector>(
  RATIO_GRAPH_ITEMS[0].fields2[0],
);
export const selectedRatioGraphVar3Atom = atom<Selector>(
  RATIO_GRAPH_ITEMS[0].fields3?.[0] ?? { key: '', label: '' },
);
// export const selectedRatioHeatAtom = atom<Selector>(
//   CORP_DIST_CURRENCY_ITEMS[0],
// );

export const selectedTopFilterAtom = atom<TopFilter>('corpDist');

export const filterVarsAtom = atom<Record<TopFilter, FilterVars>>({
  corpDist: { var1: null, var2: null, var3: null },
  ratioHeatmap: { var1: null, var2: null, var3: null },
  ratioScatter: { var1: null, var2: null, var3: null },
  changeTable: { var1: null, var2: null, var3: null },
});
