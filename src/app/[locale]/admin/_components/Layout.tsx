'use client';

import { Container, Stack } from '@mui/material';
import { ReactNode } from 'react';
import { ThemeRegistry } from './theme/ThemeRegistry';
import { AppNav } from './AppNav';
import { UserAuth } from './userAuth/UserAuth';
import { UserAuthRecord, useUserAuth } from './userAuth';
import LeftMenu from './LeftMenu';

type Props = {
  userAuthRecords: UserAuthRecord[];
  children: ReactNode;
};

export function Layout({ userAuthRecords, children }: Props) {
  const { userAuthRecord, handleCreateUserAuth, isPending } = useUserAuth(userAuthRecords);

  return (
    <ThemeRegistry>
      <Stack sx={{ minHeight: '100vh' }}>
        <AppNav userAuthRecord={userAuthRecord} />
        <Stack direction="row" flexGrow={1}>
          <UserAuth userAuthRecord={userAuthRecord} handleCreateUserAuth={handleCreateUserAuth} isPending={isPending}>
            <LeftMenu />
            <Container maxWidth="lg" sx={{ ml: 4 }}>
              {children}
            </Container>
          </UserAuth>
        </Stack>
      </Stack>
    </ThemeRegistry>
  );
}
