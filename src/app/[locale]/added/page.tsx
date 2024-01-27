import { getActiveGameListRecord, getGameList } from '@/actions';
import Added from '@/layouts/Added/Added';

export default async function AddedPage() {
  const gameList = await getGameList();
  const activeGameListRecord = await getActiveGameListRecord();
  const gameListInfo = { gamesCount: gameList.length, recordCreated: activeGameListRecord };

  return <Added gameList={gameList} gameListInfo={gameListInfo} />;
}
