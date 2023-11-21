import { Game } from '@/types';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

type Props = {
  gameList: Game[];
};

export const CsvPreview = ({ gameList }: Props) => (
  <TableContainer component={Paper} elevation={4} sx={{ my: 4, maxHeight: '500px', overflow: 'auto' }}>
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>uid</TableCell>
          <TableCell>sourceName</TableCell>
          <TableCell>notes</TableCell>
          <TableCell>langs</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {gameList.map(({ uid, sourceName, notes, langs }) => (
          <TableRow key={uid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="td" scope="row">
              {uid}
            </TableCell>
            <TableCell component="td" scope="row">
              {sourceName}
            </TableCell>
            <TableCell component="td" scope="row">
              {notes?.map((item) => (
                <Typography key={item}>{item}</Typography>
              ))}
            </TableCell>
            <TableCell component="td" scope="row">
              {langs?.map((item) => (
                <Typography key={item}>{item}</Typography>
              ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
