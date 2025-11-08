export const TOC_CONTENTS = [
  { id: 'company-desc', title: '기업개황' },
  { id: 'stock-info', title: '주가정보' },
  { id: 'fin-info', title: '재무정보' },
  { id: 'fin-indic', title: '재무지표' },
];

export const COMPANY_INFO_FIELDS = [
  { key: 'emsec', label: 'EMSEC', span: 2 },
  { key: 'companyName', label: '회사영문명' },
  { key: 'companyNameKo', label: '회사현지명' },
  { key: 'companyCategory', label: '회사식별번호' },
  { key: 'companyNameJa', label: '회사공시명' },
  { key: 'gics', label: '거래소' },
  { key: 'bloombergCode', label: '종목코드' },
  { key: 'currency', label: '결산주기' },
  { key: 'currencyCode', label: '홈페이지' },
  { key: 'fiscalMonth', label: '설립일자' },
  { key: 'fiscalMonthCode', label: '상장일자' },
  { key: 'companyType', label: '상장상태' },
  { key: 'companyTypeDate', label: '상장폐지일자' },
  { key: 'companyCode', label: '기업규모' },
  { key: 'stockCode', label: '그룹계열명' },
  { key: 'industryCategory', label: '법인식별자' },
  { key: 'industryCategoryCode', label: '그룹계열명' },
  { key: 'representative', label: '대표자명' },
  { key: 'representativeCode', label: '최대주주' },
  { key: 'mainBusiness', label: '전화번호' },
  { key: 'mainBusinessCode', label: '메일주소' },
  { key: 'country', label: '국가' },
  { key: 'countryRegion', label: '지역' },
  { key: 'operatingIncome', label: '영문주소', span: 2 },
  { key: 'operatingIncomeCode', label: '원문주소', span: 2 },
  { key: 'companyIntro', label: '사업개요', span: 2, multiline: true },
  { key: 'mainProducts', label: '메출관매내용', span: 2, multiline: true },
  { key: 'domesticSales', label: '결사업경결내역', span: 2, multiline: true },
  { key: 'exportSales', label: '메출지영경결내역', span: 2, multiline: true },
  { key: 'businessSummary', label: '거래증권·미래', span: 2, multiline: true },
];

export const STOCK_INFO_FIELDS = [
  { key: '1', label: '유동주식수' },
  { key: 'volume', label: '거래량' },
  { key: '3', label: '수정종가' },
  { key: '4', label: '수정시가' },
  { key: '5', label: '수정고가' },
  { key: '6', label: '수정저가' },
  { key: '7', label: '수정시가총액' },
  { key: '8', label: '순차입금' },
  { key: 'ev', label: 'EV' },
  { key: 'per', label: 'PER' },
  { key: 'pbr', label: 'PBR' },
  { key: 'psr', label: 'PSR' },
  { key: 'pcr', label: 'PCR' },
  { key: 'ev-sales', label: 'EV/Sales' },
  { key: 'ev-ebitda', label: 'EV/EBITDA' },
];

export const FINANCIAL_INFO_FIELDS = [
  {
    key: 'desc',
    label: '개요',
    fields: [
      { key: '1', label: '개요' },
      { key: '2', label: '개요' },
      { key: '3', label: '개요' },
    ],
  },
  {
    key: 'bs',
    label: '재무상태',
    fields: [
      { key: 'desc4', label: '개요' },
      { key: 'desc5', label: '개요' },
    ],
  },
  {
    key: 'cf',
    label: '현금흐름',
    fields: [
      { key: 'desc6', label: '개요' },
      { key: 'desc7', label: '개요' },
    ],
  },
  {
    key: 'is',
    label: '손익계산',
    fields: [
      { key: 'desc8', label: '개요' },
      { key: 'desc9', label: '개요' },
    ],
  },
  {
    key: 'se',
    label: '자본변동',
    fields: [
      { key: 'desc10', label: '개요' },
      { key: 'desc11', label: '개요' },
    ],
  },
];
