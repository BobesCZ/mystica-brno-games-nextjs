'use client';

import { GameListRecords } from './components';
import { GameListRecord } from '@/actions/types';
import { UserAuthRecord } from '../userAuth';

type Props = {
  gameListRecords: GameListRecord[];
  activeGameListRecord?: number;
  userAuthRecords: UserAuthRecord[];
};

export default function Admin({ gameListRecords, activeGameListRecord }: Props) {
  return <GameListRecords gameListRecords={gameListRecords} activeGameListRecord={activeGameListRecord} />;
}
