'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export type TableDataRow = {
  sector: string;
  total: number;
  avg: number;
  med: number;
  ranges: number[];
};

export type DataTableProps = {
  data: TableDataRow[];
  columns: string[];
  title?: string;
  description?: string;
  showTotal?: boolean;
  showAvg?: boolean;
  showMed?: boolean;
  formatValue?: (value: number) => string;
  onCellHover?: (row: TableDataRow, columnIndex: number, value: number) => void;
};

const DataTable = ({
  data,
  columns,
  title = 'Data Table',
  description,
  showTotal = true,
  showAvg = true,
  showMed = true,
  formatValue = (num: number) => num.toLocaleString('ko-KR'),
  onCellHover,
}: DataTableProps) => {
  const [hoveredCell, setHoveredCell] = useState<{
    row: string;
    col: number;
    value: number;
  } | null>(null);

  const handleCellHover = (
    row: TableDataRow,
    columnIndex: number,
    value: number,
  ) => {
    setHoveredCell({ row: row.sector, col: columnIndex, value });
    if (onCellHover) {
      onCellHover(row, columnIndex, value);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead />
              {showTotal && <TableHead>기업수</TableHead>}
              {showAvg && <TableHead>평균값</TableHead>}
              {showMed && <TableHead>중앙값</TableHead>}
              {columns.map((col) => (
                <TableHead
                  key={col}
                  className="whitespace-normal break-keep text-center"
                >
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.sector}>
                <TableCell className="truncate">{row.sector}</TableCell>
                {showTotal && (
                  <TableCell className="text-center">
                    {formatValue(row.total)}
                  </TableCell>
                )}
                {showAvg && (
                  <TableCell className="text-center">
                    {formatValue(row.avg)}
                  </TableCell>
                )}
                {showMed && (
                  <TableCell className="text-center">
                    {formatValue(row.med)}
                  </TableCell>
                )}
                {row.ranges.map((value, i) => {
                  return (
                    <Tooltip key={`${row.sector}_${i}`}>
                      <TooltipTrigger asChild>
                        <TableCell
                          className="text-center"
                          onMouseEnter={() => handleCellHover(row, i, value)}
                          onMouseLeave={() => setHoveredCell(null)}
                        >
                          {formatValue(value)}
                        </TableCell>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="flex flex-col gap-1.5 p-1">
                          <div className="font-semibold text-primary-foreground">
                            {row.sector}
                          </div>
                          <div className="flex justify-between gap-2 text-secondary">
                            <div className="flex">
                              <div>{columns[i]}</div>
                            </div>
                            <div className="font-semibold text-primary-foreground">
                              {formatValue(value)}
                            </div>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DataTable;
