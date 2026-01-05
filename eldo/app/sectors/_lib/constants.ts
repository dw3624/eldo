type Item = {
  label: string;
  labelEn: string;
  key: string;
};

type GraphType = Item & {
  title: string;
};

type ExtendedItem = Item & {
  metrics: Item[];
};

export const GRAPH_ITEMS: GraphType[] = [
  {
    label: 'Company Distribution',
    labelEn: 'Company Distribution',
    key: 'corpDist',
    title: 'Comparison of Company Distribution by Industry',
  },
  {
    label: 'Ratio Heatmap',
    labelEn: 'Ratio Heatmap',
    key: 'ratioHeatmap',
    title: 'Heatmap of Ratio Statistics Comparison Across Industry',
  },
  {
    label: 'Ratio Scatter Plot',
    labelEn: 'Ratio Scatter Plot',
    key: 'ratioScatter',
    title: 'Scatter Plot of Ratio Statistics Comparison Across Industry',
  },
  {
    label: 'Growth/Decline Comparison',
    labelEn: 'Growth/Decline Comparison',
    key: 'changeDist',
    title: 'Stacked Bar of Recent Growth/Decline Comparison by Industry',
  },
];

export const CORP_DIST_ITEMS: Item[] = [
  {
    label: '기업수',
    labelEn: 'Company Count Distribution',
    key: 'corpCount',
  },
  {
    label: '상장일분포',
    labelEn: 'Listing Age Distribution',
    key: 'listingAge',
  },
  {
    label: '시가총액분포',
    labelEn: 'Market Cap Distribution',
    key: 'marketCap',
  },
  {
    label: '자산총계분포',
    labelEn: 'Assets Distribution',
    key: 'assets',
  },
  {
    label: '매출액분포',
    labelEn: 'Revenue Distribution',
    key: 'revenue',
  },
];

export const CORP_DIST_CURRENCY_ITEMS: Item[] = [
  {
    label: 'USD million',
    labelEn: 'USD million',
    key: 'usdM',
  },
  {
    label: 'USD billion',
    labelEn: 'USD billion',
    key: 'usdB',
  },
  {
    label: 'KRW 억원',
    labelEn: 'KRW billion',
    key: 'krwB',
  },
  {
    label: 'KRW 조원',
    labelEn: 'KRW trillion',
    key: 'krwT',
  },
];

export const AGG_ITEMS = [
  { label: 'MED', key: 'med' },
  { label: 'AVG', key: 'avg' },
  { label: 'HRM', key: 'hrm' },
  // { label: 'AGG', key: 'agg' },
];

export const BASIS_ITEMS = [
  { label: '기말 기준', labelEn: 'LTM End', key: 'end' }, // 기존 값 그대로 유지
  { label: 'LTM 평균', labelEn: 'LTM Average', key: 'avg' }, // 기존 값 그대로 유지
  { label: '전일 기준', labelEn: 'Previous Date', key: 'prev' }, // 이름 맞춰 prev로 normalize
];

