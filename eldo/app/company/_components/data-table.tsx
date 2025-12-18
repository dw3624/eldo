'use client';

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
type Sorting = { sort: string; order: 'asc' | 'desc' };

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  sorting,
  onPageChange,
  onSortChange,
}: {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination: Pagination;
  sorting: Sorting;
  onPageChange: (page: number) => void;
  onSortChange: (sort: string, order: 'asc' | 'desc') => void;
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const canPrev = pagination.page > 1;
  const canNext = pagination.page < pagination.totalPages;

  const toggleSort = (sortKey?: string) => {
    if (!sortKey) return;
    const nextOrder: 'asc' | 'desc' =
      sorting.sort === sortKey
        ? sorting.order === 'asc'
          ? 'desc'
          : 'asc'
        : 'asc';
    onSortChange(sortKey, nextOrder);
  };

  const renderSortMark = (sortKey?: string) => {
    if (!sortKey) return null;
    if (sorting.sort !== sortKey)
      return <span className="ml-1 text-muted-foreground">↕</span>;
    return <span className="ml-1">{sorting.order === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const def: any = header.column.columnDef;
                  const sortKey: string | undefined = def.meta?.sortKey;

                  return (
                    <TableHead
                      key={header.id}
                      className={
                        sortKey ? 'cursor-pointer select-none' : undefined
                      }
                      onClick={() => toggleSort(sortKey)}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(def.header, header.getContext())}
                      {renderSortMark(sortKey)}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {data.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end gap-2 py-4">
        <div className="mr-auto text-sm text-muted-foreground">
          Page {pagination.page} / {pagination.totalPages} · Total{' '}
          {pagination.total}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(pagination.page - 1)}
          disabled={!canPrev}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(pagination.page + 1)}
          disabled={!canNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
