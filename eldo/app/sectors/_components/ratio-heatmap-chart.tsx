import { RatioChart } from '@/lib/analysis/types';
import Heatmap from './heatmap';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LIST_YEAR_COLUMNS } from '../_lib/constants';

const RatioHeatmapChart = ({ data }: { data: RatioChart }) => {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <Heatmap type="ratio" data={data.rows} columns={LIST_YEAR_COLUMNS} />
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center truncate">EMSEC</TableHead>
              <TableHead className="text-center truncate">
                Company Count
              </TableHead>
              <TableHead className="text-center truncate">Subtotal</TableHead>
              {LIST_YEAR_COLUMNS.map((col) => (
                <TableHead
                  key={col}
                  className="whitespace-normal break-keep py-4 text-center font-semibold text-xs"
                >
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.rows.map((row) => (
              <TableRow key={row.emsecId}>
                <TableCell className="truncate">{row.labelEn}</TableCell>
                <TableCell className="text-center"> {row.subtotal} </TableCell>
                {row.bins.map((bin) => (
                  <TableCell key={bin.key} className="text-center">
                    {bin.val?.toFixed(2)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default RatioHeatmapChart;
