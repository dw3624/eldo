'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type EmsecLevel = 'sector' | 'industry' | 'subIndustry';
type FlatNode = {
  id: number;
  parentId: number;
  level: EmsecLevel;
  label: string;
};
type CheckState = boolean | 'indeterminate';

type SelectionState = {
  sectors: Set<number>;
  industries: Set<number>;
  subIndustries: Set<number>;
};

function cloneSelection(s: SelectionState): SelectionState {
  return {
    sectors: new Set(s.sectors),
    industries: new Set(s.industries),
    subIndustries: new Set(s.subIndustries),
  };
}

function setForLevel(sel: SelectionState, level: EmsecLevel): Set<number> {
  if (level === 'sector') return sel.sectors;
  if (level === 'industry') return sel.industries;
  return sel.subIndustries;
}

// 인덱스 빌드: parent → children, id → node
function buildIndex(data: FlatNode[]) {
  const byId = new Map<number, FlatNode>();
  const children = new Map<number | null, number[]>();
  const roots: number[] = [];

  for (const n of data) {
    byId.set(n.id, n);
    const p = n.parentId ?? null;
    if (!children.has(p)) children.set(p, []);
    children.get(p)!.push(n.id);
  }

  for (const [p, arr] of children) {
    if (p === null) roots.push(...arr);
  }

  return { byId, children, roots };
}

// descendants 중 “선택된 노드가 하나라도 있는지” (indeterminate 용)
// - 연동은 하지 않되, “하위에 선택이 있다”는 시각적 힌트만 줌
function hasAnySelectedDescendant(
  id: number,
  children: Map<number | null, number[]>,
  byId: Map<number, FlatNode>,
  sel: SelectionState
): boolean {
  const stack = [...(children.get(id) ?? [])];

  while (stack.length) {
    const cur = stack.pop()!;
    const node = byId.get(cur);
    if (node) {
      const set = setForLevel(sel, node.level);
      if (set.has(cur)) return true;
    }
    const kids = children.get(cur) ?? [];
    if (kids.length) stack.push(...kids);
  }
  return false;
}

function computeCheckStateIndependent(
  node: FlatNode,
  children: Map<number | null, number[]>,
  byId: Map<number, FlatNode>,
  sel: SelectionState
): CheckState {
  const set = setForLevel(sel, node.level);
  const isChecked = set.has(node.id);
  if (isChecked) return true;

  const kidIds = children.get(node.id) ?? [];
  if (kidIds.length === 0) return false;

  // 본인은 미선택이지만 하위에 선택이 있으면 indeterminate 표시
  return hasAnySelectedDescendant(node.id, children, byId, sel)
    ? 'indeterminate'
    : false;
}

// ====== Row ======
function Row({
  id,
  byId,
  childrenMap,
  selection,
  expanded,
  setExpanded,
  onToggle,
  depth = 0,
}: {
  id: number;
  byId: Map<number, FlatNode>;
  childrenMap: Map<number | null, number[]>;
  selection: SelectionState;
  expanded: Record<number, boolean>;
  setExpanded: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  onToggle: (id: number) => void;
  depth?: number;
}) {
  const node = byId.get(id);
  if (!node) return null;

  const kidIds = childrenMap.get(id) ?? [];
  const isParent = kidIds.length > 0;
  const isOpen = !!expanded[id];

  const checkState = computeCheckStateIndependent(
    node,
    childrenMap,
    byId,
    selection
  );

  const panelId = `panel-${id}`;

  return (
    <li className="w-full">
      <div
        className={cn(
          'flex items-center gap-2 rounded-md py-1.5 pr-1 hover:bg-muted/50',
          depth > 0 && 'pl-2'
        )}
      >
        <Checkbox
          id={`cb-${id}`}
          checked={checkState}
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
              selection={selection}
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

// ====== Main ======
export default function FilterTree({
  data,
  defaultSelection,
  defaultExpandedIds,
  onChange,
}: {
  data: FlatNode[];
  defaultSelection?: Partial<{
    sectors: number[];
    industries: number[];
    subIndustries: number[];
  }>;
  defaultExpandedIds?: number[];
  onChange?: (selection: SelectionState) => void;
}) {
  const { byId, children, roots } = React.useMemo(
    () => buildIndex(data),
    [data]
  );

  const [selection, setSelection] = React.useState<SelectionState>(() => ({
    sectors: new Set(defaultSelection?.sectors ?? []),
    industries: new Set(defaultSelection?.industries ?? []),
    subIndustries: new Set(defaultSelection?.subIndustries ?? []),
  }));

  const [expanded, setExpanded] = React.useState<Record<number, boolean>>(
    () => {
      const init: Record<number, boolean> = {};
      for (const id of defaultExpandedIds ?? []) init[id] = true;
      return init;
    }
  );

  const setSelectionAndNotify = React.useCallback(
    (next: SelectionState) => {
      setSelection(next);
      onChange?.(next);
    },
    [onChange]
  );

  const toggle = React.useCallback(
    (id: number) => {
      const node = byId.get(id);
      if (!node) return;

      const next = cloneSelection(selection);
      const set = setForLevel(next, node.level);

      if (set.has(id)) set.delete(id);
      else set.add(id);

      setSelectionAndNotify(next);
    },
    [selection, byId, setSelectionAndNotify]
  );

  // 편의: 각 레벨 전체 선택용 id 모음
  const { allSectorIds, allIndustryIds, allSubIndustryIds } =
    React.useMemo(() => {
      const allSectorIds: number[] = [];
      const allIndustryIds: number[] = [];
      const allSubIndustryIds: number[] = [];

      for (const n of byId.values()) {
        if (n.level === 'sector') allSectorIds.push(n.id);
        else if (n.level === 'industry') allIndustryIds.push(n.id);
        else allSubIndustryIds.push(n.id);
      }
      return { allSectorIds, allIndustryIds, allSubIndustryIds };
    }, [byId]);

  const totalSelected =
    selection.sectors.size +
    selection.industries.size +
    selection.subIndustries.size;

  return (
    <div className="w-full pl-2 text-sm">
      <ul className="space-y-1">
        {roots.map((rid) => (
          <Row
            key={rid}
            id={rid}
            byId={byId}
            childrenMap={children}
            selection={selection}
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
          onClick={() =>
            setSelectionAndNotify({
              sectors: new Set(),
              industries: new Set(),
              subIndustries: new Set(),
            })
          }
        >
          Reset
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            setSelectionAndNotify({
              sectors: new Set(allSectorIds),
              industries: new Set(),
              subIndustries: new Set(),
            })
          }
        >
          Select All Sectors
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            setSelectionAndNotify({
              sectors: new Set(),
              industries: new Set(allIndustryIds),
              subIndustries: new Set(),
            })
          }
        >
          Select All Industries
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            setSelectionAndNotify({
              sectors: new Set(),
              industries: new Set(),
              subIndustries: new Set(allSubIndustryIds),
            })
          }
        >
          Select All Sub-Industries
        </Button>

        <div className="ml-auto text-muted-foreground">
          선택:{' '}
          <span className="font-medium text-foreground">{totalSelected}</span>
          <span className="ml-2">
            (S {selection.sectors.size} / I {selection.industries.size} / Sub{' '}
            {selection.subIndustries.size})
          </span>
        </div>
      </div>
    </div>
  );
}
