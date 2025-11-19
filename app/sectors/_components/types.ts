export type Graph = {
  key: string;
  label: string;
  title: string;
};

export type FlatNode = {
  id: string;
  label: string;
  parentId?: string | null; // 루트는 undefined/null
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

export type TopFilter =
  | 'corpDist' // 기업분포
  | 'ratioHeatmap' // 비율히트맵
  | 'ratioScatter' // 비율점도표
  | 'changeTable'; // 증감분포표
