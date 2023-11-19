import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { getGameFromCsv, mergeNotesToCsvGame } from './utils';
import { dataCsv } from '@/data';
import { ChangeEvent, useState, useTransition } from 'react';
import { ButtonAction } from '@/components';
import { createGameListRecord } from '@/actions';

type Props = {
  handleSelectRecord: (recordId: number) => void;
};

export const CsvLoader = ({ handleSelectRecord }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [recordName, setRecordName] = useState('');

  const csvGameList = mergeNotesToCsvGame(dataCsv).map(getGameFromCsv);

  const handleCreateGameList = async () => {
    startTransition(async () => {
      const { recordId } = await createGameListRecord(csvGameList, recordName);
      handleSelectRecord(recordId);
    });
  };

  return (
    <>
      <Box my={4}>
        <Typography variant="h2" gutterBottom>
          CSV Data
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Seznam her z CSV obsahuje {csvGameList?.length || 0} položek.
        </Typography>
      </Box>

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
            {csvGameList?.map(({ uid, sourceName, notes, langs }) => (
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

      <Typography variant="h3" gutterBottom>
        Název verze
      </Typography>

      <Box width="50%">
        <TextField
          label="Název verze"
          value={recordName}
          fullWidth
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setRecordName(event.target.value);
          }}
        />
      </Box>

      {!!csvGameList.length && (
        <Stack direction="row" gap={2} my={4}>
          <ButtonAction color="success" onClick={handleCreateGameList} isPending={isPending}>
            Uložit verzi do DB
          </ButtonAction>
        </Stack>
      )}
    </>
  );
};
