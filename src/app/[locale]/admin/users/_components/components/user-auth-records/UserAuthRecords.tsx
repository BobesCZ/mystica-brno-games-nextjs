'use client';

import {
  Alert,
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
  alpha,
} from '@mui/material';
import { useState, useTransition } from 'react';
import dynamic from 'next/dynamic';
import { Delete, Done, QueryBuilder, Settings } from '@mui/icons-material';
import { UserAuthRecord, UserAuthStatus, useUserAuth } from '../../../../_components/userAuth';
import { authorizeUserAuthRecord, deleteUserAuthRecord } from '@/actions/userAuth';
import { ButtonAction } from '@/components';
import { IS_DEVELOPMENT } from '../../../../_components/config';

const ReactJson = dynamic(() => import('react-json-view'), {
  ssr: false,
});

type Props = {
  userAuthRecords: UserAuthRecord[];
};

export const UserAuthRecords = ({ userAuthRecords }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [showDbScan, setShowDbScan] = useState(false);

  const { userAuthRecord } = useUserAuth(userAuthRecords);

  const handleShowDbScan = () => {
    setShowDbScan((prev) => !prev);
  };

  const handleAuthorize = async (record: UserAuthRecord) => {
    startTransition(() => authorizeUserAuthRecord(record));
  };

  const handleDelete = async (recordId: number) => {
    startTransition(() => deleteUserAuthRecord(recordId));
  };

  const getStatusIcon = (status: `${UserAuthStatus}`) =>
    status === UserAuthStatus.Authorized ? <Done fontSize="small" /> : <QueryBuilder fontSize="small" />;

  const getStatusText = (status: `${UserAuthStatus}`) =>
    status === UserAuthStatus.Waiting ? 'Čeká na udělení přístupu' : 'Přístup udělen';

  return (
    <>
      <Typography variant="h2" gutterBottom mt={4}>
        Seznam uživatelů
      </Typography>

      {!IS_DEVELOPMENT && (
        <Alert severity="warning">Na tomto prostředí nelze editovat uživatele. Kontaktujte svého správce.</Alert>
      )}

      <TableContainer component={Paper} elevation={4} sx={{ my: 4, maxHeight: '500px', overflow: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Jméno</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Stav</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userAuthRecords?.map((record, index) => (
              <TableRow
                key={`${record.recordId}_${index}`}
                sx={(theme) => ({
                  '&:last-child td, &:last-child th': { border: 0 },
                  backgroundColor:
                    userAuthRecord?.recordId === record.recordId ? alpha(theme.palette.primary.main, 0.25) : undefined,
                })}
              >
                <TableCell component="td" scope="row">
                  {record.user.name}
                </TableCell>
                <TableCell component="td" scope="row">
                  {record.user.email}
                </TableCell>
                <TableCell component="td" scope="row">
                  <Stack direction="row" alignItems="center" gap={1}>
                    {getStatusIcon(record.status)} {getStatusText(record.status)}
                  </Stack>
                </TableCell>

                <TableCell component="td" scope="row">
                  <Stack direction={'row'} gap={1}>
                    <ButtonAction
                      color="primary"
                      onClick={() => handleAuthorize(record)}
                      isPending={isPending}
                      startIcon={<Done />}
                      disabled={!IS_DEVELOPMENT || record?.status === UserAuthStatus.Authorized}
                    >
                      Udělit přistup
                    </ButtonAction>
                    <ButtonAction
                      color="error"
                      onClick={() => handleDelete(record.recordId)}
                      isPending={isPending}
                      startIcon={<Delete />}
                      disabled={!IS_DEVELOPMENT || userAuthRecord?.recordId === record.recordId}
                    >
                      Smazat
                    </ButtonAction>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {IS_DEVELOPMENT && (
        <Stack direction="row" gap={2} alignItems="center" my={4}>
          <Button variant="outlined" color="primary" onClick={handleShowDbScan} startIcon={<Settings />}>
            Zobrazit DbScan
          </Button>
        </Stack>
      )}

      {showDbScan && <ReactJson src={userAuthRecords} theme="pop" />}
    </>
  );
};
