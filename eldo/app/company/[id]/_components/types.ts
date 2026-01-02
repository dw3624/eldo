export interface CorpDesc {
  [key: string]: string;
  emsec: string;
  corpNameEn: string;
  corpNameLocal: string;
  corpNo: string;
  corpNameListed: string;
  stockExchange: string;
  corpTicker: string;
  settlePeriod: string;
  homePage: string;
  dateFounded: string;
  dateListed: string;
  statusListing: string;
  statusDate: string;
  corpSize: string;
  groupName: string;
  corpId: string;
  bizId: string;
  ceoName: string;
  majorHolder: string;
  telNo: string;
  EmailAddr: string;
  country: string;
  region: string;
  AddrEn: string;
  AddrLocal: string;
  bizOverview: string;
  salesInfo: string;
  corpNameHistory: string;
  ceoNameHistory: string;
  cntSuspendedHistory: string;
}
export type CorpDescKey = keyof CorpDesc;

export interface StockInfo {
  [key: string]: string | number;

  // id: string;
  tradeDate: string;
  currency: string;
  // outstandingShares: number;
  tradeVolume: number;
  priceCloseAdj: number;
  priceOpenAdj: number;
  priceHighAdj: number;
  priceLowAdj: number;
  marketCapAdj: number;
  // evEnd: number;
  // perEnd: number;
  // pbrEnd: number;
  // psrEnd: number;
  // pcrEnd: number;
  // evSalesEnd: number;
  // evEbitdaEnd: number;
}

export type AnnualRow = {
  [key: string]: string | number | null;

  year: number;
  label: string; // "YYYY"
  periodStart: string | null;
  periodEnd: string | null;
  currency: string | null;

  // BS
  assetsTtl: number | null;
  assetsCurrent: number | null;
  cashTtl: number | null;
  arTtl: number | null;
  inventoryTtl: number | null;
  assetsTangibleTtl: number | null;
  assetsIntangibleTtl: number | null;
  liabilitiesTtl: number | null;
  liabilitiesCurrent: number | null;
  accountsPayableTtl: number | null;
  debtInterestTtl: number | null;
  equityTtl: number | null;
  equityCommon: number | null;
  capitalPaidIn: number | null;
  capitalPreferred: number | null;
  capitalCommon: number | null;
  rtdEarningsTtl: number | null;
  capitalSurplusTtl: number | null;
  surplusTtl: number | null;
  netBorrowing: number | null;
  nwc: number | null;

  // CF
  cfoTtl: number | null;
  depreciationTtl: number | null;
  cfiTtl: number | null;
  capex: number | null;
  cffTtl: number | null;
  dividendsTtl: number | null;

  // PL
  revenue: number | null;
  cogs: number | null;
  sgaTtl: number | null;
  operatingProfit: number | null;
  taxExpense: number | null;
  netIncome: number | null;
  netIncomeCtrl: number | null;
  ebitda: number | null;
};
export interface FinancialInfo {
  [key: string]: string | number;
  div: string;
  label: string;

  // 개요(desc)
  fiscalNo: string;
  periodStart: string;
  periodEnd: string;
  periodType: string;
  consolFlag: string;
  reportType: string;
  fiscalYear: string;
  auditOpinion: string;
  creditRating: string;
  currency: string;
  amountUnit: string;

  // 재무상태(bs)
  assetsTtl: number;
  assetsCurrent: number;
  cashTtl: number;
  arTtl: number;
  inventoryTtl: number;
  assetsTangibleTtl: number;
  assetsIntangibleTtl: number;
  liabilitiesTtl: number;
  liabilitiesCurrent: number;
  accountsPayableTtl: number;
  debtInterestTtl: number;
  equityTtl: number;
  equityCommon: number;
  capitalPaidIn: number;
  capitalPreferred: number;
  capitalCommon: number;
  rtdEarningsCtrl: number;
  rtdEarningsTtl: number;
  capitalSurplusCtrl: number;
  capitalSurplusTtl: number;
  surplusTtl: number;
  netBorrowing: number;
  nwc: number;

  // 현금흐름(cf)
  cfoTtl: number;
  depreciationTtl: number;
  cfiTtl: number;
  capex: number;
  cffTtl: number;
  dividendsCommon: number;
  dividendsPreferred: number;
  dividendsTtl: number;
  fcf: number;
  fcff: number;

