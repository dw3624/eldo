'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { FlatNode } from './test';

// 인덱스 빌드: parent → children, id → node
function buildIndex(data: FlatNode[]) {
  const byId = new Map<string, FlatNode>();
  const children = new Map<string | null, string[]>();
  const roots: string[] = [];

  for (const n of data) {
    byId.set(n.id, n);
    const p = n.parentId ?? null;
    if (!children.has(p)) children.set(p, []);
    children.get(p)?.push(n.id);
  }

  for (const [p, arr] of children) {
    if (p === null) roots.push(...arr);
  }

  return { byId, children, roots };
}

// 모든 리프 자손 가져오기
function getAllLeafDescendants(
  id: string,
  children: Map<string | null, string[]>,
): string[] {
  const leaves: string[] = [];
  const stack = [id];

  while (stack.length) {
    const cur = stack.pop();
    if (!cur) continue;

    const kids = children.get(cur) ?? [];

    if (kids.length === 0) {
      // 리프 노드
      leaves.push(cur);
    } else {
      // 자식들을 스택에 추가
      stack.push(...kids);
    }
  }

  return leaves;
}

function computeCheckState(
  id: string,
  selected: Set<string>,
  children: Map<string | null, string[]>,
): { checked: boolean; indeterminate: boolean } {
  const kids = children.get(id) ?? [];

  // 리프 노드
  if (kids.length === 0) {
    return { checked: selected.has(id), indeterminate: false };
  }

  // 부모 노드: 자식들의 상태 확인
  const childStates = kids.map((k) => computeCheckState(k, selected, children));

  const allChecked = childStates.every((s) => s.checked && !s.indeterminate);
  const noneChecked = childStates.every((s) => !s.checked && !s.indeterminate);

  if (allChecked) {
    return { checked: true, indeterminate: false };
  }
  if (noneChecked) {
    return { checked: false, indeterminate: false };
  }
  return { checked: false, indeterminate: true };
}

// ====== Row ======
function Row({
  id,
  byId,
  childrenMap,
  selected,
  expanded,
  setExpanded,
  onToggle,
  depth = 0,
}: {
  id: string;
  byId: Map<string, FlatNode>;
  childrenMap: Map<string | null, string[]>;
  selected: Set<string>;
  expanded: Record<string, boolean>;
  setExpanded: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  onToggle: (id: string) => void;
  depth?: number;
}) {
  const cbRef = React.useRef<HTMLButtonElement | null>(null);

  const node = byId.get(id);
  const kidIds = childrenMap.get(id) ?? [];
  const isParent = kidIds.length > 0;
  const isOpen = !!expanded[id];

  const { checked, indeterminate } = computeCheckState(
    id,
    selected,
    childrenMap,
  );

  // Radix Checkbox indeterminate 반영
  React.useEffect(() => {
    if (cbRef.current) {
      const element = cbRef.current as HTMLButtonElement & {
        indeterminate?: boolean;
      };
      element.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  if (!node) return null;

  const panelId = `panel-${id}`;

  return (
    <li className="w-full">
      <div
        className={cn(
          'flex items-center gap-2 rounded-md py-1.5 pr-1 hover:bg-muted/50',
          depth > 0 && 'pl-2',
        )}
      >
        <Checkbox
          ref={cbRef}
          id={`cb-${id}`}
          checked={checked}
          onCheckedChange={() => onToggle(id)}
          className="translate-y-[1px]"
        />
        <Label
          htmlFor={`cb-${id}`}
          className="flex-1 cursor-pointer select-none text-sm"
        >
          {node.label}
        </Label>
        {isParent ? (
          <Button
            variant="ghost"
            size="sm"
            aria-label={isOpen ? 'Collapse' : 'Expand'}
            aria-controls={panelId}
            aria-expanded={isOpen}
            onClick={() => setExpanded((s) => ({ ...s, [id]: !s[id] }))}
            className="h-6 w-6 p-0"
          >
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        ) : (
          <span className="w-6" />
        )}
      </div>

      {isParent && isOpen && (
        <ul id={panelId} className="ml-2 border-l pl-3">
          {kidIds.map((cid) => (
            <Row
              key={cid}
              id={cid}
              byId={byId}
              childrenMap={childrenMap}
              selected={selected}
              expanded={expanded}
              setExpanded={setExpanded}
              onToggle={onToggle}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

// ====== 메인 ======

export default function FilterTree({
  data,
  defaultSelectedIds,
  defaultExpandedIds,
  onChange,
}: {
  data: FlatNode[];
  defaultSelectedIds?: string[];
  defaultExpandedIds?: string[];
  onChange?: (selected: Set<string>) => void;
}) {
  const { byId, children, roots } = React.useMemo(
    () => buildIndex(data),
    [data],
  );

  const [selected, setSelected] = React.useState<Set<string>>(
    () => new Set(defaultSelectedIds),
  );
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>(
    () => {
      const init: Record<string, boolean> = {};
      for (const id of defaultExpandedIds ?? []) init[id] = true;
      return init;
    },
  );

  const setSelectedAndNotify = React.useCallback(
    (next: Set<string>) => {
      setSelected(next);
      onChange?.(next);
    },
    [onChange],
  );

  // 토글 로직 (리프 추적 방식)
  const toggle = React.useCallback(
    (id: string) => {
      const { checked } = computeCheckState(id, selected, children);
      const next = new Set(selected);

      if (checked) {
        // 체크 해제: 이 노드의 모든 리프 자손 제거
        const leaves = getAllLeafDescendants(id, children);
        for (const leaf of leaves) {
          next.delete(leaf);
        }
      } else {
        // 체크: 이 노드의 모든 리프 자손 추가
        const leaves = getAllLeafDescendants(id, children);
        for (const leaf of leaves) {
          next.add(leaf);
        }
      }

      setSelectedAndNotify(next);
    },
    [selected, children, setSelectedAndNotify],
  );

  // 모든 리프 노드 가져오기
  const allLeaves = React.useMemo(() => {
    const leaves: string[] = [];
    for (const [id] of byId) {
      if (!children.get(id)?.length) {
        leaves.push(id);
      }
    }
    return leaves;
  }, [byId, children]);

  return (
    <div className="w-full pl-2 text-sm">
      <ul className="space-y-1">
        {roots.map((rid) => (
          <Row
            key={rid}
            id={rid}
            byId={byId}
            childrenMap={children}
            selected={selected}
            expanded={expanded}
            setExpanded={setExpanded}
            onToggle={toggle}
          />
        ))}
      </ul>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setSelectedAndNotify(new Set())}
        >
          Reset
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setSelectedAndNotify(new Set(allLeaves))}
        >
          Select All
        </Button>
        <div className="ml-auto text-muted-foreground">
          선택:{' '}
          <span className="font-medium text-foreground">{selected.size}</span>
        </div>
      </div>
    </div>
  );
}
