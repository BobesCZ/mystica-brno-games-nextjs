import { GameCard } from '@/components/game-card';
import { Alert, AlertTitle, Box, Typography, alpha } from '@mui/material';
import { useTranslations } from 'next-intl';
import { GameGroupedList } from './types';

type Props = {
  gameGroupedList?: GameGroupedList;
};

export const GameList = ({ gameGroupedList }: Props) => {
  const t = useTranslations();

  return (
    <Box py={4}>
      {gameGroupedList !== undefined && Object.values(gameGroupedList).length ? (
        <>
          {Object.entries(gameGroupedList).map(([groupName, gameList]) => (
            <Box mt={1} mb={8} key={groupName}>
              <Box pt={1} mb={4} sx={(theme) => ({ background: alpha(theme.palette.secondary.main, 0.4) })}>
                <Typography variant="h2" textAlign="center">
                  {groupName}{' '}
                  <Typography variant="h2" component="span" color="text.secondary">
                    ({gameList.length})
                  </Typography>
                </Typography>
              </Box>
              <Box
                sx={(theme) => ({
                  display: 'grid',
                  gap: 3,
                  gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
                  [theme.breakpoints.up('md')]: {
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  },
                  [theme.breakpoints.up('lg')]: {
                    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                  },
                })}
              >
                {gameList.map((game) => (
                  <GameCard key={game.uid} game={game} />
                ))}
              </Box>
            </Box>
          ))}
        </>
      ) : (
        <Alert variant="outlined" severity="info">
          <AlertTitle>{t('gameList.noResults.title')}</AlertTitle>
          {t('gameList.noResults.content')}
        </Alert>
      )}
    </Box>
  );
};
