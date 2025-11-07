'use client';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { STOCK_INFO_FIELDS } from './constants';

const StockSection = () => {
  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 font-semibold text-xl tracking-tight first:mt-0">
        주가정보
      </h2>
      <div className="mt-6 space-y-6">
        <div>그래프</div>
        <div>그래프</div>
        <Table>
          <TableBody>
            {STOCK_INFO_FIELDS.map((field) => (
              <TableRow key={field.key}>
                <TableCell>{field.label}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StockSection;
