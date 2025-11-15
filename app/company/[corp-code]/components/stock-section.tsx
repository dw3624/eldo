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
import type { StockDataType } from './test';

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
                    <TableHead className="w-24 text-center">거래일자</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.id} className="text-center">
                      <TableCell className="text-center font-medium">
                        {formatDate(row.tradeDate)}
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
                    {STOCK_INFO_FIELDS.filter(
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
                      {/* <TableCell
                        className={`whitespace-nowrap text-right font-bold ${
                          row.change > 0
                            ? 'text-red-600'
                            : row.change < 0
                              ? 'text-blue-600'
                              : ''
                        }`}
                      >
                        {formatNumber(row.close)}
                      </TableCell> */}
                      <TableCell className="whitespace-nowrap text-right">
                        {formatNumber(row.floatingShares)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right">
                        {formatNumber(row.tradeVolume)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right">
                        {formatNumber(row.priceCloseAdj)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right">
                        {formatNumber(row.priceOpenAdj)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right font-bold text-red-600">
                        {formatNumber(row.priceHighAdj)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right font-bold text-blue-600">
                        {formatNumber(row.priceLowAdj)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right">
                        {formatNumber(row.marketCapAdj)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right">
                        {formatNumber(row.netDebt)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right">
                        {formatNumber(row.enterpriseValue)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right">
                        {formatNumber(row.perPrev)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right">
                        {formatNumber(row.pbrPrev)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right">
                        {formatNumber(row.psrPrev)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right">
                        {formatNumber(row.pcrPrev)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right">
                        {formatNumber(row.evSalesPrev)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right">
                        {formatNumber(row.evEbitdaPrev)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockSection;
