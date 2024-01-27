import { useMemo } from 'react';
import { filterGamebyCategory, orderGameByAdded, orderGameByRating, orderGameByWeight } from '../utils';
import { CategoryFilters, CategoryGroup, MechanicGroup } from '../types';
import {
  getAutocompleteOptions,
  getCategoryGroup,
  getLangOptions,
  getMechanicGroup,
  getOrderingOptions,
  getPlayersCountOptions,
  getPlayingTimeOptions,
} from './utils';
import { orderBy } from 'lodash-es';
import { ControlledSelectOption, ControlleAutocompleteOption } from '@/components';
import { Game, GameOrdering } from '@/types';
import { useTranslations } from 'next-intl';

type Props = {
  filters: CategoryFilters;
  gameList: Game[];
  locale: string;
};

type Return = {
  gameFilteredList: Game[];
  playersCountOptions: ControlledSelectOption<CategoryFilters, 'playersCount'>[];
  playingTimeOptions: ControlledSelectOption<CategoryFilters, 'playingTime'>[];
  categoryOptions: ControlleAutocompleteOption[];
  mechanicsOptions: ControlleAutocompleteOption[];
  langOptions: ControlledSelectOption<CategoryFilters, 'lang'>[];
  orderingOptions: ControlledSelectOption<CategoryFilters, 'ordering'>[];
};

export const useFilteredGamesByCategory = ({ filters, gameList, locale }: Props): Return => {
  const t = useTranslations();

  const gameFilteredList = useMemo(() => {
    const list = (gameList || []).filter((game) => filterGamebyCategory(game, filters));

    if (filters.ordering === GameOrdering.NAME) {
      return list.sort((a, b) => a.sourceName.localeCompare(b.sourceName, locale));
    }

    if (filters.ordering === GameOrdering.WEIGHT) {
      return orderBy(list, orderGameByWeight, 'desc');
    }

    if (filters.ordering === GameOrdering.ADDED) {
      return orderBy(list, orderGameByAdded, 'desc');
    }

    return orderBy(list, orderGameByRating, 'desc');
  }, [gameList, filters, locale]);

  const playersCountOptions = useMemo(() => getPlayersCountOptions(t), [t]);
  const playingTimeOptions = useMemo(() => getPlayingTimeOptions(t), [t]);

  const categoryOptions = useMemo(
    () =>
      getAutocompleteOptions({
        gameList,
        t,
        locale,
        key: 'categories',
        getGroup: getCategoryGroup,
        GroupEnum: CategoryGroup,
      }),
    [gameList, locale, t],
  );

  const mechanicsOptions = useMemo(
    () =>
      getAutocompleteOptions({
        gameList,
        t,
        locale,
        key: 'mechanics',
        getGroup: getMechanicGroup,
        GroupEnum: MechanicGroup,
      }),
    [gameList, locale, t],
  );

  const langOptions = useMemo(() => getLangOptions(t), [t]);
  const orderingOptions = useMemo(() => getOrderingOptions(t), [t]);

  return {
    gameFilteredList,
    playersCountOptions,
    playingTimeOptions,
    categoryOptions,
    mechanicsOptions,
    langOptions,
    orderingOptions,
  };
};
