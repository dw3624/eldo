export type ChartType =
  | 'corpDist'
  | 'ratioHeatmap'
  | 'ratioScatter'
  | 'changeDist';
export type FY = 'LTM-0' | 'LTM-1' | 'LTM-2' | 'LTM-3';
export type Exchange =
  | 'krx'
  | 'kospi'
  | 'kosdaq'
  | 'kor_all'
  | 'nye'
  | 'nasdaq'
  | 'usa_all'
  | 'all';

export type Level = 'default' | 'sector' | 'industry';

export type Agg = 'med' | 'avg' | 'hrm' | 'agg';
export type Basis = 'end' | 'ltm_avg' | 'prev_day' | 'none';

export type CorpDistMetric =
  | 'corpCount'
  | 'listingAge'
  | 'marketCap'
  | 'assets'
  | 'revenue';

export type RatioMetric =
  | 'per'
  | 'psr'
  | 'pcr'
  | 'pbr'
  | 'evSales'
  | 'evEbitda'
  | 'roe'
  | 'roa'
  | 'npm'
  | 'opm'
  | 'ebitdaMargin'
  | 'revenueGrowthRate'
  | 'operatingProfitGrowthRate'
  | 'ebitdaGrowthRate'
  | 'netIncomeGrowthRate'
  | 'cfoGrowthRate'
  | 'equityGrowthRate'
  | 'debtToEquityRatio'
  | 'equityRatio'
  | 'netDebtRatio'
  | 'currentRatio'
  | 'currentLiabilitiesRatio'
  | 'ttlAssetTurnover'
  | 'equityTurnover'
  | 'dividendPayoutRatio';

export type ChangeMetric =
  | 'revenue'
  | 'operating_profit'
  | 'ebitda'
  | 'net_income';

export type CorpDistSelector = {
  chartType: 'corpDist';
  metric: CorpDistMetric;
  agg?: never;
  basis?: never;
};

export type RatioHeatmapSelector = {
  chartType: 'ratioHeatmap';
  metric: RatioMetric;
  agg: Agg;
  basis: Basis;
};
export type RatioScatterSelector = {
  chartType: 'ratioScatter';
  metric: RatioMetric;
  agg: Agg;
  basis: Basis;
};

export type ChangeSelector = {
  chartType: 'changeDist';
  metric: ChangeMetric;
  agg?: never;
  basis?: never;
};

export type Selector =
  | CorpDistSelector
  | RatioHeatmapSelector
  | RatioScatterSelector
  | ChangeSelector;

export type AnalysisSelection =
  | {
      chartType: 'corpDist';
      fy: FY;
      exchange: Exchange;
      level: Level;
      parentId?: number;
      selector: CorpDistSelector;
    }
  | {
      chartType: 'ratioHeatmap';
      fy: FY;
      exchange: Exchange;
      level: Level;
      parentId?: number;
      selector: RatioHeatmapSelector;
    }
  | {
      chartType: 'ratioScatter';
      fy: FY;
      exchange: Exchange;
      level: Level;
      parentId?: number;
      selector: RatioScatterSelector;
    }
  | {
      chartType: 'changeDist';
      fy: FY;
      exchange: Exchange;
      level: Level;
      parentId?: number;
      selector: ChangeSelector;
    };

export type Meta = {
  chartType: ChartType;
  fy: FY;
  fyBaseYear: number;
  exchange: Exchange;
  level: Level;
  emsecId: number;
  currency: string;
  generatedAt: string;
  selector: Selector;
  binEdges: number[];
};

export interface MetricSummary {
  avg: number;
  med: number;
  min: number;
  max: number;
}

type BaseRow = {
  emsecId: number;
  label: string;
  labelEn: string;
  corpCount: number;
  metric?: string;
};

export interface DataBin {
  key: string;
  val: number;
}

export interface CorpDistStatRow extends BaseRow {
  missingRatio: number;
  revenueZeroRatio: number;
  ebitdaZeroRatio: number;
  netIncomeZeroRatio: number;
  equityZeroRatio: number;
  cfoZeroRatio: number;
  missing: number;
  revenueZero: number;
  ebitdaZero: number;
}

export interface ListingAgeRow extends BaseRow {
  avgYearsSinceListing: number;
  medYearsSinceListing: number;
  bins: DataBin[];
}

export interface FinancialMetricRow extends BaseRow {
  summary: MetricSummary;
  bins: DataBin[];
}

export type CorpDistRow = CorpDistStatRow | ListingAgeRow | FinancialMetricRow;

export type CorpDist = {
  meta: Meta;
  stats: {
    rowCount: number;
    corpCountTotal: number;
  };
  rows: CorpDistRow[];
};

export interface RatioChartRow extends BaseRow {
  subtotal: number | null;
  summary?: {
    avg: number;
    hrm: number;
    med: number;
  };
  bins: DataBin[];
}

export type RatioChart = {
  meta: Meta;
  stats: {
    rowCount: number;
    corpCountTotal: number;
  };
  rows: RatioChartRow[];
};

export interface ChangeDistRow extends BaseRow {
  dist: {
    gu?: number;
    tu?: number;
    up?: number;
    ru?: number;
    uf?: number;
    ft?: number;
    df?: number;
    rd?: number;
    dn?: number;
    td?: number;
    bd?: number;
  };
}

export type ChangeDist = {
  meta: Meta;
  stats: {
    rowCount: number;
    corpCountTotal: number;
  };
  rows: ChangeDistRow[];
};
