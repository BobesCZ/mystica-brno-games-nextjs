'use client';

import { Box, Container } from '@mui/material';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useFilteredGamesByName } from './hooks';
import { PageTitle, GameList, usePagination, Pagination } from '@/components';
import { NAME_DEFAULT_VALUES } from './config';
import { NameFilters } from './types';
import { NameForm } from './components';
import { Game, GameListInfo } from '@/types';
import { Layout } from '../Layout';

type Props = {
  gameList: Game[];
  gameListInfo: GameListInfo;
};

export default function Name({ gameList, gameListInfo }: Props) {
  const methods = useForm<NameFilters>({
    defaultValues: NAME_DEFAULT_VALUES,
  });
  const filters = methods.watch();
  const ref = useRef<HTMLDivElement>(null);

  const { gameFilteredList } = useFilteredGamesByName({ filters, gameList });
  const { currentPageGameList, ...paginationProps } = usePagination({ gameFilteredList, ref });

  return (
    <Layout gameListInfo={gameListInfo}>
      <PageTitle i18nKey="name.pageTitle" dense />
      <FormProvider {...methods}>
        <Box component="form" onSubmit={methods.handleSubmit((_, e) => e?.preventDefault())}>
          <NameForm />
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
