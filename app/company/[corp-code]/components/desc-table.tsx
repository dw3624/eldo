'use client';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { COMPANY_INFO_FIELDS } from './constants';

const DescTable = () => {
  return (
    <Table className="mt-6">
      <TableBody>
        {COMPANY_INFO_FIELDS.map((field) => {
          const isFullWidth = field.span === 2;

          if (isFullWidth) {
            return (
              <TableRow key={field.key}>
                <TableCell>{field.label}</TableCell>
                <TableCell colSpan={3}>a</TableCell>
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
                <TableCell>{field.label}</TableCell>
                <TableCell></TableCell>
                <TableCell>{nextField.label}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            );
          }
        })}
      </TableBody>
    </Table>
  );
};

export default DescTable;
