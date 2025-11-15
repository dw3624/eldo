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
import { FINANCIAL_INFO_FIELDS } from './constants';

const FinIndicSection = () => {
  return (
    <div>
      <h2
        id="fin-indic"
        className="scroll-m-36 border-b pb-2 font-semibold text-xl tracking-tight first:mt-0"
      >
        Financial Indicators
        <Label className="mt-2">[Currency: Unit: ]</Label>
      </h2>
      <div className="mt-6 space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>PER전일</TableCell>
              <TableCell></TableCell>
              <TableCell>PBR전일</TableCell>
              <TableCell></TableCell>
              <TableCell>EV/EBITDA전일</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                매출액 증감
                <br />
                (최근 3LTM)
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                영업이익 증감
                <br />
                (최근 3LTM)
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                EBITDA 증감
                <br />
                (최근 3LTM)
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
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

export default FinIndicSection;
