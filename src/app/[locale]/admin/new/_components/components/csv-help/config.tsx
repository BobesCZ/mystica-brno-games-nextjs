import { CSV_COLUMNS_OPTIONS } from '@/app/[locale]/admin/_components/config';
import { CsvColumnsHelps } from './types';
import { VALID_LANGS } from '@/csvParser/config';
import { Lang } from '@/types';

export const CSV_COLUMNS_HELPS: CsvColumnsHelps = {
  type: {
    required: true,
    values: [CSV_COLUMNS_OPTIONS.type.typeGame, '[prázdné]'],
    description: (
      <>
        <code>GAME</code> = řádek s hrou <br />
        Prázdný řádek se přiřadí jako poznámka k nejbližšímu předchozímu řádku s hrou
      </>
    ),
  },
  name: {
    required: true,
    values: ['[text]'],
    description:
      'Název, podle kterého se hra hledá na BGG. Neměl by obsahovat žádné jiné informace (edice, jazyky apod.)',
  },
  id: {
    required: false,
    values: ['[text]'],
    description: 'ID hry na BGG (lze získat z URL)',
  },
  langs: {
    required: false,
    values: VALID_LANGS.map((lang) => (lang === Lang.Irrelevant ? CSV_COLUMNS_OPTIONS.langs.langIrrelevant : lang)),
    description: (
      <>
        Jazyková verze hry <br />
        <code>{CSV_COLUMNS_OPTIONS.langs.langIrrelevant}</code> = Nezávislé na jazyce (např. obrázkové hry), ve filtraci
        se zobrazuje vždy <br />U hry s obrázkovými komponenty a návodem v češtině doporučujeme{' '}
        <code>CZ, {CSV_COLUMNS_OPTIONS.langs.langIrrelevant}</code>
      </>
    ),
  },
};
