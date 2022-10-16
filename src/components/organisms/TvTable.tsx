import * as React from 'react';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { TV, TvTableColumn, TvTableProps } from '../../interfaces';

const columns: readonly TvTableColumn[] = [
  { field: 'name', headerName: 'Name', width: 350 },
  { field: 'first_air_date', headerName: 'first_air_date', width: 100 },
  { field: 'popularity', headerName: 'Popularity', width: 100 },
];

const MovieContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MovieThumbnail = styled.img`
  width: 100px;
  height: 56.2px;
  object-fit: contain;
`;

const MovieTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.2px;
  color: #252733;
  margin-left: 12px;
`;

export default function TvTable({ rows }: TvTableProps): React.ReactElement {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: 1122, height: 500, overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field} style={{ width: column.width }}>
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: TV) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                <TableCell>
                  <MovieContainer>
                    <MovieThumbnail alt={row.name} src={`https://image.tmdb.org/t/p/w500/${row.backdrop_path}`} />
                    <MovieTitle>{row.name}</MovieTitle>
                  </MovieContainer>
                </TableCell>
                <TableCell>{row.first_air_date}</TableCell>
                <TableCell>{row.popularity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
