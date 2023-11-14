'use client';

import { Box, Container } from '@mui/material';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { RANK_DEFAULT_VALUES } from './config';
import { RankForm } from './components';
import { RankFilters } from './types';
import { useFilteredGamesByRank } from './hooks';
import { PageTitle, GameList, usePagination, Pagination } from '@/components';
import { Game, GameListInfo } from '@/types';
import { Layout } from '../Layout';

type Props = {
  gameList: Game[];
  gameListInfo: GameListInfo;
};

export default function Rank({ gameList, gameListInfo }: Props) {
  const methods = useForm<RankFilters>({
    defaultValues: RANK_DEFAULT_VALUES,
  });
  const filters = methods.watch();
  const ref = useRef<HTMLDivElement>(null);

  const { gameFilteredList, ...options } = useFilteredGamesByRank({
    filters,
    gameList,
  });
  const { currentPageGameList, ...paginationProps } = usePagination({ gameFilteredList, ref });

  return (
    <Layout gameListInfo={gameListInfo}>
      <PageTitle i18nKey="rank.pageTitle" dense />

      <FormProvider {...methods}>
        <Box component="form" onSubmit={methods.handleSubmit((_, e) => e?.preventDefault())}>
          <RankForm {...options} />
          <Container>
            <Box ref={ref}>
              <GameList gameList={currentPageGameList} gameTotalCount={gameFilteredList.length} />
              <Pagination {...paginationProps} />
            </Box>
          </Container>
        </Box>
      </FormProvider>
    </Layout>
  );
}
