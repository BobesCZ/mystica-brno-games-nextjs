import { getActiveGameListRecord, getGameList } from '@/actions';
import Name from '@/layouts/Name/Name';

export default async function NamePage() {
  const gameList = await getGameList();
  const activeGameListRecord = await getActiveGameListRecord();
  const gameListInfo = { gamesCount: gameList.length, recordCreated: activeGameListRecord };

  return <Name gameList={gameList} gameListInfo={gameListInfo} />;
}
