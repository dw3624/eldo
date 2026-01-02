'use client';

import useSWR from 'swr';
import type { AnalysisSelection } from '@/lib/analysis/types';
import { buildApiUrl } from '@/lib/analysis/path';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(`Fetch failed: ${res.status} ${msg}`);
  }
  return res.json();
};

export function useAnalysisData(sel: AnalysisSelection) {
  let key: string | null = null;
  try {
    key = buildApiUrl(sel);
  } catch {
    key = null; // invalid selection (e.g., missing parentId)
  }

  return useSWR(key, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 30_000,
    keepPreviousData: true, // SWR v2
  });
}
