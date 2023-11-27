'use server';

import { kv } from '@vercel/kv';
import { USER_AUTH_RECORDS_KEY } from './config';
import { Session } from 'next-auth';
import { CacheTags } from './types';
import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache';
import { Urls } from '@/config';
import { UserAuthRecord, UserAuthStatus } from '@/app/[locale]/admin/_components/userAuth';

const getUserAuthRecordsPromise = async (): Promise<UserAuthRecord[]> => await kv.zrange(USER_AUTH_RECORDS_KEY, 0, -1);

export const getUserAuthRecords = unstable_cache(getUserAuthRecordsPromise, ['getUserAuthRecords'], {
  tags: [CacheTags.USER_AUTH_RECORDS],
});

export const createUserAuthRecord = async (user: Session['user']) => {
  const recordId = Date.now();

  const userAuthRecord: UserAuthRecord = {
    recordId,
    status: UserAuthStatus.Waiting,
    user: {
      name: user?.name || '--',
      email: user?.email || '--',
    },
  };

  await kv.zadd<UserAuthRecord>(USER_AUTH_RECORDS_KEY, { nx: true }, { score: recordId, member: userAuthRecord });

  revalidateTag(CacheTags.USER_AUTH_RECORDS);
  revalidatePath(Urls.ADMIN);
};

export const authorizeUserAuthRecord = async (record: UserAuthRecord) => {
  const userAuthRecord: UserAuthRecord = {
    ...record,
    status: UserAuthStatus.Authorized,
  };

  await kv.zremrangebyscore(USER_AUTH_RECORDS_KEY, record.recordId, record.recordId);
  await kv.zadd<UserAuthRecord>(USER_AUTH_RECORDS_KEY, { score: record.recordId, member: userAuthRecord });

  revalidateTag(CacheTags.USER_AUTH_RECORDS);
  revalidatePath(Urls.ADMIN);
};

export const deleteUserAuthRecord = async (recordId: number) => {
  await kv.zremrangebyscore(USER_AUTH_RECORDS_KEY, recordId, recordId);

  revalidateTag(CacheTags.USER_AUTH_RECORDS);
  revalidatePath(Urls.ADMIN);
};
