'use client';

import { useQuery } from '@tanstack/react-query';

export type FlatNode = { id: string; label: string; parentId?: string };

async function fetchEmsecTree(): Promise<FlatNode[]> {
  const res = await fetch('/api/emsec/tree', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch emsec tree');
  const json = await res.json();
  return json.data as FlatNode[];
}

export function useEmsecTree() {
  return useQuery({
    queryKey: ['emsecTree'],
    queryFn: fetchEmsecTree,
    staleTime: 60 * 60 * 1000, // 1h
  });
}
