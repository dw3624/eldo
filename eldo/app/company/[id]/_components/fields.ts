export type Locale = 'ko' | 'en';
export type FieldType = 'text' | 'date' | 'link' | 'emsec';

export type FieldDef = {
  key: string;
  label: { ko: string; en: string };
  span?: 1 | 2;
  multiline?: boolean;
  type?: FieldType;
  emptyText?: string;
  render?: (
    value: unknown,
    row: Record<string, unknown>,
    locale: Locale
  ) => React.ReactNode;
};

export const COMPANY_INFO_FIELDS: FieldDef[] = [
  { key: 'emsec', label: { ko: 'EMSEC', en: 'EMSEC' }, span: 2, type: 'emsec' },

  { key: 'dummy', label: { ko: '-', en: '-' } },
  { key: 'corpNameEn', label: { ko: '회사영문명', en: 'Company Name (EN)' } },
  {
    key: 'corpNameLocal',
    label: { ko: '회사현지명', en: 'Company Name (Local)' },
  },

  { key: 'id', label: { ko: '회사식별번호', en: 'Company ID' } },

  { key: 'corpNameListed', label: { ko: '회사공시명', en: 'Listed Name' } },
  { key: 'stockExchange', label: { ko: '거래소', en: 'Exchange' } },
  { key: 'corpTicker', label: { ko: '종목코드', en: 'Ticker' } },
  { key: 'settlePeriod', label: { ko: '결산주기', en: 'Fiscal Period' } },

  { key: 'homepage', label: { ko: '홈페이지', en: 'Website' }, type: 'link' },

  {
    key: 'dateFounded',
    label: { ko: '설립일자', en: 'Founded' },
    type: 'date',
  },
  {
    key: 'dateListed',
    label: { ko: '상장일자', en: 'Listed Date' },
    type: 'date',
  },
  { key: 'statusListing', label: { ko: '상장상태', en: 'Listing Status' } },
  {
    key: 'statusDate',
    label: { ko: '상장상태일', en: 'Status Date' },
    type: 'date',
  },

  { key: 'corpSize', label: { ko: '기업규모', en: 'Company Size' } },
  { key: 'groupName', label: { ko: '그룹계열명', en: 'Group' } },

  { key: 'corpId', label: { ko: '법인식별자', en: 'Corp Identifier' } },
  { key: 'bizId', label: { ko: '사업자식별자', en: 'Business Identifier' } },

  { key: 'ceoName', label: { ko: '대표자명', en: 'CEO' } },
  { key: 'majorHolder', label: { ko: '최대주주', en: 'Major Holder' } },

  { key: 'telNo', label: { ko: '전화번호', en: 'Phone' } },
  { key: 'emailAddr', label: { ko: '메일주소', en: 'Email' } },

  { key: 'country', label: { ko: '국가', en: 'Country' } },
  { key: 'region', label: { ko: '지역', en: 'Region' } },

  {
    key: 'addrEn',
    label: { ko: '영문주소', en: 'Address (EN)' },
    span: 2,
    multiline: true,
  },
  {
    key: 'addrLocal',
    label: { ko: '원문주소', en: 'Address (Local)' },
    span: 2,
    multiline: true,
  },

  {
    key: 'bizOverview',
    label: { ko: '사업개요', en: 'Business Overview' },
    span: 2,
    multiline: true,
  },
  {
    key: 'salesInfo',
    label: { ko: '매출관련내용', en: 'Sales Info' },
    span: 2,
    multiline: true,
  },
];

export type I18nLabel = { ko: string; en: string };

export type FinField = {
  key: string;
  label: I18nLabel;
  type?: 'text' | 'date' | 'number';
};

export type FinSection = {
  key: 'desc' | 'bs' | 'cf' | 'pl';
  label: I18nLabel;
  fields: FinField[];
};

