'use server';

import { Urls } from '@/config';
import { Game, Status } from '@/types';
import { revalidatePath } from 'next/cache';
import { GameListRecordStatus } from './types';

export const revalidateAllAdminPaths = () => {
  revalidatePath(Urls.ADMIN);
  revalidatePath(Urls.ADMIN_NEW);
  revalidatePath(Urls.ADMIN_USERS);
  revalidatePath(Urls.ADMIN_SETTINGS);
};

export const geteGameListRecordStatus = (gameList: Game[]): GameListRecordStatus => {
  const isCompleted = !gameList.find(({ status }) => status === Status.NEW);
  const status = isCompleted ? GameListRecordStatus.COMPLETED : GameListRecordStatus.INCOMPLETED;

  return status;
};
