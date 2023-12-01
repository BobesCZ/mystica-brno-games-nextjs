import { camelCase, takeWhile } from 'lodash-es';
import { CsvColumns, CsvGame, CsvGameType } from '@/data';
import { Game, Lang, Status } from '@/types';
import { CsvGameWithNotes } from './types';

/**
 * Every row with empty TYPE is merged to nearest upper row with TYPE = GAME into its `notes`
 */
export const mergeNotesToCsvGame = (csvGames: CsvGame[]): CsvGameWithNotes[] =>
  csvGames.reduce((acc: CsvGameWithNotes[], csvGame: CsvGame, index) => {
    if (csvGame[CsvColumns.TYPE] === CsvGameType.GAME) {
      const noteRelatedToGame = takeWhile(csvGames.slice(index + 1), (i) => i[CsvColumns.TYPE] !== CsvGameType.GAME);
      const csvGameWithNotes = {
        ...csvGame,
        notes: noteRelatedToGame?.map((csvGame) => csvGame[CsvColumns.SOURCE_NAME]),
      };

      return [...acc, csvGameWithNotes];
    }

    return acc;
  }, []);

const getGameUid = (csvGame: CsvGameWithNotes, langs: Lang[]): string =>
  camelCase(`${csvGame[CsvColumns.SOURCE_NAME]} ${langs.join(' ')} ${csvGame?.notes?.[0]?.substring(0, 15) ?? ''}`);

export const getGameFromCsv = (csvGame: CsvGameWithNotes): Game => {
  const langs = (csvGame[CsvColumns.LANGS] ?? '')
    .split(',')
    .map((lang) => lang.trim())
    .filter((lang): lang is Lang => Object.values(Lang).includes(lang as Lang));

  return {
    uid: getGameUid(csvGame, langs),
    sourceName: csvGame[CsvColumns.SOURCE_NAME].toString(),
    id: parseInt(csvGame[CsvColumns.ID]) || undefined,
    langs,
    notes: csvGame.notes,
    status: Status.NEW,
  };
};
