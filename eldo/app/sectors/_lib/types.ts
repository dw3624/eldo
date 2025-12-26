export type EmsecLevel = 'sector' | 'industry' | 'sub_industry';

export type FlatNode = {
  id: number;
  parentId?: number | null;
  level: EmsecLevel; // ✅ 필수
  label: string;
};

export type Selector = {
  label: string;
  key: string;
};

export type ExtendedSelector = Selector & {
  fields1: Selector[];
  fields2: Selector[];
  fields3?: Selector[];
};

export type FieldKey = 'fields1' | 'fields2' | 'fields3';

export type FilterVars = {
  var1?: Selector | null;
  var2?: Selector | null;
  var3?: Selector | null;
};

export type GraphKey =
  | 'corpDist' // 기업분포
  | 'ratioHeatmap' // 비율히트맵
  | 'ratioScatter' // 비율점도표
  | 'changeDist'; // 증감분포표

export type GraphType = {
  key: GraphKey;
  label: string;
  title: string;
};

// 공통 필터
export type GraphCommonFilter = {
  sectorId: string;
  marketId: string;
  baseYear: 'LTM-0' | 'LTM-1' | 'LTM-2' | 'LTM-3';
};

// ratioHeatmap / ratioScatter가 공유할 필터 구조
export type RatioSpecificFilter = {
  groupKey: string;
  var1Key: string;
  var2Key: string;
  var3Key?: string;
};

// 그래프별 하위 변수 설정
export type GraphSpecificFilter = {
  corpDist: {
    varKey: string;
    currencyKey: string;
  };
  ratioHeatmap: RatioSpecificFilter;
  ratioScatter: RatioSpecificFilter;
  changeDist: {
    varKey: string;
  };
};

export type GraphFilterState = {
  graph: GraphKey;
  specific: GraphSpecificFilter;
};
