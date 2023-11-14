'use client';

import { AppFooter, AppNav } from '@/components';
import { GameListInfo } from '@/types';
import { Box, Stack } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  gameListInfo?: GameListInfo;
};

export function Layout({ children, gameListInfo }: Props) {
  return (
    <Stack sx={{ minHeight: '100vh' }}>
      <AppNav />
      <Box flexGrow={1}>{children}</Box>
      <AppFooter gameListInfo={gameListInfo} />
    </Stack>
  );
}
