'use client';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { COMPANY_INFO_FIELDS } from './constants';
import type { CorpDesc } from './types';

const DescSection = ({ data }: { data: CorpDesc }) => {
  return (
    <div>
      <h2
        id="company-desc"
        className="scroll-m-36 border-b pb-2 font-semibold text-xl tracking-tight first:mt-0"
      >
        Description
      </h2>
      <Table className="mt-6 table-fixed">
        <TableBody>
          {COMPANY_INFO_FIELDS.map((field) => {
            const isFullWidth = field.span === 2;

            if (isFullWidth) {
              return (
                <TableRow key={field.key}>
                  <TableCell>
                    <div className="whitespace-normal break-keep">
                      {field.label}
                    </div>
                  </TableCell>
                  <TableCell colSpan={3}>
                    <div className="whitespace-normal break-keep">
                      {data[field.key]}
                    </div>
                  </TableCell>
                </TableRow>
              );
            } else {
              const nextField =
                COMPANY_INFO_FIELDS[COMPANY_INFO_FIELDS.indexOf(field) + 1];
              const isLastInPair = COMPANY_INFO_FIELDS.indexOf(field) % 2 === 1;

              if (isLastInPair || nextField?.span === 2) {
                return null;
              }
              return (
                <TableRow key={field.key}>
                  <TableCell>
                    <div className="whitespace-normal break-words">
                      {field.label}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="whitespace-normal break-words">
                      {data[field.key]}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="whitespace-normal break-words">
                      {nextField.label}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="whitespace-normal break-words">
                      {data[nextField.key]}
                    </div>
                  </TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default DescSection;
