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
    <div className="w-fu">
      <h2
        id="stock-info"
        className="scroll-m-36 border-b pb-2 font-semibold text-xl tracking-tight first:mt-0"
      >
        Stock Information
        <Label className="mt-2">[Currency: Unit: ]</Label>
      </h2>
      <div className="mt-6 space-y-6">
        <div>그래프</div>
        <div>그래프</div>
        <div className="w-full overflow-x-auto">
          <div className="inline-flex min-w-full">
            <div className="sticky left-0 z-10 bg-white">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24 text-center">일자</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.id} className="text-center">
                      <TableCell className="text-center font-medium">
                        {formatDate(row.date)}
                      </TableCell>
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
                      <TableHead
                        key={col.key}
                        className="whitespace-nowrap text-right"
                        style={{ minWidth: col.width || 100 }}
                      >
                        {col.label}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.id} className="text-right">
                      <TableCell
                        className={`whitespace-nowrap text-right font-bold ${
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
                        className={`whitespace-nowrap text-right ${
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
                        className={`whitespace-nowrap text-right font-medium ${
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
                      <TableCell className="whitespace-nowrap text-right">
                        {formatNumber(row.open)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right text-red-600">
                        {formatNumber(row.high)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right text-blue-600">
                        {formatNumber(row.low)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right">
                        {formatNumber(row.volume)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right">
                        {formatNumber(row.tradingValue)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
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
