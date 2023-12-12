import { camelCase } from 'lodash-es';
import { CsvColumns, CsvGame } from '@/data';
import { Game, Lang, Status } from '@/types';
import { CsvGameWithNotes } from './types';

/**
 * Every row with empty TYPE is merged to nearest upper row with TYPE = GAME into its `notes`
 */
export const mergeNotesToCsvGame = (csvGames: CsvGame[]): CsvGameWithNotes[] =>
  csvGames.reduce((acc: CsvGameWithNotes[], csvGame: CsvGame, index) => {
    const csvGameWithNotes = {
      ...csvGame,
      notes: undefined,
    };

    return [...acc, csvGameWithNotes];
  }, []);

const getGameUid = (csvGame: CsvGameWithNotes, langs: Lang[]): string =>
  camelCase(`${csvGame[CsvColumns.SOURCE_NAME]} ${langs.join(' ')} ${csvGame?.notes?.[0]?.substring(0, 15) ?? ''}`);

export const getGameFromCsv = (csvGame: CsvGameWithNotes): Game => {
  const langs = ''
    .split(',')
    .map((lang) => lang.trim())
    .filter((lang): lang is Lang => Object.values(Lang).includes(lang as Lang));

  return {
    uid: getGameUid(csvGame, langs),
    sourceName: csvGame[CsvColumns.SOURCE_NAME].toString(),
    id: undefined,
    langs,
    notes: csvGame.notes,
    status: Status.NEW,
  };
};
