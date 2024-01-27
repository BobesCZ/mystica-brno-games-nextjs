'use client';

import { Box, Container } from '@mui/material';
import { useRef } from 'react';
import { PageTitle } from '@/components';
import { Game, GameListInfo } from '@/types';
import { Layout } from '../Layout';
import { GameList } from './GameList';
import { useLocale } from 'next-intl';
import { useGroupedGamesByAdded } from './hooks';

type Props = {
  gameList: Game[];
  gameListInfo: GameListInfo;
};

export default function Added({ gameList, gameListInfo }: Props) {
  const resolvedLanguage = useLocale();
  const ref = useRef<HTMLDivElement>(null);

  const { gameGroupedList } = useGroupedGamesByAdded({
    gameList,
    resolvedLanguage,
  });
  // const { currentPageGameList, ...paginationProps } = usePagination({ gameFilteredList, ref });

  return (
    <Layout gameListInfo={gameListInfo}>
      <PageTitle i18nKey="added.pageTitle" />

      <Container>
        <Box ref={ref}>
          <GameList gameGroupedList={gameGroupedList} />
          {/* <Pagination {...paginationProps} /> */}
        </Box>
      </Container>
    </Layout>
  );
}
