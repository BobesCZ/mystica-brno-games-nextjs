import { getActiveGameListRecord, getGameListRecords } from '@/actions';
import Admin from './_components/Admin/Admin';
import { getUserAuthRecords } from '@/actions/userAuth';

export default async function AdminPage() {
  const gameListRecords = await getGameListRecords();
  const activeGameListRecord = await getActiveGameListRecord();
  const userAuthRecords = await getUserAuthRecords();

  return (
    <Admin
      gameListRecords={gameListRecords}
      activeGameListRecord={activeGameListRecord}
      userAuthRecords={userAuthRecords}
    />
  );
}
