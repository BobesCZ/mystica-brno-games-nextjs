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
import { Add, Delete, Done, QueryBuilder, Settings, Visibility, VisibilityOff } from '@mui/icons-material';
import { Game, Status } from '@/types';
import { ConfirmDeleteModal } from '../confirm-delete-modal';
import { IS_DEVELOPMENT } from '../../../config';
import { Link } from '@/components';
import { Urls } from '@/config';

const ReactJson = dynamic(() => import('react-json-view'), {
  ssr: false,
});

type Props = {
  gameListRecords: GameListRecord[];
  activeGameListRecord?: number;
};

export const GameListRecords = ({ gameListRecords, activeGameListRecord }: Props) => {
  const [showDbScan, setShowDbScan] = useState(false);

  const [isModalOpened, setIsModalOpened] = useState(false);
  const handleOpenModal = () => setIsModalOpened(true);
  const handleCloseModal = () => setIsModalOpened(false);

  const handleShowDbScan = () => {
    setShowDbScan((prev) => !prev);
  };

  const getCellSx = (recordId: number) => ({ fontWeight: activeGameListRecord === recordId ? 'bold' : undefined });

  const getStatusIcon = (status: `${GameListRecordStatus}`) =>
    status === GameListRecordStatus.COMPLETED ? <Done fontSize="small" /> : <QueryBuilder fontSize="small" />;

  const getStatusText = (status: `${GameListRecordStatus}`, gameList: Game[]) =>
    status === GameListRecordStatus.COMPLETED
      ? 'Staženo'
      : `Chybí ${gameList?.filter((game) => game.status === Status.NEW).length}`;

  return (
    <>
      <Typography variant="h2" gutterBottom mt={4}>
        Seznamy her
      </Typography>

      <TableContainer component={Paper} elevation={4} sx={{ my: 4, maxHeight: '500px', overflow: 'auto' }}>
        <Table stickyHeader component="div">
          <TableHead component="div">
            <TableRow component="div">
              <TableCell component="div">Aktivní</TableCell>
              <TableCell component="div">Vytvořeno</TableCell>
              <TableCell component="div">Název</TableCell>
              <TableCell component="div">Stav loaderu</TableCell>
              <TableCell component="div">Nenalezeno / Celkem her</TableCell>
            </TableRow>
          </TableHead>
          <TableBody component="div">
            {gameListRecords?.map(({ recordId, status, recordName, gameList }, index) => (
              <TableRow
                key={`${recordId}_${index}`}
                sx={(theme) => ({
                  '&:last-child td, &:last-child th': { border: 0 },
                  textDecoration: 'none',
                  cursor: 'pointer',
                })}
                hover
                component={Link}
                href={`${Urls.ADMIN}/${recordId}`}
              >
                <TableCell component="div" scope="row" sx={getCellSx(recordId)}>
                  {activeGameListRecord === recordId ? (
                    <Visibility fontSize="small" />
                  ) : (
                    <VisibilityOff fontSize="small" color="disabled" />
                  )}
                </TableCell>
                <TableCell component="div" scope="row" sx={getCellSx(recordId)}>
                  {new Date(recordId).toLocaleString()}
                </TableCell>
                <TableCell component="div" scope="row" sx={getCellSx(recordId)}>
                  {recordName}
                </TableCell>
                <TableCell component="div" scope="row" sx={getCellSx(recordId)}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    {getStatusIcon(status)} {getStatusText(status, gameList)}
                  </Stack>
                </TableCell>
                <TableCell component="div" scope="row" sx={getCellSx(recordId)}>
                  {gameList?.filter((game) => game.status === Status.UNFINISHED).length} / {gameList.length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" gap={2} alignItems="center" my={4}>
        <Button variant="contained" color="success" startIcon={<Add />} LinkComponent={Link} href={Urls.ADMIN_NEW}>
          Vytvořit nový seznam
        </Button>
        <Button variant="contained" color="error" onClick={handleOpenModal} startIcon={<Delete />}>
          Smazat všechny seznamy
        </Button>
        {IS_DEVELOPMENT && (
          <Button variant="outlined" color="primary" onClick={handleShowDbScan} startIcon={<Settings />}>
            Zobrazit DbScan
          </Button>
        )}
      </Stack>

      {showDbScan && <ReactJson src={gameListRecords} theme="pop" />}

      <ConfirmDeleteModal isModalOpened={isModalOpened} handleCloseModal={handleCloseModal} />
    </>
  );
};
