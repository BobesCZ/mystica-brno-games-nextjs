'use client';

import { ReactNode } from 'react';
import { Alert, Box, Container } from '@mui/material';
import { ButtonAction } from '@/components';
import { UseUserAuthReturn, UserAuthStatus } from './types';
import { DISABLE_USER_AUTH_ON_DEVELOPMENT, IS_DEVELOPMENT } from '../config';

type Props = UseUserAuthReturn & {
  children: ReactNode;
};

export function UserAuth({ userAuthRecord, handleCreateUserAuth, isPending, children }: Props) {
  const applyAuth = !DISABLE_USER_AUTH_ON_DEVELOPMENT && IS_DEVELOPMENT;

  if (applyAuth && userAuthRecord === null) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="info">Pro vstup do Administrace se musíte přihlásit.</Alert>
      </Container>
    );
  }

  if (applyAuth && userAuthRecord === undefined) {
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

  if (applyAuth && userAuthRecord?.status === UserAuthStatus.Waiting) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="info">Váš účet čeká na udělení přístupu do Administrace</Alert>
      </Container>
    );
  }

  if (!applyAuth || (applyAuth && userAuthRecord?.status === UserAuthStatus.Authorized)) {
    return <>{children}</>;
  }

  return null;
}
