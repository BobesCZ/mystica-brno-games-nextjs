import { useMemo } from 'react';
import { groupBy, orderBy } from 'lodash-es';
import { Game } from '@/types';
import { useTranslations } from 'next-intl';
import { orderGameByAdded } from '@/layouts/Search/utils';
import { getGroupGameByAdded } from './utils';
import { GameGroupedList } from '../types';

type Props = {
  gameList: Game[];
  resolvedLanguage: string;
};

type Return = {
  gameGroupedList?: GameGroupedList;
};

export const useGroupedGamesByAdded = ({ gameList, resolvedLanguage }: Props): Return => {
  const t = useTranslations();

  const gameGroupedList = useMemo(() => {
    const orderedList = orderBy(gameList || [], orderGameByAdded, 'desc');
    const groupedList = groupBy(orderedList, getGroupGameByAdded(resolvedLanguage));

    return groupedList;
  }, [gameList, resolvedLanguage]);

  return {
    gameGroupedList,
  };
};
