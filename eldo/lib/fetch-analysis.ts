// lib/fetchAnalysis.ts
type Params = {
  chartType: string;
  fy: string;
  exchange: string;
  level: string;
  metric: string;
  agg?: string;
  basis?: string;
};

export async function fetchAnalysis(params: Params) {
  const sp = new URLSearchParams({
    chartType: params.chartType,
    fy: params.fy,
    exchange: params.exchange,
    level: params.level,
    metric: params.metric,
    agg: params.agg ?? 'none',
    basis: params.basis ?? 'none',
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/analysis?${sp}`,
    {
      // Next 서버 캐시 (원하면 조정)
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }
  return res.json();
}
