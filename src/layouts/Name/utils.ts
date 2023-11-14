import { Game } from '@/types';
import { NameFilters } from './types';

const normalizeString = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

export const filterGameByName = ({ sourceName, primaryName }: Game, { name }: NameFilters): boolean =>
  !!name &&
  (normalizeString(sourceName).includes(normalizeString(name)) ||
    (!!primaryName && normalizeString(primaryName).includes(normalizeString(name))));