  // 손익(pl)
  revenue: number;
  cogs: number;
  sgaTtl: number;
  operatingProfit: number;
  ebt: number;
  interestExpenseTtl: number;
  taxExpense: number;
  netIncome: number;
  netIncomeCtrl: number;
  ebit: number;
  ebitda: number;

  // 주식(shares)
  parValue: number;
  sharesCommon: number;
  sharesPreferred: number;
  sharesCommonAvg: number;
  sharesPreferredAvg: number;
  sharesIssued: number;
  sharesIssuedAvg: number;
  sharesTreasury: number;
}

export interface FinancialIndic {
  [key: string]: string | number;
  div: string;
  label: string;

  // 공통 메타
  fiscalNo: string;
  periodStart: string;
  periodEnd: string;
  fiscalYear: string;
  currency: string;
  amountUnit: string;

  // 시총
  marketCapEnd: number;
  marketCapOpen: number;
  marketCapHigh: number;
  marketCapLow: number;
  marketCapAvg: number;
  evEnd: number;
  evEndAvg: number;

  // PerShare
  sps: number;
  ebitdaps: number;
  eps: number;
  cfps: number;
  bps: number;

  // Multiple
  psrEnd: number;
  psrAvg: number;
  perEnd: number;
  perAvg: number;
  pcrEnd: number;
  pcrAvg: number;
  evSalesEnd: number;
  evSalesAvg: number;
  evEbitdaEnd: number;
  evEbitdaAvg: number;
  pbrEnd: number;
  pbrAvg: number;

  // 수익성
  gpm: number;
  opm: number;
  npm: number;
  ebitdaMargin: number;
  roe: number;
  roa: number;
  roic: number;
  wacc: number;

  // 성장성 - 증가율
  revenueGrowthRate: number;
  operatingProfitGrowthRate: number;
  ebitdaGrowthRate: number;
  netIncomeGrowthRate: number;
  cfoGrowthRate: number;
  equityGrowthRate: number;

  // 마진 증가율
  operatingMarginGrowthRate: number;
  ebitdaMarginGrowthRate: number;
  netMarginGrowthRate: number;

  // 증감 상태
  revenueStatus: string;
  operatingProfitStatus: string;
  ebitdaStatus: string;
  netIncomeStatus: string;

  // 패턴 3년
  revenuePattern3y: string;
  operatingProfitPattern3y: string;
  ebitdaPattern3y: string;
  netIncomePattern3y: string;

  // CAGR 3년
  revenueCagr3y: number;
  operatingProfitCagr3y: number;
  operatingMarginCagr3y: number;
  ebitdaCagr3y: number;
  ebitdaMarginCagr3y: number;
  netIncomeCagr3y: number;
  netMarginCagr3y: number;
  cfoCagr3y: number;
  equityCagr3y: number;

  // CAGR 5년
  revenueCagr5y: number;
  operatingProfitCagr5y: number;
  operatingMarginCagr5y: number;
  ebitdaCagr5y: number;
  ebitdaMarginCagr5y: number;
  netIncomeCagr5y: number;
  netMarginCagr5y: number;
  cfoCagr5y: number;
  equityCagr5y: number;

  // 안정성
  debtToEquityRatio: number;
  equityRatio: number;
  netDebtRatio: number;
  currentRatio: number;
  currentLiabilitiesRatio: number;
  capitalRetentionRatio: number;
  interestCoverageRatio: number;

  debtToEquityRatioGrowthRate: number;
  equityRatioGrowthRate: number;
  netDebtRatioGrowthRate: number;

  debtToEquityRatioCagr3y: number;
  equityRatioCagr3y: number;
  netDebtRatioCagr3y: number;

  debtToEquityRatioCagr5y: number;
  equityRatioCagr5y: number;
  netDebtRatioCagr5y: number;

  // 활동성
  ttlAssetTurnover: number;
  ttlLiabilityTurnover: number;
  equityTurnover: number;
  fixedAssetTurnover: number;
  arTurnover: number;
  inventoryTurnover: number;
  apTurnover: number;

  // 환원성
  dividendPayoutRatio: number;
}
export type FinancialIndicKey = keyof FinancialIndic;