export const FINANCIAL_INFO_FIELDS: FinSection[] = [
  {
    key: 'desc',
    label: { ko: '개요', en: 'Overview' },
    fields: [
      {
        key: 'periodStart',
        label: { ko: '기간 시작', en: 'Period Start' },
        type: 'date',
      },
      {
        key: 'periodEnd',
        label: { ko: '기간 종료', en: 'Period End' },
        type: 'date',
      },
      {
        key: 'year',
        label: { ko: '사업 연도', en: 'Fiscal Year' },
        type: 'date',
      },
      { key: 'currency', label: { ko: '통화', en: 'Currency' }, type: 'text' },
    ],
  },

  {
    key: 'bs',
    label: { ko: '재무상태', en: 'Balance Sheet' },
    fields: [
      {
        key: 'assetsTtl',
        label: { ko: '자산총계', en: 'Total Assets' },
        type: 'number',
      },
      {
        key: 'assetsCurrent',
        label: { ko: '유동자산', en: 'Current Assets' },
        type: 'number',
      },
      {
        key: 'cashTtl',
        label: { ko: '현금성자산', en: 'Cash & Equivalents' },
        type: 'number',
      },
      {
        key: 'arTtl',
        label: { ko: '매출채권', en: 'Accounts Receivable' },
        type: 'number',
      },
      {
        key: 'inventoryTtl',
        label: { ko: '재고자산', en: 'Inventory' },
        type: 'number',
      },
      {
        key: 'assetsTangibleTtl',
        label: { ko: '유형자산', en: 'Tangible Assets' },
        type: 'number',
      },
      {
        key: 'assetsIntangibleTtl',
        label: { ko: '무형자산', en: 'Intangible Assets' },
        type: 'number',
      },

      {
        key: 'liabilitiesTtl',
        label: { ko: '부채총계', en: 'Total Liabilities' },
        type: 'number',
      },
      {
        key: 'liabilitiesCurrent',
        label: { ko: '유동부채', en: 'Current Liabilities' },
        type: 'number',
      },
      {
        key: 'accountsPayableTtl',
        label: { ko: '매입채무', en: 'Accounts Payable' },
        type: 'number',
      },
      {
        key: 'debtInterestTtl',
        label: { ko: '이자발생부채', en: 'Interest-Bearing Debt' },
        type: 'number',
      },

      {
        key: 'equityTtl',
        label: { ko: '자본총계', en: 'Total Equity' },
        type: 'number',
      },
      {
        key: 'equityCommon',
        label: { ko: '자기자본', en: 'Common Equity' },
        type: 'number',
      },
      {
        key: 'capitalPaidIn',
        label: { ko: '자본금', en: 'Paid-in Capital' },
        type: 'number',
      },
      {
        key: 'capitalPreferred',
        label: { ko: '우선주자본금', en: 'Preferred Capital' },
        type: 'number',
      },
      {
        key: 'capitalCommon',
        label: { ko: '보통주자본금', en: 'Common Capital' },
        type: 'number',
      },

      {
        key: 'rtdEarningsTtl',
        label: { ko: '이익잉여금', en: 'Retained Earnings' },
        type: 'number',
      },
      {
        key: 'capitalSurplusTtl',
        label: { ko: '자본잉여금', en: 'Capital Surplus' },
        type: 'number',
      },
      {
        key: 'surplusTtl',
        label: { ko: '잉여금', en: 'Surplus' },
        type: 'number',
      },

      {
        key: 'netBorrowing',
        label: { ko: '순차입금', en: 'Net Borrowing' },
        type: 'number',
      },
      {
        key: 'nwc',
        label: { ko: '순운전자본', en: 'Net Working Capital' },
        type: 'number',
      },
    ],
  },

  {
    key: 'cf',
    label: { ko: '현금흐름', en: 'Cash Flow' },
    fields: [
      {
        key: 'cfoTtl',
        label: { ko: '영업현금흐름', en: 'Operating Cash Flow' },
        type: 'number',
      },
      {
        key: 'depreciationTtl',
        label: { ko: '감가상각', en: 'Depreciation' },
        type: 'number',
      },
      {
        key: 'cfiTtl',
        label: { ko: '투자현금흐름', en: 'Investing Cash Flow' },
        type: 'number',
      },
      {
        key: 'capex',
        label: { ko: '자본적지출', en: 'CapEx' },
        type: 'number',
      },
      {
        key: 'cffTtl',
        label: { ko: '재무현금흐름', en: 'Financing Cash Flow' },
        type: 'number',
      },
      {
        key: 'dividendsTtl',
        label: { ko: '배당금', en: 'Dividends' },
        type: 'number',
      },
    ],
  },

  {
    key: 'pl',
    label: { ko: '손익계산', en: 'Profit & Loss' },
    fields: [
      {
        key: 'revenue',
        label: { ko: '매출액', en: 'Revenue' },
        type: 'number',
      },
      { key: 'cogs', label: { ko: '매출원가', en: 'COGS' }, type: 'number' },
      { key: 'sgaTtl', label: { ko: '판관비', en: 'SG&A' }, type: 'number' },
      {
        key: 'operatingProfit',
        label: { ko: '영업이익', en: 'Operating Profit' },
        type: 'number',
      },
      {
        key: 'taxExpense',
        label: { ko: '법인세비용', en: 'Tax Expense' },
        type: 'number',
      },
      {
        key: 'netIncome',
        label: { ko: '당기순이익', en: 'Net Income' },
        type: 'number',
      },
      {
        key: 'netIncomeCtrl',
        label: { ko: '당기순이익(지배)', en: 'Net Income (Controlling)' },
        type: 'number',
      },
      { key: 'ebitda', label: { ko: 'EBITDA', en: 'EBITDA' }, type: 'number' },
    ],
  },
];

