import { AppBar, Avatar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';
import { LEFT_MENU_WIDTH } from './config';
import { UseUserAuthReturn, UserAuthStatus } from './userAuth';
import { Link } from '@/components';
import { Urls } from '@/config';

type Props = Pick<UseUserAuthReturn, 'userAuthRecord'>;

export const AppNav = ({ userAuthRecord }: Props) => {
  const { data: session } = useSession();
  const leftMenuDisplayed = userAuthRecord?.status === UserAuthStatus.Authorized;

  return (
    <AppBar position="sticky" sx={leftMenuDisplayed ? { pl: LEFT_MENU_WIDTH / 8 + 4 } : undefined}>
      <Container maxWidth="lg" sx={leftMenuDisplayed ? { ml: 0 } : undefined}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" alignItems="center" gap={1}>
            <Link color="#fff" underline="none" href={Urls.ADMIN}>
              Administrace
            </Link>
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
