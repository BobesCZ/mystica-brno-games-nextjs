import { CsvColumnsOptions, CsvColumnLangsOption } from '@/csvParser';
import { Game, Lang } from '@/types';

export const getColumnValue = (
  column: string,
  columnOption: CsvColumnsOptions[keyof CsvColumnsOptions],
  game: Game,
) => {
  switch (column) {
    case 'type': {
      return game.notes;
    }
    case 'langs': {
      const langIrrelevant = (columnOption as CsvColumnLangsOption)?.langIrrelevant;

      return game[column]?.map((lang) => (lang === Lang.Irrelevant ? langIrrelevant : lang));
    }
    default: {
      return game[column as keyof Omit<CsvColumnsOptions, 'type' | 'name'>];
    }
  }
};
