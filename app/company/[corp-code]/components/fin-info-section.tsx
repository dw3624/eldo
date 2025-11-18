'use client';

import { Label } from '@/components/ui/label';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatNumber } from '../lib/utils';
import { FINANCIAL_INFO_FIELDS } from './constants';
import type { FinancialInfo } from './types';

const FinInfoSection = ({ data }: { data: FinancialInfo[] }) => {
  return (
    <div>
      <h2
        id="fin-info"
        className="scroll-m-36 border-b pb-2 font-semibold text-xl tracking-tight first:mt-0"
      >
        Financial Information
        <Label className="mt-2">[Currency: Unit: ]</Label>
      </h2>
      <div className="mt-6 space-y-6">
        <div className="flex w-full">
          <div className="flex-1">그래프</div>
          <div className="flex-1">그래프</div>
        </div>
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead colSpan={2} style={{ width: 160 }} />
              {data.map((col) => (
                <TableHead
                  key={col.label}
                  className="whitespace-nowrap font-semibold"
                  style={{ width: 120 }}
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {FINANCIAL_INFO_FIELDS.flatMap((infoField) =>
              infoField.fields.map((field, i) => {
                if (!field.key) return null;

                const firstRow =
                  i === 0 ? (
                    <TableCell
                      rowSpan={
                        infoField.fields.filter((f) => f.key && f.label).length
                      }
                      className="align-top font-semibold"
                    >
                      {infoField.label}
                    </TableCell>
                  ) : null;

                return (
                  <TableRow key={`${infoField.key}-${field.key}-${i}`}>
                    {firstRow}
                    <TableCell className="whitespace-nowrap">
                      {field.label}
                    </TableCell>

                    {data.map((col) => {
                      const value = col[field.key];

                      if (typeof value === 'number') {
                        return (
                          <TableCell
                            key={`${infoField.key}-${field.key}-${col.label}`}
                            className="whitespace-nowrap text-right"
                          >
                            {formatNumber(value)}
                          </TableCell>
                        );
                      }

                      return (
                        <TableCell
                          key={`${infoField.key}-${field.key}-${col.label}`}
                          className="whitespace-nowrap"
                        >
                          {value ?? '-'}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              }),
            )}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default FinInfoSection;