export const RATIO_GRAPH_ITEMS: ExtendedItem[] = [
  {
    label: '멀티플',
    labelEn: 'Multiple',
    key: 'multiple',
    metrics: [
      { label: 'PER', labelEn: 'PER', key: 'per' }, // PER기말 → perEnd
      { label: 'PSR', labelEn: 'PSR', key: 'psr' }, // PSR기말 → psrEnd
      { label: 'PCR', labelEn: 'PCR', key: 'pcr' }, // PCR기말 → pcrEnd
      { label: 'PBR', labelEn: 'PBR', key: 'pbr' }, // PBR기말 → pbrEnd
      { label: 'EV/Sales', labelEn: 'EV/Sales', key: 'evSales' }, // EV/Sales기말 → evSalesEnd
      { label: 'EV/EBITDA', labelEn: 'EV/EBITDA', key: 'evEbitda' }, // EV/EBITDA기말 → evEbitdaEnd
    ],
  },
  {
    label: '수익성',
    labelEn: 'Profitability',
    key: 'profitability',
    metrics: [
      { label: 'ROE', labelEn: 'ROE', key: 'roe' }, // ROE → roe
      { label: 'ROA', labelEn: 'ROA', key: 'roa' }, // ROA → roa
      { label: '순이익률', labelEn: 'Net Profit Margin', key: 'npm' }, // NPM → npm
      { label: '영업이익률', labelEn: 'Operating Profit Margin', key: 'opm' }, // OPM → opm
      { label: 'EBITDA마진율', labelEn: 'EBITDA Margin', key: 'ebitdaMargin' }, // EBITDA마진율 → ebitdaMargin
    ],
  },
  {
    label: '상장성',
    labelEn: 'Listing',
    key: 'listed',
    metrics: [
      {
        label: '매출증가율',
        labelEn: 'Revenue Growth Rate',
        key: 'revenueGrowthRate',
      },
      {
        label: '영업이익증가율',
        labelEn: 'Operating Profit Growth Rate',
        key: 'operatingProfitGrowthRate',
      },
      {
        label: 'EBITDA증가율',
        labelEn: 'EBITDA Growth Rate',
        key: 'ebitdaGrowthRate',
      },
      {
        label: '순이익증가율',
        labelEn: 'Net Income Growth Rate',
        key: 'netIncomeGrowthRate',
      },
      {
        label: '영업현금흐름증가율',
        labelEn: 'CFO Growth Rate',
        key: 'cfoGrowthRate',
      },
      {
        label: '자기자본증가율',
        labelEn: 'Equity Growth Rate',
        key: 'equityGrowthRate',
      },
    ],
  },
  {
    label: '안정성',
    labelEn: 'Stability',
    key: 'stability',
    metrics: [
      {
        label: '부채비율',
        labelEn: 'Debt To Equity Ratio',
        key: 'debtToEquityRatio',
      },
      { label: '자기자본비율', labelEn: 'Equity Ratio', key: 'equityRatio' },
      { label: '순차입금비율', labelEn: 'Net Debt Ratio', key: 'netDebtRatio' },
      { label: '유동비율', labelEn: 'Current Ratio', key: 'currentRatio' },
      {
        label: '유동부채비율',
        labelEn: 'Current Liabilities Ratio',
        key: 'currentLiabilitiesRatio',
      },
    ],
  },
  {
    label: '활동성',
    labelEn: 'Activity',
    key: 'activity',
    metrics: [
      {
        label: '총자산회전율',
        labelEn: 'Total Assets Turnover',
        key: 'ttlAssetTurnover',
      },
      {
        label: '총부채회전율',
        labelEn: 'Total Liability Turnover',
        key: 'ttlLiabilityTurnover',
      },
      {
        label: '자기자본회전율',
        labelEn: 'Equity Turnover',
        key: 'equityTurnover',
      },
    ],
  },
  {
    label: '주주환원',
    labelEn: 'Shareholders Return',
    key: 'shReturn',
    metrics: [
      {
        label: '배당성향',
        labelEn: 'Dividend Payout Ratio',
        key: 'dividendPayoutRatio',
      },
    ],
  },
];

export const CHANGE_DIST_ITEMS: Item[] = [
  {
    label: '매출액 증감',
    labelEn: 'Revenue Status',
    key: 'revenue',
  },
  {
    label: '영업이익 증감',
    labelEn: 'Operating Profits Status',
    key: 'operating_profit',
  },
  {
    label: 'EBITDA 증감',
    labelEn: 'EBITDA Status',
    key: 'ebitda',
  },
  {
    label: '당기순이익 증감',
    labelEn: 'Net Income Status',
    key: 'net_income',
  },
];

export const LIST_YEAR_COLUMNS = [
  'Less than 1yr',
  '1-3yr',
  '3-5yr',
  '5-10yr',
  '10-20yr',
  '20-30yr',
  '30-40yr',
  '40-50yr',
  'More than 50yr',
];
