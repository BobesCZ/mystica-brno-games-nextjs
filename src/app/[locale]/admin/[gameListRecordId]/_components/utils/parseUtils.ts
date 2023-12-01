import { CategoryKey, BGG_CATEGORIES, MechanicKey, BGG_MECHANICS, RankNameKey } from '@/bggData';
import { Game, Rank } from '@/types';
import { BggGame, BggThing, BggThingType } from '@code-bucket/board-game-geek';
import { findKey, uniq } from 'lodash-es';

export const getGameFromBggThing = (game: Game, bggThing?: BggThing): Game => {
  if (bggThing?.type === BggThingType.boardGame) {
    const czechVersion = bggThing.versions.find((version) => version.languages.find((lang) => lang.value === 'Czech'));
    const yearpublished = czechVersion?.yearpublished || bggThing.yearpublished;

    if (!yearpublished) {
      throw new Error('Game is still unreleased.');
    }

    const categories = getCategories(bggThing as BggGame);
    const mechanics = getMechanics(bggThing as BggGame);
    const ratings = (bggThing as BggGame).ratings;

    const averageRating = ratings
      ? {
          value: ratings.average,
          usersCount: ratings.usersrated,
        }
      : undefined;

    const averageWeight = ratings
      ? {
          value: ratings.averageweight,
          usersCount: ratings.numweights,
        }
      : undefined;

    const ranks = getRanks(bggThing as BggGame);

    return {
      ...game,
      id: bggThing.id,
      primaryName: bggThing.primaryName,
      yearpublished,
      image: czechVersion?.image || bggThing.image || '',
      playingtime: (bggThing as BggGame).playingtime,
      minplayers: (bggThing as BggGame).minplayers,
      maxplayers: (bggThing as BggGame).maxplayers,
      minage: (bggThing as BggGame).minage,
      categories,
      mechanics,
      averageRating,
      averageWeight,
      ranks,
    };
  }

  throw new Error('Result is not of type boardgame.');
};

const getCategories = (bggThing: BggGame): CategoryKey[] => {
  const originalCategories = bggThing.categories.map((item) => item.value) || [];

  const categories = (originalCategories || [])
    .map((category) => findKey(BGG_CATEGORIES, (item) => item.includes(category)))
    .filter((item): item is CategoryKey => !!item);

  return uniq(categories);
};

const getMechanics = (bggThing: BggGame): MechanicKey[] => {
  const originalMechanics = bggThing.mechanics.map((item) => item.value) || [];

  const mechanics = (originalMechanics || [])
    .map((mechanic) => findKey(BGG_MECHANICS, (item) => item.includes(mechanic)))
    .filter((item): item is MechanicKey => !!item);

  return uniq(mechanics);
};

const getRanks = (bggThing: BggGame): Rank[] =>
  (bggThing.ratings?.ranks || []).map(({ name, value }) => ({
    name: name as RankNameKey,
    value,
  }));
