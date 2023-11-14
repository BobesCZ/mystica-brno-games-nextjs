import { Game } from '@/types';

export enum GameListRecordStatus {
  INCOMPLETED = 'incompleted',
  COMPLETED = 'completed',
}

export type GameListRecord = {
  recordId: number;
  status: `${GameListRecordStatus}`;
  gameList: Game[];
};

export enum CacheTags {
  ACTIVE_GAMELIST = 'activeGameList',
  GAMELIST_RECORDS = 'gameListRecords',
}
