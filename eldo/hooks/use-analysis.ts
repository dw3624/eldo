import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import {
  fyAtom,
  emsecIdAtom,
  exchangeAtom,
  chartTypeAtom,
} from '@/lib/atoms/filter-atoms';
import { useMemo } from 'react';

type AggregateData = {
  id: number;
  emsecId: number;
  level: 'sector' | 'industry' | 'sub_industry';
  sectorId: number | null;
  industryId: number | null;
  sector: string;
  sectorEn: string;
  industry: string | null;
  industryEn: string | null;
  subIndustry: string | null;
  subIndustryEn: string | null;
  corpCount: number;
  avgPer: number | null;
  medPer: number | null;
  avgRoe: number | null;
  medRoe: number | null;
  sumMarketCap: number | null;
  sumRevenue: number | null;
};

async function fetchAnalysisData(
  fy: string,
  exchange: string,
  emsecId: string,
  chartType: string
) {
  const params = new URLSearchParams({ fy, exchange, emsecId, chartType });

  const res = await fetch(`/api/analysis?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch');

  return res.json() as Promise<AggregateData[]>;
}

export function useAnalysisData() {
  const fy = useAtomValue(fyAtom);
  const exchange = useAtomValue(exchangeAtom);
  const emsecId = useAtomValue(emsecIdAtom);
  const chartType = useAtomValue(chartTypeAtom);

  const queryKey = ['analysis', fy, exchange, emsecId, chartType];

  const {
    data: serverData,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey,
    queryFn: () => fetchAnalysisData(fy, exchange, emsecId, chartType),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  // ⭐ 필터링 - 초간단!
  const displayData = useMemo(() => {
    if (!serverData) return [];
    return serverData;
  }, [serverData]);

  const stats = useMemo(
    () => ({
      totalRecords: displayData.length || 0,
      displayRecords: displayData.length,
      totalCorps: displayData.reduce((sum, d) => sum + d.corpCount, 0),
      totalMarketCap: displayData.reduce(
        (sum, d) => sum + (d.sumMarketCap || 0),
        0
      ),
    }),
    [displayData]
  );

  return {
    data: displayData,
    isLoading,
    isFetching,
    error,
    stats,
  };
}
