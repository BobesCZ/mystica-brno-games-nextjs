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
  alpha,
} from '@mui/material';
import { useState, useTransition } from 'react';
import dynamic from 'next/dynamic';
import { Delete, Done, QueryBuilder, Settings } from '@mui/icons-material';
import { UserAuthRecord, UserAuthStatus, useUserAuth } from '../../../userAuth';
import { authorizeUserAuthRecord, deleteUserAuthRecord } from '@/actions/userAuth';
import { ButtonAction } from '@/components';

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
    status === UserAuthStatus.Authorized ? (
      <Done fontSize="small" sx={{ verticalAlign: 'middle' }} />
    ) : (
      <QueryBuilder fontSize="small" sx={{ verticalAlign: 'middle' }} />
    );

  const getStatusText = (status: `${UserAuthStatus}`) =>
    status === UserAuthStatus.Waiting ? 'Čeká na udělení přístupu' : 'Přístup udělen';

  return (
    <>
      <Typography variant="h2" gutterBottom mt={4}>
        Seznam uživatelů
      </Typography>

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
                  {getStatusIcon(record.status)} {getStatusText(record.status)}
                </TableCell>

                <TableCell component="td" scope="row">
                  <Stack direction={'row'} gap={1}>
                    <ButtonAction
                      color="primary"
                      onClick={() => handleAuthorize(record)}
                      isPending={isPending}
                      startIcon={<Done />}
                      disabled={record?.status === UserAuthStatus.Authorized}
                    >
                      Udělit přistup
                    </ButtonAction>
                    <ButtonAction
                      color="error"
                      onClick={() => handleDelete(record.recordId)}
                      isPending={isPending}
                      startIcon={<Delete />}
                      disabled={userAuthRecord?.recordId === record.recordId}
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

      <Stack direction="row" gap={2} alignItems="center" my={4}>
        <Button variant="outlined" color="primary" onClick={handleShowDbScan} startIcon={<Settings />}>
          Zobrazit DbScan
        </Button>
      </Stack>

      {showDbScan && <ReactJson src={userAuthRecords} theme="pop" />}
    </>
  );
};
