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
