'use client';

import { Box, Stack } from '@mui/material';
import { ReactNode } from 'react';
import { ThemeRegistry } from './theme/ThemeRegistry';
import { AppNav } from './AppNav';
import { UserAuth } from './userAuth/UserAuth';
import { UserAuthRecord } from './userAuth';

type Props = {
  userAuthRecords: UserAuthRecord[];
  children: ReactNode;
};

export function Layout({ userAuthRecords, children }: Props) {
  return (
    <ThemeRegistry>
      <Stack sx={{ minHeight: '100vh' }}>
        <AppNav />
        <Box flexGrow={1}>
          <UserAuth userAuthRecords={userAuthRecords}>{children}</UserAuth>
        </Box>
      </Stack>
    </ThemeRegistry>
  );
}
