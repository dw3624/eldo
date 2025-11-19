import type {
  ExtendedSelector,
  GraphKey,
  GraphSpecificFilter,
  GraphType,
  Selector,
} from './types';

export const GRAPH_ITEMS: GraphType[] = [
  {
    label: 'Company Distribution',
    key: 'corpDist',
    title: 'Comparison of Company Distribution by Industry',
  },
  {
    label: 'Ratio Heatmap',
    key: 'ratioHeatmap',
    title: 'Heatmap of Ratio Statistics Comparison Across Industry',
  },
  {
    label: 'Ratio Scatter Plot',
    key: 'ratioScatter',
    title: 'Scatter Plot of Ratio Statistics Comparison Across Industry',
  },
  {
    label: 'Growth/Decline Comparison',
    key: 'changeDist',
    title: 'Stacked Bar of Recent Growth/Decline Comparison by Industry',
  },
];

export const CORP_DIST_ITEMS: Selector[] = [
  {
    label: '기업수',
    key: 'corpNum',
  },
  {
    label: '상장일분포',
    key: 'listDist',
  },
  {
    label: '시가총액분포',
    key: 'marketCapDist',
  },
  {
    label: '자산총계분포',
    key: 'assetDist',
  },
  {
    label: '매출액분포',
    key: 'revenueDist',
  },
];

export const CORP_DIST_CURRENCY_ITEMS: Selector[] = [
  {
    label: 'USD million',
    key: 'usdM',
  },
  {
    label: 'USD billion',
    key: 'usdB',
  },
  {
    label: 'KRW 억원',
    key: 'krwB',
  },
  {
    label: 'KRW 조원',
    key: 'krwT',
  },
];

export const FIELD_ITEMS = [
  { label: 'MED', key: 'med' },
  { label: 'AVG', key: 'avg' },
  { label: 'HRM', key: 'hrm' },
  { label: 'AGG', key: 'agg' },
];

export const RATIO_GRAPH_ITEMS: ExtendedSelector[] = [
  {
    label: '멀티플',
    key: 'multiple',
    fields1: [
      { label: 'PER', key: 'perEnd' }, // PER기말 → perEnd
      { label: 'PSR', key: 'psrEnd' }, // PSR기말 → psrEnd
      { label: 'PCR', key: 'pcrEnd' }, // PCR기말 → pcrEnd
      { label: 'PBR', key: 'pbrEnd' }, // PBR기말 → pbrEnd
      { label: 'EV/Sales', key: 'evSalesEnd' }, // EV/Sales기말 → evSalesEnd
      { label: 'EV/EBITDA', key: 'evEbitdaEnd' }, // EV/EBITDA기말 → evEbitdaEnd
    ],
    fields2: FIELD_ITEMS,
    fields3: [
      { label: '기말 기준', key: 'end' }, // 기존 값 그대로 유지
      { label: 'LTM 평균', key: 'avg' }, // 기존 값 그대로 유지
      { label: '전일 기준', key: 'prev' }, // 이름 맞춰 prev로 normalize
    ],
  },
  {
    label: '수익성',
    key: 'profitability',
    fields1: [
      { label: 'ROE', key: 'roe' }, // ROE → roe
      { label: 'ROA', key: 'roa' }, // ROA → roa
      { label: '순이익률', key: 'npm' }, // NPM → npm
      { label: '영업이익률', key: 'opm' }, // OPM → opm
      { label: 'EBITDA마진율', key: 'ebitdaMargin' }, // EBITDA마진율 → ebitdaMargin
    ],
    fields2: FIELD_ITEMS,
  },
  {
    label: '상장성',
    key: 'listed',
    fields1: [
      { label: '매출증가율', key: 'revenueGrowthRate' },
      { label: '영업이익증가율', key: 'operatingProfitGrowthRate' },
      { label: 'EBITDA증가율', key: 'ebitdaGrowthRate' },
      { label: '순이익증가율', key: 'netIncomeGrowthRate' },
      { label: '영업현금흐름증가율', key: 'cfoGrowthRate' },
      { label: '자기자본증가율', key: 'equityGrowthRate' },
    ],
    fields2: FIELD_ITEMS,
  },
  {
    label: '안정성',
    key: 'stability',
    fields1: [
      { label: '부채비율', key: 'debtToEquityRatio' },
      { label: '자기자본비율', key: 'equityRatio' },
      { label: '순차입금비율', key: 'netDebtRatio' },
      { label: '유동비율', key: 'currentRatio' },
      { label: '유동부채비율', key: 'currentLiabilitiesRatio' },
    ],
    fields2: FIELD_ITEMS,
  },
  {
    label: '활동성',
    key: 'activity',
    fields1: [
      { label: '총자산회전율', key: 'ttlAssetTurnover' },
      { label: '총부채회전율', key: 'ttlLiabilityTurnover' },
      { label: '자기자본회전율', key: 'equityTurnover' },
    ],
    fields2: FIELD_ITEMS,
  },
  {
    label: '주주환원',
    key: 'shReturn',
    fields1: [{ label: '배당성향', key: 'dividendPayoutRatio' }],
    fields2: FIELD_ITEMS,
  },
];

export const CHANGE_DIST_ITEMS: Selector[] = [
  {
    label: '매출액 증감',
    key: 'revenueStatus',
  },
  {
    label: '영업이익 증감',
    key: 'operatingProfitStatus',
  },
  {
    label: 'EBITDA 증감',
    key: 'ebitdaStatus',
  },
  {
    label: '당기순이익 증감',
    key: 'netIncomeStatus',
  },
];
