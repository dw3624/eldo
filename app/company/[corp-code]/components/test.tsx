export const stockData = [
  {
    date: '2015-10-21 (화)',
    per: 3,
  },
  {
    date: '2015-10-21 (화)',
    per: 3,
  },
  {
    date: '2015-10-21 (화)',
    per: 3,
  },
  {
    date: '2015-10-21 (화)',
    per: 3,
  },
  {
    date: '2015-10-21 (화)',
    per: 3,
  },
  {
    date: '2015-10-21 (화)',
    per: 3,
  },
  {
    date: '2015-10-21 (화)',
    per: 3,
  },
];

export const PRICE_COLUMNS = [
  { key: 'date', label: '일자', width: 100, fixed: true, align: 'center' },
  { key: 'close', label: '종가', width: 100, align: 'right', highlight: true },
  { key: 'change', label: '전일비', width: 100, align: 'right' },
  { key: 'changeRate', label: '등락률', width: 100, align: 'right' },
  { key: 'open', label: '시가', width: 100, align: 'right' },
  { key: 'high', label: '고가', width: 100, align: 'right' },
  { key: 'low', label: '저가', width: 100, align: 'right' },
  { key: 'volume', label: '거래량', width: 120, align: 'right' },
  { key: 'tradingValue', label: '거래대금(백만)', width: 140, align: 'right' },
  { key: 'marketCap', label: '시가총액(억)', width: 140, align: 'right' },
  { key: 'sharesOutstanding', label: '상장주식수', width: 120, align: 'right' },
  { key: 'foreignOwnership', label: '외국인보유', width: 120, align: 'right' },
  {
    key: 'foreignOwnershipRate',
    label: '외국인비율',
    width: 120,
    align: 'right',
  },
] as const;

export type StockDataType = {
  id: string;
  date: string;
  close: number;
  change: number;
  changeRate: string;
  open: number;
  high: number;
  low: number;
  volume: number;
  tradingValue: number;
  marketCap: number;
  sharesOutstanding: string;
  foreignOwnership: number;
  foreignOwnershipRate: string;
};

export const generateSampleData = () => {
  const data = [];
  let basePrice = 71800;

  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const changeRate = (Math.random() - 0.5) * 6; // -3% ~ +3%
    const change = Math.round(basePrice * (changeRate / 100));
    const close = basePrice + change;
    const open = close + Math.round((Math.random() - 0.5) * 1000);
    const high = Math.max(open, close) + Math.round(Math.random() * 500);
    const low = Math.min(open, close) - Math.round(Math.random() * 500);
    const volume = Math.round(Math.random() * 20000000) + 5000000;
    const tradingValue = Math.round((close * volume) / 1000000);
    const marketCap = Math.round((close * 5963876000) / 100000000);
    const foreignOwnership = Math.round(volume * (0.4 + Math.random() * 0.2));
    const foreignOwnershipRate = (51.5 + (Math.random() - 0.5) * 2).toFixed(2);

    data.push({
      id: i.toString(),
      date: date.toISOString().split('T')[0],
      close,
      change,
      changeRate: changeRate.toFixed(2),
      open,
      high,
      low,
      volume,
      tradingValue,
      marketCap,
      sharesOutstanding: '5,963,876,000',
      foreignOwnership,
      foreignOwnershipRate: `${foreignOwnershipRate}%`,
    });

    basePrice = close;
  }

  return data;
};
