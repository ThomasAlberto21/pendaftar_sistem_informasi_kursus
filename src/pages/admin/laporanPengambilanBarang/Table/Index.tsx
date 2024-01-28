import Columns from './Columns';
import TableSkinBordered from '../../../../components/tables/skin/TableSkinBordered';
import { FC, useEffect, useState } from 'react';

interface TableProps {
  laporanPengambilanBarang: any[];
}

const Table: FC<TableProps> = ({ laporanPengambilanBarang }) => {
  const PAGE_SIZES = [10, 25, 50, 100];
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState(laporanPengambilanBarang);
  const [recordsData, setRecordsData] = useState(initialRecords);

  useEffect(() => {
    setInitialRecords(laporanPengambilanBarang);
    setRecordsData(laporanPengambilanBarang.slice(0, pageSize));
  }, [laporanPengambilanBarang, pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecordsData([...initialRecords.slice(from, to)]);
  }, [page, pageSize, initialRecords]);

  return (
    <>
      <TableSkinBordered
        page={page}
        records={recordsData}
        columns={Columns()}
        recordsPerPage={pageSize}
        totalRecords={laporanPengambilanBarang.length}
        onPageChange={(page: number) => setPage(page)}
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={setPageSize}
      />
    </>
  );
};

export default Table;
