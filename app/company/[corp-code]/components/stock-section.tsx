'use client';

import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate, formatNumber } from '../lib/utils';
import { STOCK_INFO_FIELDS } from './constants';
import { PRICE_COLUMNS, type StockDataType } from './test';

const StockSection = ({ data }: { data: StockDataType[] }) => {
  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 font-semibold text-xl tracking-tight first:mt-0">
        주가정보
        <Label className="mt-2">[Currency: Unit: ]</Label>
      </h2>
      <div className="mt-6 space-y-6">
        <div>그래프</div>
        <div>그래프</div>
        <div className="flex overflow-x-auto">
          <div className="sticky left-0 z-20 w-25 bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">일자</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id} className="text-center">
                    <TableCell>{formatDate(row.date)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex-1">
            <Table>
              <TableHeader>
                <TableRow>
                  {PRICE_COLUMNS.filter(
                    (col) => !Object.keys(col).includes('fixed'),
                  ).map((col) => (
                    <TableHead key={col.key} className="text-right">
                      {col.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id} className="text-right">
                    <TableCell
                      className={`text-right font-bold ${
                        row.change > 0
                          ? 'text-red-600'
                          : row.change < 0
                            ? 'text-blue-600'
                            : ''
                      }`}
                    >
                      {formatNumber(row.close)}
                    </TableCell>
                    <TableCell
                      className={`text-right font-bold ${
                        row.change > 0
                          ? 'text-red-600'
                          : row.change < 0
                            ? 'text-blue-600'
                            : ''
                      }`}
                    >
                      {row.change > 0 ? '+' : ''}
                      {formatNumber(row.change)}
                    </TableCell>
                    <TableCell
                      className={`text-right font-bold ${
                        Number(row.changeRate) > 0
                          ? 'text-red-600'
                          : Number(row.changeRate) < 0
                            ? 'text-blue-600'
                            : ''
                      }`}
                    >
                      {Number(row.changeRate) > 0 ? '+' : ''}
                      {row.changeRate}%
                    </TableCell>
                    <TableCell>{formatNumber(row.open)}</TableCell>
                    <TableCell>{formatNumber(row.high)}</TableCell>
                    <TableCell>{formatNumber(row.low)}</TableCell>
                    <TableCell>{formatNumber(row.volume)}</TableCell>
                    <TableCell>{formatNumber(row.tradingValue)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

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
