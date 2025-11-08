'use client';

import React from 'react';

import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FINANCIAL_INFO_FIELDS } from './constants';

const FinInfoSection = () => {
  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 font-semibold text-xl tracking-tight first:mt-0">
        재무정보
        <Label className="mt-2">[Currency: Unit: ]</Label>
      </h2>
      <div className="mt-6 space-y-6">
        <div className="flex w-full">
          <div className="flex-1">그래프</div>
          <div className="flex-1">그래프</div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead colSpan={2} />
              <TableHead>LTM</TableHead>
              <TableHead>LTM-1</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {FINANCIAL_INFO_FIELDS.flatMap((infoField) =>
              infoField.fields.map((field, i) => {
                const firstRow =
                  i === 0 ? (
                    <TableCell rowSpan={infoField.fields.length}>
                      {infoField.label}
                    </TableCell>
                  ) : null;

                return (
                  <TableRow key={`${infoField.key}-${field.key}-${i}`}>
                    {firstRow}
                    <TableCell>{field.label}</TableCell>
                    <TableCell>값</TableCell>
                  </TableRow>
                );
              }),
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FinInfoSection;
