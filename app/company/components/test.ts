type TreeNode = {
  id: string;
  label: string;
  children?: TreeNode[];
};

export const marketData: TreeNode[] = [
  {
    id: 'us',
    label: '미국 전체',
    children: [
      { id: 'nyse', label: 'NYSE' },
      { id: 'nasdaq', label: 'NASDAQ' },
    ],
  },
  {
    id: 'ko',
    label: '한국 전체',
    children: [
      { id: 'kospi', label: 'KOSPI' },
      { id: 'kosdaq', label: 'KOSDAQ' },
      { id: 'konex', label: 'KONEX' },
    ],
  },
];

export const sectorData: TreeNode[] = [
  {
    id: 'sector1',
    label: 'Sector1',
    children: [
      {
        id: 'industry1',
        label: 'Industry1',
        children: [
          { id: 'sub1', label: 'Sub-Industry1' },
          { id: 'sub2', label: 'Sub-Industry2' },
          { id: 'sub3', label: 'Sub-Industry3' },
        ],
      },
      { id: 'industry2', label: 'Industry2' },
      { id: 'industry3', label: 'Industry3' },
    ],
  },
  {
    id: 'sector2',
    label: 'Sector2',
    children: [
      {
        id: 'industry4',
        label: 'Industry4',
        children: [
          { id: 'sub4', label: 'Sub-Industry4' },
          { id: 'sub5', label: 'Sub-Industry5' },
          { id: 'sub6', label: 'Sub-Industry6' },
        ],
      },
      { id: 'industry5', label: 'Industry5' },
      { id: 'industry6', label: 'Industry6' },
    ],
  },
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
