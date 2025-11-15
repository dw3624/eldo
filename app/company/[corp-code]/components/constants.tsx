export const TOC_CONTENTS = [
  { id: 'company-desc', title: '기업개황' },
  { id: 'stock-info', title: '주가정보' },
  { id: 'fin-info', title: '재무정보' },
  { id: 'fin-indic', title: '재무지표' },
];

export const COMPANY_INFO_FIELDS = [
  { key: 'emsec', label: 'EMSEC', span: 2 },
  { key: 'corpNameEn', label: '회사영문명' },
  { key: 'corpNameLocal', label: '회사현지명' },
  { key: 'corpNo', label: '회사식별번호' },
  { key: 'corpNameListed', label: '회사공시명' },
  { key: 'stockExchange', label: '거래소' },
  { key: 'corpTicker', label: '종목코드' },
  { key: 'settlePeriod', label: '결산주기' },
  { key: 'homePage', label: '홈페이지' },
  { key: 'dateFounded', label: '설립일자' },
  { key: 'dateListed', label: '상장일자' },
  { key: 'statusListing', label: '상장상태' },
  { key: 'statusDate', label: '상장폐지일자' },
  { key: 'corpSize', label: '기업규모' },
  { key: 'groupName', label: '그룹계열명' },
  { key: 'corpId', label: '법인식별자' },
  { key: 'bizId', label: '사업자식별자' },
  { key: 'ceoName', label: '대표자명' },
  { key: 'majorHolder', label: '최대주주' },
  { key: 'telNo', label: '전화번호' },
  { key: 'EmailAddr', label: '메일주소' },
  { key: 'country', label: '국가' },
  { key: 'region', label: '지역' },
  { key: 'AddrEn', label: '영문주소', span: 2 },
  { key: 'AddrLocal', label: '원문주소', span: 2 },
  { key: 'bizOverview', label: '사업개요', span: 2, multiline: true },
  { key: 'salesInfo', label: '메출관련내용', span: 2, multiline: true },
  {
    key: 'corpNameHistory',
    label: '회사이름변경내역',
    span: 2,
    multiline: true,
  },
  {
    key: 'ceoNameHistory',
    label: '대표자명변경내역',
    span: 2,
    multiline: true,
  },
  {
    key: 'cntSuspendedHistory',
    label: '거래중지 이력',
    span: 2,
    multiline: true,
  },
];

export const STOCK_INFO_FIELDS = [
  {
    key: 'tradeDate',
    label: '거래일자',
    width: 100,
    fixed: true,
    align: 'center',
  },
  { key: 'floatingShares', label: '유동주식수', width: 100, align: 'right' },
  { key: 'tradeVolume', label: '거래량(주)', width: 100, align: 'right' },
  {
    key: 'priceCloseAdj',
    label: '수정종가',
    width: 100,
    align: 'right',
    highlight: true,
  },
  { key: 'priceOpenAdj', label: '수정시가', width: 100, align: 'right' },
  { key: 'priceHighAdj', label: '수정고가', width: 100, align: 'right' },
  { key: 'priceLowAdj', label: '수정저가', width: 100, align: 'right' },
  { key: 'marketCapAdj', label: '수정시가총액', width: 100, align: 'right' },
  { key: 'netDebt', label: '순차입금', width: 100, align: 'right' },
  { key: 'enterpriseValue', label: 'EV', width: 100, align: 'right' },
  { key: 'perPrev', label: 'PER', width: 100, align: 'right' },
  { key: 'pbrPrev', label: 'PBR', width: 100, align: 'right' },
  { key: 'psrPrev', label: 'PSR', width: 100, align: 'right' },
  { key: 'pcrPrev', label: 'PCR', width: 100, align: 'right' },
  { key: 'evSalesPrev', label: 'EV/Sales', width: 100, align: 'right' },
  { key: 'evEbitdaPrev', label: 'EV/EBITDA', width: 100, align: 'right' },
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
