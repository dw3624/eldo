/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useEmsecTree } from './use-emsec-tree';

type FlatNode = { id: string; label: string; parentId?: string };

function buildMaps(nodes: FlatNode[]) {
  const byId = new Map<string, FlatNode>();
  for (const n of nodes) byId.set(n.id, n);
  return byId;
}

function buildPathLabel(byId: Map<string, FlatNode>, leafId: string) {
  const labels: string[] = [];
  let cur: FlatNode | undefined = byId.get(leafId);
  while (cur) {
    labels.push(cur.label);
    if (!cur.parentId) break;
    cur = byId.get(cur.parentId);
  }
  // leaf -> ... -> root 이므로 뒤집기
  return labels.reverse().join(' > ');
}

const PageHeader = () => {
  const sp = useSearchParams();
  const { data: tree = [] } = useEmsecTree();

  const urlQ = sp.get('q') ?? '';
  const urlExchange = sp.getAll('exchange');
  const urlEmsec = sp.getAll('emsec');

  const byId = React.useMemo(() => buildMaps(tree), [tree]);

  const emsecLabels = React.useMemo(() => {
    if (!tree.length) return urlEmsec; // 로딩 전에는 fallback으로 id 표시
    return urlEmsec
      .map((id) => `emsec:${id}`)
      .map((leafId) => {
        const node = byId.get(leafId);
        if (!node) return leafId.replace('emsec:', '');
        // leaf만 label 표시하려면 node.label
        // 경로까지 표시하려면 buildPathLabel
        return node.label;
        return buildPathLabel(byId, leafId);
      });
  }, [tree, byId, urlEmsec.join('|')]);

  return (
    <div className="mt-2 ml-9 text-xs">
      {urlQ ? <>&quot;{urlQ}&quot;</> : null} {`| `}
      Exchange: {urlExchange.length ? urlExchange.join(', ') : 'All'}
      <br />
      EMSECs: {emsecLabels.length ? emsecLabels.join(', ') : 'All'}
    </div>
  );
};

export default PageHeader;
