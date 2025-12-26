import { useQuery } from '@tanstack/react-query';

type EmsecTreeNode = {
  id: string;
  dbId: number;
  label: string;
  level: string;
  parentId: string | null;
  children?: EmsecTreeNode[];
};

async function fetchEmsecTree() {
  const res = await fetch('/api/emsec/sector-tree');
  if (!res.ok) throw new Error('Failed to fetch emsec tree');
  return res.json() as Promise<EmsecTreeNode[]>;
}

export function useEmsecTree() {
  return useQuery({
    queryKey: ['emsec', 'tree'],
    queryFn: fetchEmsecTree,
    staleTime: 10 * 60 * 1000, // 10분간 fresh (자주 안 바뀜)
    gcTime: 30 * 60 * 1000, // 30분간 캐시
  });
}