export type IndicField = {
  key: string;
  label: I18nLabel;
  type?: 'text' | 'date' | 'number' | 'percent';
};

export type IndicSection = {
  key:
    | 'desc'
    | 'mktcap'
    | 'perShare'
    | 'multiple'
    | 'profitability'
    | 'growth'
    | 'stability'
    | 'activity'
    | 'return';
  label: I18nLabel;
  fields: IndicField[];
};

export const FINANCIAL_INDIC_FIELDS: IndicSection[] = [
  {
    key: 'desc',
    label: { ko: '개요', en: 'Overview' },
    // Indicators에 기간 필드가 없어서, DTO에서 join해서 내려줄 걸 전제로 합니다.
    fields: [
      {
        key: 'periodStart',
        label: { ko: '기간 시작', en: 'Period Start' },
        type: 'date',
      },
      {
        key: 'periodEnd',
        label: { ko: '기간 종료', en: 'Period End' },
        type: 'date',
      },
      {
        key: 'year',
        label: { ko: '사업 연도', en: 'Fiscal Year' },
        type: 'date',
      },
      { key: 'currency', label: { ko: '통화', en: 'Currency' }, type: 'text' },
    ],
  },

  {
    key: 'mktcap',
    label: { ko: '시총', en: 'Market Cap & EV' },
    fields: [
      {
        key: 'marketCapEnd',
        label: { ko: '시가총액(기말)', en: 'Market Cap (End)' },
        type: 'number',
      },
      {
        key: 'marketCapOpen',
        label: { ko: '시가총액(시가)', en: 'Market Cap (Open)' },
        type: 'number',
      },
      {
        key: 'marketCapHigh',
        label: { ko: '시가총액(고가)', en: 'Market Cap (High)' },
        type: 'number',
      },
      {
        key: 'marketCapLow',
        label: { ko: '시가총액(저가)', en: 'Market Cap (Low)' },
        type: 'number',
      },
      {
        key: 'marketCapAvg',
        label: { ko: '시가총액(평균)', en: 'Market Cap (Avg)' },
        type: 'number',
      },
      {
        key: 'evEnd',
        label: { ko: 'EV(기말)', en: 'EV (End)' },
        type: 'number',
      },
      {
        key: 'evEndAvg',
        label: { ko: 'EV(기말평균)', en: 'EV (End Avg)' },
        type: 'number',
      },
      {
        key: 'evPrev',
        label: { ko: 'EV(전일)', en: 'EV (Prev Day)' },
        type: 'number',
      },
    ],
  },

  {
    key: 'perShare',
    label: { ko: '주당지표', en: 'Per Share' },
    fields: [
      { key: 'sps', label: { ko: 'SPS', en: 'SPS' }, type: 'number' },
      {
        key: 'ebitdaps',
        label: { ko: 'EBITDAPS', en: 'EBITDAPS' },
        type: 'number',
      },
      { key: 'eps', label: { ko: 'EPS', en: 'EPS' }, type: 'number' },
      { key: 'cfps', label: { ko: 'CFPS', en: 'CFPS' }, type: 'number' },
      { key: 'bps', label: { ko: 'BPS', en: 'BPS' }, type: 'number' },
    ],
  },

  {
    key: 'multiple',
    label: { ko: '멀티플', en: 'Multiples' },
    fields: [
      {
        key: 'psrEnd',
        label: { ko: 'PSR(기말)', en: 'PSR (End)' },
        type: 'number',
      },
      {
        key: 'psrAvg',
        label: { ko: 'PSR(평균)', en: 'PSR (Avg)' },
        type: 'number',
      },
      {
        key: 'psrPrev',
        label: { ko: 'PSR(전일)', en: 'PSR (Prev)' },
        type: 'number',
      },

      {
        key: 'perEnd',
        label: { ko: 'PER(기말)', en: 'PER (End)' },
        type: 'number',
      },
      {
        key: 'perAvg',
        label: { ko: 'PER(평균)', en: 'PER (Avg)' },
        type: 'number',
      },
      {
        key: 'perPrev',
        label: { ko: 'PER(전일)', en: 'PER (Prev)' },
        type: 'number',
      },

      {
        key: 'pcrEnd',
        label: { ko: 'PCR(기말)', en: 'PCR (End)' },
        type: 'number',
      },
      {
        key: 'pcrAvg',
        label: { ko: 'PCR(평균)', en: 'PCR (Avg)' },
        type: 'number',
      },
      {
        key: 'pcrPrev',
        label: { ko: 'PCR(전일)', en: 'PCR (Prev)' },
        type: 'number',
      },

      {
        key: 'pbrEnd',
        label: { ko: 'PBR(기말)', en: 'PBR (End)' },
        type: 'number',
      },
      {
        key: 'pbrAvg',
        label: { ko: 'PBR(평균)', en: 'PBR (Avg)' },
        type: 'number',
      },
      {
        key: 'pbrPrev',
        label: { ko: 'PBR(전일)', en: 'PBR (Prev)' },
        type: 'number',
      },

      {
        key: 'evSalesEnd',
        label: { ko: 'EV/Sales(기말)', en: 'EV/Sales (End)' },
        type: 'number',
      },
      {
        key: 'evSalesAvg',
        label: { ko: 'EV/Sales(평균)', en: 'EV/Sales (Avg)' },
        type: 'number',
      },
      {
        key: 'evSalesPrev',
        label: { ko: 'EV/Sales(전일)', en: 'EV/Sales (Prev)' },
        type: 'number',
      },

      {
        key: 'evEbitdaEnd',
        label: { ko: 'EV/EBITDA(기말)', en: 'EV/EBITDA (End)' },
        type: 'number',
      },
      {
        key: 'evEbitdaAvg',
        label: { ko: 'EV/EBITDA(평균)', en: 'EV/EBITDA (Avg)' },
        type: 'number',
      },
      {
        key: 'evEbitdaPrev',
        label: { ko: 'EV/EBITDA(전일)', en: 'EV/EBITDA (Prev)' },
        type: 'number',
      },
    ],
  },

  {
    key: 'profitability',
    label: { ko: '수익성', en: 'Profitability' },
    fields: [
      {
        key: 'gpm',
        label: { ko: '매출총이익률', en: 'Gross Margin' },
        type: 'percent',
      },
      {
        key: 'opm',
        label: { ko: '영업이익률', en: 'Operating Margin' },
        type: 'percent',
      },
      {
        key: 'npm',
        label: { ko: '순이익률', en: 'Net Margin' },
        type: 'percent',
      },
      {
        key: 'ebitdaMargin',
        label: { ko: 'EBITDA 마진', en: 'EBITDA Margin' },
        type: 'percent',
      },
      { key: 'roe', label: { ko: 'ROE', en: 'ROE' }, type: 'percent' },
      { key: 'roa', label: { ko: 'ROA', en: 'ROA' }, type: 'percent' },
      { key: 'roic', label: { ko: 'ROIC', en: 'ROIC' }, type: 'percent' },
      { key: 'wacc', label: { ko: 'WACC', en: 'WACC' }, type: 'percent' },
    ],
  },

  {
    key: 'growth',
    label: { ko: '성장성', en: 'Growth' },
    fields: [
      {
        key: 'revenueGrowthRate',
        label: { ko: '매출증가율', en: 'Revenue Growth' },
        type: 'percent',
      },
      {
        key: 'operatingProfitGrowthRate',
        label: { ko: '영업이익증가율', en: 'Operating Profit Growth' },
        type: 'percent',
      },
      {
        key: 'ebitdaGrowthRate',
        label: { ko: 'EBITDA 증가율', en: 'EBITDA Growth' },
        type: 'percent',
      },
      {
        key: 'netIncomeGrowthRate',
        label: { ko: '순이익증가율', en: 'Net Income Growth' },
        type: 'percent',
      },
      {
        key: 'cfoGrowthRate',
        label: { ko: '영업현금흐름증가율', en: 'CFO Growth' },
        type: 'percent',
      },
      {
        key: 'equityGrowthRate',
        label: { ko: '자기자본증가율', en: 'Equity Growth' },
        type: 'percent',
      },

      {
        key: 'operatingMarginGrowthRate',
        label: { ko: '영업이익률증가율', en: 'Operating Margin Growth' },
        type: 'percent',
      },
      {
        key: 'ebitdaMarginGrowthRate',
        label: { ko: 'EBITDA마진율증가율', en: 'EBITDA Margin Growth' },
        type: 'percent',
      },
      {
        key: 'netMarginGrowthRate',
        label: { ko: '순이익률증가율', en: 'Net Margin Growth' },
        type: 'percent',
      },

      {
        key: 'revenueStatus',
        label: { ko: '매출 증감상태', en: 'Revenue Status' },
        type: 'text',
      },
      {
        key: 'operatingProfitStatus',
        label: { ko: '영업이익 증감상태', en: 'Op Profit Status' },
        type: 'text',
      },
      {
        key: 'ebitdaStatus',
        label: { ko: 'EBITDA 증감상태', en: 'EBITDA Status' },
        type: 'text',
      },
      {
        key: 'netIncomeStatus',
        label: { ko: '순이익 증감상태', en: 'Net Income Status' },
        type: 'text',
      },

      // DB 필드명은 revenuePattern_3y 등입니다.
      {
        key: 'revenuePattern_3y',
        label: { ko: '매출 증감패턴(3년)', en: 'Revenue Pattern (3Y)' },
        type: 'text',
      },
      {
        key: 'operatingProfitPattern_3y',
        label: { ko: '영업이익 증감패턴(3년)', en: 'Op Profit Pattern (3Y)' },
        type: 'text',
      },
      {
        key: 'ebitdaPattern_3y',
        label: { ko: 'EBITDA 증감패턴(3년)', en: 'EBITDA Pattern (3Y)' },
        type: 'text',
      },
      {
        key: 'netIncomePattern_3y',
        label: { ko: '순이익 증감패턴(3년)', en: 'Net Income Pattern (3Y)' },
        type: 'text',
      },

      {
        key: 'revenueCagr_3y',
        label: { ko: '매출 CAGR(3년)', en: 'Revenue CAGR (3Y)' },
        type: 'percent',
      },
      {
        key: 'operatingProfitCagr_3y',
        label: { ko: '영업이익 CAGR(3년)', en: 'Op Profit CAGR (3Y)' },
        type: 'percent',
      },
      {
        key: 'operatingMarginCagr_3y',
        label: { ko: '영업이익률 CAGR(3년)', en: 'Op Margin CAGR (3Y)' },
        type: 'percent',
      },
      {
        key: 'ebitdaCagr_3y',
        label: { ko: 'EBITDA CAGR(3년)', en: 'EBITDA CAGR (3Y)' },
        type: 'percent',
      },
      {
        key: 'ebitdaMarginCagr_3y',
        label: { ko: 'EBITDA마진 CAGR(3년)', en: 'EBITDA Margin CAGR (3Y)' },
        type: 'percent',
      },
      {
        key: 'netIncomeCagr_3y',
        label: { ko: '순이익 CAGR(3년)', en: 'Net Income CAGR (3Y)' },
        type: 'percent',
      },
      {
        key: 'netMarginCagr_3y',
        label: { ko: '순이익률 CAGR(3년)', en: 'Net Margin CAGR (3Y)' },
        type: 'percent',
      },
      {
        key: 'cfoCagr_3y',
        label: { ko: 'CFO CAGR(3년)', en: 'CFO CAGR (3Y)' },
        type: 'percent',
      },
      {
        key: 'equityCagr_3y',
        label: { ko: '자기자본 CAGR(3년)', en: 'Equity CAGR (3Y)' },
        type: 'percent',
      },

      {
        key: 'revenueCagr_5y',
        label: { ko: '매출 CAGR(5년)', en: 'Revenue CAGR (5Y)' },
        type: 'percent',
      },
      {
        key: 'operatingProfitCagr_5y',
        label: { ko: '영업이익 CAGR(5년)', en: 'Op Profit CAGR (5Y)' },
        type: 'percent',
      },
      {
        key: 'operatingMarginCagr_5y',
        label: { ko: '영업이익률 CAGR(5년)', en: 'Op Margin CAGR (5Y)' },
        type: 'percent',
      },
      {
        key: 'ebitdaCagr_5y',
        label: { ko: 'EBITDA CAGR(5년)', en: 'EBITDA CAGR (5Y)' },
        type: 'percent',
      },
      {
        key: 'ebitdaMarginCagr_5y',
        label: { ko: 'EBITDA마진 CAGR(5년)', en: 'EBITDA Margin CAGR (5Y)' },
        type: 'percent',
      },
      {
        key: 'netIncomeCagr_5y',
        label: { ko: '순이익 CAGR(5년)', en: 'Net Income CAGR (5Y)' },
        type: 'percent',
      },
      {
        key: 'netMarginCagr_5y',
        label: { ko: '순이익률 CAGR(5년)', en: 'Net Margin CAGR (5Y)' },
        type: 'percent',
      },
      {
        key: 'cfoCagr_5y',
        label: { ko: 'CFO CAGR(5년)', en: 'CFO CAGR (5Y)' },
        type: 'percent',
      },
      {
        key: 'equityCagr_5y',
        label: { ko: '자기자본 CAGR(5년)', en: 'Equity CAGR (5Y)' },
        type: 'percent',
      },
    ],
  },

  {
    key: 'stability',
    label: { ko: '안정성', en: 'Stability' },
    fields: [
      {
        key: 'debtToEquityRatio',
        label: { ko: '부채비율', en: 'Debt/Equity' },
        type: 'percent',
      },
      {
        key: 'equityRatio',
        label: { ko: '자기자본비율', en: 'Equity Ratio' },
        type: 'percent',
      },
      {
        key: 'netDebtRatio',
        label: { ko: '순차입금비율', en: 'Net Debt Ratio' },
        type: 'percent',
      },
      {
        key: 'currentRatio',
        label: { ko: '유동비율', en: 'Current Ratio' },
        type: 'percent',
      },
      {
        key: 'currentLiabilitiesRatio',
        label: { ko: '유동부채비율', en: 'Current Liabilities Ratio' },
        type: 'percent',
      },
      {
        key: 'capitalRetentionRatio',
        label: { ko: '자본유보율', en: 'Capital Retention Ratio' },
        type: 'percent',
      },
      {
        key: 'interestCoverageRatio',
        label: { ko: '이자보상배율', en: 'Interest Coverage' },
        type: 'number',
      },

      {
        key: 'debtToEquityRatioGrowthRate',
        label: { ko: '부채비율 증가율', en: 'Debt/Equity Growth' },
        type: 'percent',
      },
      {
        key: 'equityRatioGrowthRate',
        label: { ko: '자기자본비율 증가율', en: 'Equity Ratio Growth' },
        type: 'percent',
      },
      {
        key: 'netDebtRatioGrowthRate',
        label: { ko: '순차입금비율 증가율', en: 'Net Debt Ratio Growth' },
        type: 'percent',
      },

      {
        key: 'debtToEquityRatioCagr_3y',
        label: { ko: '부채비율 CAGR(3년)', en: 'Debt/Equity CAGR (3Y)' },
        type: 'percent',
      },
      {
        key: 'equityRatioCagr_3y',
        label: { ko: '자기자본비율 CAGR(3년)', en: 'Equity Ratio CAGR (3Y)' },
        type: 'percent',
      },
      {
        key: 'netDebtRatioCagr_3y',
        label: { ko: '순차입금비율 CAGR(3년)', en: 'Net Debt Ratio CAGR (3Y)' },
        type: 'percent',
      },

      {
        key: 'debtToEquityRatioCagr_5y',
        label: { ko: '부채비율 CAGR(5년)', en: 'Debt/Equity CAGR (5Y)' },
        type: 'percent',
      },
      {
        key: 'equityRatioCagr_5y',
        label: { ko: '자기자본비율 CAGR(5년)', en: 'Equity Ratio CAGR (5Y)' },
        type: 'percent',
      },
      {
        key: 'netDebtRatioCagr_5y',
        label: { ko: '순차입금비율 CAGR(5년)', en: 'Net Debt Ratio CAGR (5Y)' },
        type: 'percent',
      },
    ],
  },

  {
    key: 'activity',
    label: { ko: '활동성', en: 'Activity' },
    fields: [
      {
        key: 'ttlAssetTurnover',
        label: { ko: '총자산회전율', en: 'Total Asset Turnover' },
        type: 'number',
      },
      {
        key: 'ttlLiabilityTurnover',
        label: { ko: '총부채회전율', en: 'Total Liability Turnover' },
        type: 'number',
      },
      {
        key: 'equityTurnover',
        label: { ko: '자기자본회전율', en: 'Equity Turnover' },
        type: 'number',
      },
      {
        key: 'fixedAssetTurnover',
        label: { ko: '유형자산회전율', en: 'Fixed Asset Turnover' },
        type: 'number',
      },
      {
        key: 'arTurnover',
        label: { ko: '매출채권회전율', en: 'A/R Turnover' },
        type: 'number',
      },
      {
        key: 'inventoryTurnover',
        label: { ko: '재고자산회전율', en: 'Inventory Turnover' },
        type: 'number',
      },
      {
        key: 'apTurnover',
        label: { ko: '매입채무회전율', en: 'A/P Turnover' },
        type: 'number',
      },
    ],
  },

  {
    key: 'return',
    label: { ko: '환원성', en: 'Return' },
    fields: [
      {
        key: 'dividendPayoutRatio',
        label: { ko: '배당성향', en: 'Dividend Payout Ratio' },
        type: 'percent',
      },
    ],
  },
];
