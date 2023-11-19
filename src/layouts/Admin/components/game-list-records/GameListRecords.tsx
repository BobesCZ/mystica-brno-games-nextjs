'use client';

import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useState, useTransition } from 'react';
import { ButtonAction } from '@/components';
import dynamic from 'next/dynamic';
import { deleteGameListRecords } from '@/actions';
import { GameListRecord, GameListRecordStatus } from '@/actions/types';
import { Delete, Done, QueryBuilder } from '@mui/icons-material';
import { Status } from '@/types';

const ReactJson = dynamic(() => import('react-json-view'), {
  ssr: false,
});

type Props = {
  gameListRecords: GameListRecord[];
  selectedRecordId: number | undefined;
  handleSelectRecord: (recordId?: number) => void;
  onShowCreatePage: () => void;
  activeGameListRecord?: number;
};

export const GameListRecords = ({
  gameListRecords,
  selectedRecordId,
  handleSelectRecord,
  onShowCreatePage,
  activeGameListRecord,
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const [showDbScan, setShowDbScan] = useState(false);

  const handleDeleteRecords = async () => {
    startTransition(() => deleteGameListRecords());
  };

  const handleShowDbScan = () => {
    setShowDbScan((prev) => !prev);
  };

  const getCellSx = (recordId: number) => ({ fontWeight: activeGameListRecord === recordId ? 'bold' : undefined });
  const getStatusIcon = (status: `${GameListRecordStatus}`) =>
    status === GameListRecordStatus.COMPLETED ? (
      <Done fontSize="small" sx={{ verticalAlign: 'middle' }} />
    ) : (
      <QueryBuilder fontSize="small" sx={{ verticalAlign: 'middle' }} />
    );

  return (
    <>
      <Typography variant="h2" gutterBottom mt={4}>
        Verze herní databáze
      </Typography>

      <TableContainer component={Paper} elevation={4} sx={{ my: 4, maxHeight: '500px', overflow: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Vytvořeno</TableCell>
              <TableCell>Název</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Počet položek</TableCell>
              <TableCell>Aktivní</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gameListRecords?.map(({ recordId, status, recordName, gameList }, index) => (
              <TableRow
                key={`${recordId}_${index}`}
                sx={(theme) => ({
                  '&:last-child td, &:last-child th': { border: 0 },
                  backgroundColor: selectedRecordId === recordId ? theme.palette.primary.light : undefined,
                })}
              >
                <TableCell component="td" scope="row" sx={getCellSx(recordId)}>
                  {recordId}
                </TableCell>
                <TableCell component="td" scope="row" sx={getCellSx(recordId)}>
                  {new Date(recordId).toLocaleString()}
                </TableCell>
                <TableCell component="td" scope="row" sx={getCellSx(recordId)}>
                  {recordName}
                </TableCell>
                <TableCell component="td" scope="row" sx={getCellSx(recordId)}>
                  {getStatusIcon(status)} {status}
                </TableCell>
                <TableCell component="td" scope="row" sx={getCellSx(recordId)}>
                  {gameList?.filter((game) => game.status === Status.FINISHED).length} / {gameList.length}
                </TableCell>
                <TableCell component="td" scope="row" sx={getCellSx(recordId)}>
                  {activeGameListRecord === recordId && 'ANO'}
                </TableCell>
                <TableCell component="td" scope="row">
                  <Stack direction={'row'} gap={1}>
                    <Button variant="contained" onClick={() => handleSelectRecord(recordId)}>
                      Detail
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" gap={2} alignItems="center" my={4}>
        <ButtonAction color="error" onClick={handleDeleteRecords} isPending={isPending} startIcon={<Delete />}>
          Smazat všechny verze
        </ButtonAction>
        <Button color="success" variant="outlined" onClick={onShowCreatePage}>
          Vytvořit novou verzi
        </Button>
        <Button color="primary" variant="outlined" onClick={handleShowDbScan}>
          Zobrazit DbScan
        </Button>
      </Stack>

      {showDbScan && <ReactJson src={gameListRecords} theme="pop" />}
    </>
  );
};
