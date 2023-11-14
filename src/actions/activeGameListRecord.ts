'use server';

import { kv } from '@vercel/kv';
import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache';
import { ACTIVE_GAMELIST_RECORD_KEY } from './config';
import { CacheTags } from './types';
import { Urls } from '@/config';

const getActiveGameListRecordPromise = async () => {
  const activeId = await kv.get<string | null>(ACTIVE_GAMELIST_RECORD_KEY);

  return activeId ? parseInt(activeId) : undefined;
};

export const getActiveGameListRecord = unstable_cache(getActiveGameListRecordPromise, ['getActiveGameListRecord'], {
  tags: [CacheTags.ACTIVE_GAMELIST],
});

export const setActiveGameListRecord = async (recordId: number) => {
  await kv.set(ACTIVE_GAMELIST_RECORD_KEY, recordId);

  revalidateTag(CacheTags.ACTIVE_GAMELIST);
  revalidatePath(Urls.ADMIN);
};
