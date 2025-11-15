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

export type StockDataType = {
  id: string;
  tradeDate: string;
  floatingShares: number;
  tradeVolume: number;
  priceCloseAdj: number;
  priceOpenAdj: number;
  priceHighAdj: number;
  priceLowAdj: number;
  marketCapAdj: number;
  netDebt: number;
  enterpriseValue: number;
  perPrev: number;
  pbrPrev: number;
  psrPrev: number;
  pcrPrev: number;
  evSalesPrev: number;
  evEbitdaPrev: number;
};

export const generateSampleData = (): StockDataType[] => {
  const data: StockDataType[] = [];
  let basePrice = 71800;

  for (let i = 0; i < 30; i++) {
    const id = i.toString();
    const date = new Date();
    date.setDate(date.getDate() - i);
    const tradeDate = date.toISOString().split('T')[0];

    // 변동률 ±3%
    const changeRate = (Math.random() - 0.5) * 6;
    const change = Math.round(basePrice * (changeRate / 100));

    const floatingShares = Math.round(Math.random() * 20_000_000) + 5_000_000;
    const tradeVolume = Math.round(Math.random() * 20_000_000) + 5_000_000;
    const priceCloseAdj = basePrice + change;
    const priceOpenAdj =
      priceCloseAdj + Math.round((Math.random() - 0.5) * 1000);
    const priceHighAdj =
      Math.max(priceOpenAdj, priceCloseAdj) + Math.round(Math.random() * 500);
    const priceLowAdj =
      Math.min(priceOpenAdj, priceCloseAdj) - Math.round(Math.random() * 500);
    const marketCapAdj = Math.round(
      (priceCloseAdj * 5_963_876_000) / 100_000_000,
    );

    // 재무 관련 랜덤 수치 생성 (대략적인 비율)
    const netDebt = Math.round((Math.random() - 0.3) * 5_000_000_000_000); // ±5조
    const enterpriseValue = marketCapAdj * 100_000_000 + netDebt;

    const perPrev = parseFloat((Math.random() * 20 + 5).toFixed(2)); // 5~25
    const pbrPrev = parseFloat((Math.random() * 3 + 0.5).toFixed(2)); // 0.5~3.5
    const psrPrev = parseFloat((Math.random() * 5 + 0.5).toFixed(2)); // 0.5~5.5
    const pcrPrev = parseFloat((Math.random() * 10 + 2).toFixed(2)); // 2~12
    const evSalesPrev = parseFloat((Math.random() * 6 + 1).toFixed(2)); // 1~7
    const evEbitdaPrev = parseFloat((Math.random() * 12 + 4).toFixed(2)); // 4~16

    data.push({
      id,
      tradeDate,
      floatingShares,
      tradeVolume,
      priceCloseAdj,
      priceOpenAdj,
      priceHighAdj,
      priceLowAdj,
      marketCapAdj,
      netDebt,
      enterpriseValue,
      perPrev,
      pbrPrev,
      psrPrev,
      pcrPrev,
      evSalesPrev,
      evEbitdaPrev,
    });

    basePrice = priceCloseAdj;
  }

  return data;
};
