import { getActiveGameListRecord, getGameListRecords } from '@/actions';
import { notFound } from 'next/navigation';
import { GameListRecordDetail } from './_components/GameListRecordDetail';

type Props = {
  params: {
    gameListRecordId: string;
  };
};

export default async function GameListRecordPage({ params: { gameListRecordId } }: Props) {
  const gameListRecords = await getGameListRecords();
  const activeGameListRecord = await getActiveGameListRecord();

  const parsedRecordId = parseInt(gameListRecordId);
  const gameListRecord = gameListRecords.find(({ recordId }) => recordId === parsedRecordId);

  return gameListRecord ? (
    <GameListRecordDetail activeGameListRecord={activeGameListRecord} gameListRecord={gameListRecord} />
  ) : (
    notFound()
  );
}
