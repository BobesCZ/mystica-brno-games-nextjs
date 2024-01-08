import { CsvColumnsOptions } from '@/csvParser';
import { ReactNode } from 'react';

export enum CsvColumnsHelpDemand {
  Required = 'REQUIRED',
  Unrequired = 'UNREQUIRED',
  Rewriting = 'REWRITING',
}

export type CsvColumnsHelp = {
  demand: `${CsvColumnsHelpDemand}`;
  values: string[];
  description: ReactNode | string;
};

export type CsvColumnsHelps = Record<keyof CsvColumnsOptions, CsvColumnsHelp>;
