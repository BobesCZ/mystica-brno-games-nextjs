import { AppBar, Avatar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';

export const AppNav = () => {
  const { data: session } = useSession();

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography sx={{ pt: 0.5 }}>Administrace</Typography>
          </Stack>
          <Box ml={2} mr={-1}>
            {session ? (
              <Stack direction="row" alignItems="center" gap={1}>
                <Avatar alt="Remy Sharp" src={session?.user?.image ?? undefined} sx={{ width: 32, height: 32 }} />
                <Typography title={session.user?.email || ''}>{session.user?.name}</Typography>
                <Button variant="outlined" sx={{ color: '#fff', borderColor: '#fff', ml: 2 }} onClick={() => signOut()}>
                  Odhlásit se
                </Button>
              </Stack>
            ) : (
              <Button variant="outlined" sx={{ color: '#fff', borderColor: '#fff', ml: 2 }} onClick={() => signIn()}>
                Přihlásit se
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
