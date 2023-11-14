import { getActiveGameListRecord, getGameList } from '@/actions';
import Rank from '@/layouts/Rank/Rank';

export default async function RankPage() {
  const gameList = await getGameList();
  const activeGameListRecord = await getActiveGameListRecord();
  const gameListInfo = { gamesCount: gameList.length, recordCreated: activeGameListRecord };

  return <Rank gameList={gameList} gameListInfo={gameListInfo} />;
}
