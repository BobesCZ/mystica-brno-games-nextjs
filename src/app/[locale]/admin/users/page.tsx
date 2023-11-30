import { getUserAuthRecords } from '@/actions/userAuth';
import Users from './Users';

export default async function UsersPage() {
  const userAuthRecords = await getUserAuthRecords();

  return <Users userAuthRecords={userAuthRecords} />;
}
