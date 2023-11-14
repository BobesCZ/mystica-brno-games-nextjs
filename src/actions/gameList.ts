'use server';

import { kv } from '@vercel/kv';
import { CacheTags, GameListRecord } from './types';
import { GAMELIST_RECORDS_KEY } from './config';
import { getActiveGameListRecord } from './activeGameListRecord';
import { Game } from '@/types';
import { unstable_cache } from 'next/cache';

const getGameListPromise = async (): Promise<Game[]> => {
  const activeGameListRecord = await getActiveGameListRecord();

  const [_key, results] = await kv.zscan(GAMELIST_RECORDS_KEY, 0, {
    match: `*${activeGameListRecord}*`,
  });

  const gameList = (results[0] as unknown as GameListRecord)?.gameList;

  return gameList;
};

export const getGameList = unstable_cache(getGameListPromise, ['getGameList'], {
  tags: [CacheTags.ACTIVE_GAMELIST],
});
