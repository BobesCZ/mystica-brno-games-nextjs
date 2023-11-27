import { getActiveGameListRecord, getGameListRecords } from '@/actions';
import Admin from './_components/Admin/Admin';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { SessionProvider } from './_components/SessionProvider';
import { getUserAuthRecords } from '@/actions/userAuth';

export default async function AdminPage() {
  const gameListRecords = await getGameListRecords();
  const activeGameListRecord = await getActiveGameListRecord();
  const userAuthRecords = await getUserAuthRecords();
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <Admin
        gameListRecords={gameListRecords}
        activeGameListRecord={activeGameListRecord}
        userAuthRecords={userAuthRecords}
      />
    </SessionProvider>
  );
}
