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
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { GameListRecord, GameListRecordStatus } from '@/actions/types';
import { Add, Delete, Done, QueryBuilder, Visibility, VisibilityOff } from '@mui/icons-material';
import { Status } from '@/types';
import { ConfirmDeleteModal } from '../confirm-delete-modal';

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
  const [showDbScan, setShowDbScan] = useState(false);

  const [isModalOpened, setIsModalOpened] = useState(false);
  const handleOpenModal = () => setIsModalOpened(true);
  const handleCloseModal = () => setIsModalOpened(false);

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
              <TableCell>Aktivní</TableCell>
              <TableCell>Vytvořeno</TableCell>
              <TableCell>Název</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Počet položek</TableCell>
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
                  {activeGameListRecord === recordId ? (
                    <Visibility fontSize="small" />
                  ) : (
                    <VisibilityOff fontSize="small" color="disabled" />
                  )}
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
        <Button variant="contained" color="error" onClick={handleOpenModal} startIcon={<Delete />}>
          Smazat všechny verze
        </Button>
        <Button color="success" variant="outlined" onClick={onShowCreatePage} startIcon={<Add />}>
          Vytvořit novou verzi
        </Button>
        <Button color="primary" variant="outlined" onClick={handleShowDbScan}>
          Zobrazit DbScan
        </Button>
      </Stack>

      {showDbScan && <ReactJson src={gameListRecords} theme="pop" />}

      <ConfirmDeleteModal isModalOpened={isModalOpened} handleCloseModal={handleCloseModal} />
    </>
  );
};
