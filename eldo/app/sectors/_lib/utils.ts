import {
  CORP_DIST_CURRENCY_ITEMS,
  CORP_DIST_ITEMS,
  RATIO_GRAPH_ITEMS,
} from './constants';
import type { GraphFilterState, GraphKey, RatioSpecificFilter } from './types';

// 공통: key로 label 찾기
const findLabel = (
  items: { key: string; label: string }[],
  key?: string | null,
) => items.find((item) => item.key === key)?.label;

// 그래프별 specific → label 배열로 변환
export const getSpecificLabels = (graphFilter: GraphFilterState): string[] => {
  const { key: graphKey, specific } = graphFilter;

  switch (graphKey as GraphKey) {
    case 'corpDist': {
      const spec = specific.corpDist;
      const dataLabel = findLabel(CORP_DIST_ITEMS, spec.varKey);
      const currencyLabel = spec.currencyKey
        ? findLabel(CORP_DIST_CURRENCY_ITEMS, spec.currencyKey)
        : undefined;
      return [dataLabel, currencyLabel].filter((v): v is string => !!v);
    }

    case 'ratioHeatmap':
    case 'ratioScatter': {
      const spec = specific[graphKey] as RatioSpecificFilter;
      const group = RATIO_GRAPH_ITEMS.find((g) => g.key === spec.groupKey);

      const groupLabel = group?.label;
      const var1Label = group
        ? findLabel(group.fields1 ?? [], spec.var1Key)
        : undefined;
      const var2Label = group
        ? findLabel(group.fields2 ?? [], spec.var2Key)
        : undefined;
      const var3Label = group
        ? findLabel(group.fields3 ?? [], spec.var3Key)
        : undefined;

      return [groupLabel, var1Label, var2Label, var3Label].filter(
        (v): v is string => !!v,
      );
    }

    case 'changeDist': {
      const spec = specific.changeDist;
      return [spec.varKey].filter((v): v is string => !!v);
    }

    default:
      return [];
  }
};
