export type CsvGame = Record<string, any>;

export type CsvColumnOption<AllowEnabled extends boolean = true> = AllowEnabled extends true
  ? {
      enabled: boolean;
      colName: string;
    }
  : {
      colName: string;
    };

type CsvColumnTypeOption = CsvColumnOption & {
  typeGame: string;
};

export type CsvColumnLangsOption = CsvColumnOption & {
  langIrrelevant: string;
};

export type CsvColumnsOptions = {
  type: CsvColumnTypeOption;
  name: CsvColumnOption<false>;
  id: CsvColumnOption;
  langs: CsvColumnLangsOption;
  location: CsvColumnOption;
};
