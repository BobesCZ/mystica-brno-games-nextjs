export enum CsvColumns {
  SOURCE_NAME = 'Název CZ',
}

export type CsvGame = Record<CsvColumns, string>;
