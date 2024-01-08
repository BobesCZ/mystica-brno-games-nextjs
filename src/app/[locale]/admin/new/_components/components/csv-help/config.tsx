import { CSV_COLUMNS_OPTIONS } from '@/app/[locale]/admin/_components/config';
import { CsvColumnsHelpDemand, CsvColumnsHelps } from './types';
import { VALID_LANGS } from '@/csvParser/config';
import { Lang } from '@/types';

export const CSV_COLUMNS_HELPS: CsvColumnsHelps = {
  type: {
    demand: CsvColumnsHelpDemand.Required,
    values: [CSV_COLUMNS_OPTIONS.type.typeGame, '[prázdné]'],
    description: (
      <>
        <code>GAME</code> = řádek s hrou <br />
        Prázdný řádek se přiřadí jako poznámka k nejbližšímu předchozímu řádku s hrou
      </>
    ),
  },
  name: {
    demand: CsvColumnsHelpDemand.Required,
    values: ['[text]'],
    description:
      'Název, podle kterého se hra hledá na BGG. Neměl by obsahovat žádné jiné informace (edice, jazyky apod.)',
  },
  id: {
    demand: CsvColumnsHelpDemand.Unrequired,
    values: ['[text]'],
    description: 'ID hry na BGG (lze získat z URL)',
  },
  langs: {
    demand: CsvColumnsHelpDemand.Unrequired,
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
  location: {
    demand: CsvColumnsHelpDemand.Unrequired,
    values: ['[text]'],
    description: 'Umístění hry v místnosti nebo regálu',
  },
  yearpublished: {
    demand: CsvColumnsHelpDemand.Rewriting,
    values: ['[text]'],
    description: 'Rok vydání hry',
  },
  image: {
    demand: CsvColumnsHelpDemand.Rewriting,
    values: ['[text]'],
    description: 'URL adresa obrázku',
  },
  playingtime: {
    demand: CsvColumnsHelpDemand.Rewriting,
    values: ['[text]'],
    description: 'Herní doba (v minutách)',
  },
  minplayers: {
    demand: CsvColumnsHelpDemand.Rewriting,
    values: ['[text]'],
    description: 'Minimální počet hráčů',
  },
  maxplayers: {
    demand: CsvColumnsHelpDemand.Rewriting,
    values: ['[text]'],
    description: 'Maximální počet hráčů',
  },
};
