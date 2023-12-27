import { CSV_COLUMNS_OPTIONS } from '@/app/[locale]/admin/_components/config';
import { CsvColumnOption } from '@/csvParser';
import { Game } from '@/types';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { pickBy } from 'lodash-es';
import { CsvPreviewColumn } from './components';

type Props = {
  gameList: Game[];
};

export const CsvPreview = ({ gameList }: Props) => {
  const columns = pickBy(CSV_COLUMNS_OPTIONS, (column) => (column as CsvColumnOption<true>)?.enabled === true);

  return (
    <>
      <Typography variant="h3">Načtené hodnoty</Typography>

      <Typography variant="body1" color="text.secondary">
        Seznam her z CSV obsahuje {gameList?.length || 0} položek.
      </Typography>

      <TableContainer component={Paper} elevation={4} sx={{ my: 4, maxHeight: '500px', overflow: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>{CSV_COLUMNS_OPTIONS.name.colName}</TableCell>
              {Object.entries(columns).map(([column, { colName }]) => (
                <TableCell key={column}>{column === 'type' ? 'Poznámky (rozšíření)' : colName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {gameList.map((game) => (
              <TableRow key={game.uid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="td" scope="row">
                  {game.sourceName}
                </TableCell>
                {Object.entries(columns).map(([column, columnOption]) => (
                  <TableCell key={column} component="td" scope="row">
                    <CsvPreviewColumn column={column} columnOption={columnOption} game={game} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
