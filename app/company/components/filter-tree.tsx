'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

// ====== 타입 ======
export type TreeNode = {
  id: string;
  label: string;
  children?: TreeNode[];
};

// ====== 유틸 ======
const collectIds = (node: TreeNode): string[] => [
  node.id,
  ...(node.children ? node.children.flatMap(collectIds) : []),
];

const getAllDescendantIds = (nodes?: TreeNode[]) =>
  nodes ? nodes.flatMap(collectIds) : [];

// 부모 상태 계산: checked / indeterminate / unchecked
function computeNodeState(
  node: TreeNode,
  selected: Set<string>,
): { checked: boolean | 'indeterminate' } {
  if (!node.children || node.children.length === 0) {
    return { checked: selected.has(node.id) };
  }
  const childStates = node.children.map((c) => computeNodeState(c, selected));
  const allChecked = childStates.every((s) => s.checked === true);
  const noneChecked = childStates.every((s) => s.checked === false);
  if (allChecked) return { checked: true };
  if (noneChecked) return { checked: selected.has(node.id) };
  return { checked: 'indeterminate' };
}

// 선택 토글 로직 (부모 클릭 시 하위 전체 동기화)
function toggleNode(
  node: TreeNode,
  selected: Set<string>,
  setSelected: (next: Set<string>) => void,
) {
  const { checked } = computeNodeState(node, selected);
  const idsToToggle = node.children?.length
    ? getAllDescendantIds([node])
    : [node.id];

  const next = new Set(selected);
  const willCheck = checked !== true; // true가 아니면 체크로 전환
  idsToToggle.forEach((id) => {
    if (willCheck) next.add(id);
    else next.delete(id);
  });

  if (!node.children?.length) {
    if (willCheck) next.add(node.id);
    else next.delete(node.id);
  }

  setSelected(next);
}

// ====== Row ======
function TreeRow({
  node,
  selected,
  setSelected,
  expanded,
  setExpanded,
  depth = 0,
}: {
  node: TreeNode;
  selected: Set<string>;
  setSelected: (next: Set<string>) => void;
  expanded: Record<string, boolean>;
  setExpanded: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  depth?: number;
}) {
  const isParent = !!node.children?.length;
  const isOpen = !!expanded[node.id];
  const state = computeNodeState(node, selected);
  const isIndeterminate = state.checked === 'indeterminate';
  const isChecked = state.checked === true;

  // Checkbox의 indeterminate
  const cbRef = React.useRef<HTMLButtonElement | null>(null);
  React.useEffect(() => {
    if (cbRef.current) {
      // @ts-expect-error Radix 전달
      cbRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  const panelId = `panel-${node.id}`;

  return (
    <li className="w-full">
      <div
        className={cn(
          'flex items-center gap-2 rounded-md py-1.5 pr-1 hover:bg-muted/50',
          depth > 0 && 'pl-2',
        )}
      >
        {/* 체크박스 */}
        <Checkbox
          ref={cbRef}
          id={`cb-${node.id}`}
          checked={isChecked}
          onCheckedChange={() => toggleNode(node, selected, setSelected)}
          className="translate-y-[1px]"
        />
        {/* 글자: a 클릭 시 체크만 토글 (전개 안 함) */}
        <Label htmlFor={`cb-${node.id}`}>{node.label}</Label>

        {/* 전개/닫힘 아이콘 (오른쪽) */}
        {isParent ? (
          <Button
            variant={'ghost'}
            aria-label={isOpen ? 'Collapse' : 'Expand'}
            aria-controls={panelId}
            aria-expanded={isOpen}
            onClick={() =>
              setExpanded((s) => ({ ...s, [node.id]: !s[node.id] }))
            }
            className="size-6 cursor-pointer"
          >
            {isOpen ? <ChevronDown /> : <ChevronRight />}
          </Button>
        ) : (
          <span className="size-6" />
        )}
      </div>

      {/* children */}
      {isParent && isOpen && (
        <ul id={panelId} className="ml-2 border-l pl-3">
          {node.children?.map((child) => (
            <TreeRow
              key={child.id}
              node={child}
              selected={selected}
              setSelected={setSelected}
              expanded={expanded}
              setExpanded={setExpanded}
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
  data: TreeNode[];
  defaultSelectedIds?: string[];
  defaultExpandedIds?: string[];
  onChange?: (selected: Set<string>) => void;
}) {
  const [selected, setSelected] = React.useState<Set<string>>(
    () => new Set(defaultSelectedIds),
  );
  console.log(selected);
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>(
    () => {
      const init: Record<string, boolean> = {};
      (defaultExpandedIds ?? []).forEach((id) => {
        init[id] = true;
      });
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

  return (
    <div className="w-full pl-2 text-sm">
      <ul className="space-y-1">
        {data.map((root) => (
          <TreeRow
            key={root.id}
            node={root}
            selected={selected}
            setSelected={setSelectedAndNotify}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <Button size={'sm'} onClick={() => setSelectedAndNotify(new Set())}>
          Reset
        </Button>
        <Button
          size={'sm'}
          onClick={() => {
            const next = new Set<string>();
            const all = getAllDescendantIds(data);
            all.forEach((id) => {
              next.add(id);
            });
            setSelectedAndNotify(next);
          }}
        >
          Select All
        </Button>
        <div className="ml-auto">
          선택: <span className="font-medium">{selected.size}</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 사용법
 * <FilterTree
 *   data={yourTreeData}
 *   defaultSelectedIds={["nasdaq"]}
 *   defaultExpandedIds={["market", "sector"]}
 *   onChange={(sel) => console.log(Array.from(sel))}
 * />
 *
 * - 글/체크박스 클릭은 체크만 담당, 전개는 우측 아이콘으로만 동작합니다.
 */
