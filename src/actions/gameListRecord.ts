'use server';

import { Game, Status } from '@/types';
import { kv } from '@vercel/kv';
import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache';
import { CacheTags, GameListRecord, GameListRecordStatus } from './types';
import { GAMELIST_RECORDS_KEY } from './config';
import { Urls } from '@/config';

const getGameListRecordsPromise = async (): Promise<GameListRecord[]> => await kv.zrange(GAMELIST_RECORDS_KEY, 0, -1);

export const getGameListRecords = unstable_cache(getGameListRecordsPromise, ['getGameListRecords'], {
  tags: [CacheTags.GAMELIST_RECORDS],
});

export const deleteGameListRecords = async () => {
  await kv.del(GAMELIST_RECORDS_KEY);

  revalidateTag(CacheTags.GAMELIST_RECORDS);
  revalidatePath(Urls.ADMIN);
};

export const createGameListRecord = async (gameList: Game[], recordName: string): Promise<{ recordId: number }> => {
  const recordId = Date.now();

  const gameListRecord: GameListRecord = {
    recordId,
    recordName,
    status: GameListRecordStatus.INCOMPLETED,
    gameList,
  };

  await kv.zadd<GameListRecord>(GAMELIST_RECORDS_KEY, { nx: true }, { score: recordId, member: gameListRecord });

  revalidateTag(CacheTags.GAMELIST_RECORDS);
  revalidatePath(Urls.ADMIN);

  return { recordId };
};

export const updateGameListRecord = async (record: GameListRecord, gameList: Game[]) => {
  const isCompleted = !gameList.find(({ status }) => status === Status.NEW);
  const status = isCompleted ? GameListRecordStatus.COMPLETED : GameListRecordStatus.INCOMPLETED;

  const gameListRecord: GameListRecord = {
    ...record,
    status,
    gameList,
  };

  await kv.zremrangebyscore(GAMELIST_RECORDS_KEY, record.recordId, record.recordId);
  await kv.zadd<GameListRecord>(GAMELIST_RECORDS_KEY, { score: record.recordId, member: gameListRecord });

  revalidateTag(CacheTags.GAMELIST_RECORDS);
  revalidatePath(Urls.ADMIN);
};

export const deleteGameListRecord = async (recordId: number) => {
  await kv.zremrangebyscore(GAMELIST_RECORDS_KEY, recordId, recordId);

  revalidateTag(CacheTags.GAMELIST_RECORDS);
  revalidatePath(Urls.ADMIN);
};
