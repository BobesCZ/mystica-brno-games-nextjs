'use client';

import { UserAuthRecord } from './types';
import { useSession } from 'next-auth/react';
import { getUserAuthRecord } from './utils';
import { useTransition } from 'react';
import { createUserAuthRecord } from '@/actions/userAuth';

type UseUserAuthReturn = {
  userAuthRecord: UserAuthRecord | null | undefined;
  handleCreateUserAuth: () => Promise<void>;
  isPending: boolean;
};

export const useUserAuth = (userAuthRecords: UserAuthRecord[]): UseUserAuthReturn => {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();

  const userAuthRecord = !session ? null : getUserAuthRecord(session, userAuthRecords);

  const handleCreateUserAuth = async () => {
    if (!session?.user) return;
    startTransition(() => createUserAuthRecord(session.user));
  };

  return { userAuthRecord, handleCreateUserAuth, isPending };
};
