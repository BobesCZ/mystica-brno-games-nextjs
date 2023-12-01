import { BggSearch, BggThingType } from '@code-bucket/board-game-geek';
import { maxBy } from 'lodash-es';
import { stringSimilarity } from 'string-similarity-js';
import { fetchSearchData } from './fetchUtils';

/**
 * Use Search API to get game ID
 */
export const getBggId = async (sourceName: string) => {
  const parsedName = sourceName.replace('–', '');
  const searchResult = await fetchSearchData(parsedName);

  if (!searchResult.length) {
    throw new Error('No results found.');
  }

  const onlyBoardGameType = searchResult.filter(({ type }) => type === BggThingType.boardGame);

  if (!onlyBoardGameType.length) {
    throw new Error('No boardGame found, only expansions.');
  }

  const bggId = getBestResult(sourceName, onlyBoardGameType).id;

  return bggId;
};

/**
 * Find result with exact match (fallback: first result)
 */
const getBestResult = (parsedName: string, searchResult: BggSearch[]): BggSearch => {
  const exactMatch = searchResult.find(({ name }) => name === parsedName);

  if (exactMatch) {
    return exactMatch;
  }

  const mostSimilarMatch = maxBy(searchResult, ({ name }) => stringSimilarity(name, parsedName));

  return mostSimilarMatch || searchResult[0];
};
