import { getActiveGameListRecord, getGameList } from '@/actions';
import Faq from '@/layouts/Faq/Faq';

export default async function FaqPage() {
  const gameList = await getGameList();
  const activeGameListRecord = await getActiveGameListRecord();
  const gameListInfo = { gamesCount: gameList.length, recordCreated: activeGameListRecord };

  return <Faq gameListInfo={gameListInfo} />;
}
