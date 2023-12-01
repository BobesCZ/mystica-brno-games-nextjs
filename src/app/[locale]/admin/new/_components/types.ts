import { CsvGame } from '@/data';
import { Game } from '@/types';

export type CsvGameWithNotes = CsvGame & {
  notes: Game['notes'];
};
