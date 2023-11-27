import { Game } from '@/types';

export enum GameListRecordStatus {
  INCOMPLETED = 'incompleted',
  COMPLETED = 'completed',
}

export type GameListRecord = {
  recordId: number;
  recordName: string;
  status: `${GameListRecordStatus}`;
  gameList: Game[];
};

export enum CacheTags {
  ACTIVE_GAMELIST = 'activeGameList',
  GAMELIST_RECORDS = 'gameListRecords',
  USER_AUTH_RECORDS = 'userAuthRecords',
}
