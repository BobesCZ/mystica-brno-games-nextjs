'use client';

import { ReactNode } from 'react';
import { useUserAuth } from './useUserAuth';
import { Alert, Box, Container } from '@mui/material';
import { ButtonAction } from '@/components';
import { UserAuthRecord, UserAuthStatus } from './types';

type Props = {
  userAuthRecords: UserAuthRecord[];
  children: ReactNode;
};

export function UserAuth({ userAuthRecords, children }: Props) {
  const { userAuthRecord, handleCreateUserAuth, isPending } = useUserAuth(userAuthRecords);

  if (userAuthRecord === null) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="info">Pro vstup do Administrace se musíte přihlásit.</Alert>
      </Container>
    );
  }

  if (userAuthRecord === undefined) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="info">
          Váš účet nemá přístup do Administrace
          <Box mt={2}>
            <ButtonAction onClick={handleCreateUserAuth} isPending={isPending}>
              Požádat o přístup
            </ButtonAction>
          </Box>
        </Alert>
      </Container>
    );
  }

  if (userAuthRecord?.status === UserAuthStatus.Waiting) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="info">Váš účet čeká na udělení přístupu do Administrace</Alert>
      </Container>
    );
  }

  if (userAuthRecord?.status === UserAuthStatus.Authorized) {
    return <>{children}</>;
  }

  return null;
}
