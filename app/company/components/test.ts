type TreeNode = {
  id: string;
  label: string;
  children?: TreeNode[];
};
export type FlatNode = {
  id: string;
  label: string;
  parentId?: string | null; // 루트는 undefined/null
};

export const marketData: FlatNode[] = [
  { id: 'us', label: '미국 전체' },
  { id: 'nyse', label: 'NYSE', parentId: 'us' },
  { id: 'nasdaq', label: 'NASDAQ', parentId: 'us' },
];

export const sectorData: FlatNode[] = [
  { id: 'sector1', label: 'sector1' },
  { id: 'industry1', label: 'industry1', parentId: 'sector1' },
  { id: 'sub4', label: 'sub-industry4', parentId: 'industry1' },
  { id: 'sub5', label: 'sub-industry5', parentId: 'industry1' },
  { id: 'sub6', label: 'sub-industry6', parentId: 'industry1' },
];

export const companies = [
  {
    corpName: '삼성전자',
    market: 'KOSPI',
    stockCode: '005930',
    fiscalPeriod: '12월',
    ltm_total_assets: 4483290,
    ltm_market_cap: 3895420,
    ltm_revenue: 2586890,
    revenue_trend: '증가',
    operating_profit_trend: '감소',
    prev_day_per: 18.5,
    prev_day_ev_ebitda: 6.2,
  },
  {
    corpName: 'SK하이닉스',
    market: 'KOSPI',
    stockCode: '000660',
    fiscalPeriod: '12월',
    ltm_total_assets: 956780,
    ltm_market_cap: 1245600,
    ltm_revenue: 498320,
    revenue_trend: '증가',
    operating_profit_trend: '증가',
    prev_day_per: 12.3,
    prev_day_ev_ebitda: 4.8,
  },
  {
    corpName: '현대자동차',
    market: 'KOSPI',
    stockCode: '005380',
    fiscalPeriod: '12월',
    ltm_total_assets: 2678450,
    ltm_market_cap: 562340,
    ltm_revenue: 1628970,
    revenue_trend: '보합',
    operating_profit_trend: '증가',
    prev_day_per: 7.8,
    prev_day_ev_ebitda: 3.5,
  },
];
