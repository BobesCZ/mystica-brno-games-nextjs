import { Session } from 'next-auth';
import { UserAuthRecord } from './types';

export const getUserAuthRecord = ({ user }: Session, userAuthRecords: UserAuthRecord[]) =>
  userAuthRecords.find(({ user: { name, email } }) => name === user?.name && email === user.email);
