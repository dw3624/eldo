export type FlatNode = {
  id: string;
  label: string;
  parentId?: string | null;
};

export const marketData: FlatNode[] = [
  { id: 'us', label: '미국 전체' },
  { id: 'nyse', label: 'NYSE', parentId: 'us' },
  { id: 'nasdaq', label: 'NASDAQ', parentId: 'us' },
];

export const sectorData: FlatNode[] = [
  { id: 'sector1', label: 'sector1' },
  { id: 'industry1', label: 'industry1', parentId: 'sector1' },
  { id: 'industry2', label: 'industry2', parentId: 'sector1' },
  { id: 'sector2', label: 'sector2' },
  { id: 'industry3', label: 'industry3', parentId: 'sector2' },
];

export const listedDistData = [
  {
    sector: 'Subtotal',
    total: 7160,
    avg: 3.2,
    med: 3.0,
    ranges: [132, 276, 77, 183, 371, 398, 384, 368, 31],
  },
  {
    sector: 'Consumer Discretionary',
    total: 2401,
    avg: 3.2,
    med: 3.0,
    ranges: [27, -300, 77, 183, -24, 398, 384, 368, 31],
  },
  {
    sector: 'Consumer Staples',
    total: 2231,
    avg: 3.2,
    med: 3.0,
    ranges: [12, 20, 17, 42, 102, 91, 93, 98, -21],
  },
  {
    sector: 'Energy',
    total: 4561,
    avg: 3.2,
    med: 3.0,
    ranges: [1, 6, 5, 15, 47, -100, 38, 32, 2],
  },
  {
    sector: 'Finance and Assets',
    total: 639,
    avg: 3.2,
    med: 3.0,
    ranges: [14, 24, 28, 59, 108, 146, 116, 132, 12],
  },
  {
    sector: 'Healthcare',
    total: 894,
    avg: 3.2,
    med: 3.0,
    ranges: [20, 30, 37, 87, 176, 183, 167, 177, 17],
  },
  {
    sector: 'Industrials',
    total: 2089,
    avg: 3.2,
    med: 3.0,
    ranges: [37, 77, 76, 186, 422, 428, 425, 402, 36],
  },
  {
    sector: 'Information and Communication Technology',
    total: 1871,
    avg: 3.2,
    med: 3.0,
    ranges: [38, 73, 64, 179, 360, 391, 364, 373, 29],
  },
  {
    sector: 'Materials',
    total: 799,
    avg: 3.2,
    med: 3.0,
    ranges: [12, 34, 32, 69, 154, 157, 156, 163, 22],
  },
  {
    sector: 'Utilities',
    total: 365,
    avg: 3.2,
    med: 3.0,
    ranges: [6, 12, 13, 32, 72, 73, 68, 78, 11],
  },
];

export const listedDistColumns = [
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
