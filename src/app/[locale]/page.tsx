import { getActiveGameListRecord, getGameList } from '@/actions';
import Search from '@/layouts/Search/Search';

export default async function SearchPage() {
  const gameList = await getGameList();
  const activeGameListRecord = await getActiveGameListRecord();
  const gameListInfo = { gamesCount: gameList.length, recordCreated: activeGameListRecord };

  return <Search gameList={gameList} gameListInfo={gameListInfo} />;
}
