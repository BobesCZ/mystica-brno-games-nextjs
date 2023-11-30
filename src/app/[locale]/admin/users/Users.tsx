'use client';

import { UserAuthRecord } from '../_components/userAuth';
import { UserAuthRecords } from './_components';

type Props = {
  userAuthRecords: UserAuthRecord[];
};

export default function Users({ userAuthRecords }: Props) {
  return <UserAuthRecords userAuthRecords={userAuthRecords} />;
}
