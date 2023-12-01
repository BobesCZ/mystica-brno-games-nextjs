import { getUserAuthRecords } from '@/actions/userAuth';
import Users from './_components/Users';

export default async function UsersPage() {
  const userAuthRecords = await getUserAuthRecords();

  return <Users userAuthRecords={userAuthRecords} />;
}
