import { camelCase } from 'lodash-es';
import { Game, Lang, Status } from '@/types';
import { CsvColumnsOptions, CsvGame } from './types';
import { VALID_LANGS } from './config';

const getGameUid = (csvGame: CsvGame, langs: Lang[], options: CsvColumnsOptions): string =>
  camelCase(`${csvGame[options.name.colName]} ${langs.join(' ')} ${csvGame?.notes?.[0]?.substring(0, 15) ?? ''}`);

export const getGameFromCsv = (csvGame: CsvGame, options: CsvColumnsOptions): Game => {
  const id = options.id.enabled ? parseInt(csvGame[options.id.colName]) || undefined : undefined;
  const location = options.location.enabled ? csvGame[options.location.colName].toString() : undefined;

  const langs = options.langs.enabled
    ? ((csvGame[options.langs.colName] as string) ?? '')
        .split(',')
        .map((lang) => lang.trim())
        .map((lang) => (lang === options.langs.langIrrelevant ? Lang.Irrelevant : lang))
        .filter((lang): lang is Lang => VALID_LANGS.includes(lang as Lang))
    : [];

  return {
    uid: getGameUid(csvGame, langs, options),
    sourceName: csvGame[options.name.colName].toString(),
    id,
    langs,
    notes: csvGame.notes,
    location,
    status: Status.NEW,
  };
};
