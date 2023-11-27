'use client';

import Container from '@mui/material/Container';
import { Layout } from '../Layout';
import { CsvLoader, GameListRecordDetail, GameListRecords, UserAuthRecords } from './components';
import { GameListRecord } from '@/actions/types';
import { useState } from 'react';
import { Divider } from '@mui/material';
import { UserAuthRecord } from '../userAuth';

type Props = {
  gameListRecords: GameListRecord[];
  activeGameListRecord?: number;
  userAuthRecords: UserAuthRecord[];
};

export default function Admin({ gameListRecords, activeGameListRecord, userAuthRecords }: Props) {
  const [selectedRecordId, setSelectedRecordId] = useState<number>();
  const [showCreatePage, setShowCreatePage] = useState(false);
  const selectedRecord = gameListRecords.find(({ recordId }) => recordId === selectedRecordId);

  const onShowCreatePage = () => {
    setShowCreatePage(true);
    setSelectedRecordId(undefined);
  };

  const handleSelectRecord = (recordId?: number) => {
    setShowCreatePage(false);
    setSelectedRecordId(recordId);
  };

  return (
    <Layout userAuthRecords={userAuthRecords}>
      <Container maxWidth="lg">
        <UserAuthRecords userAuthRecords={userAuthRecords} />

        <Divider sx={{ mb: 3 }} />

        <GameListRecords
          gameListRecords={gameListRecords}
          selectedRecordId={selectedRecordId}
          handleSelectRecord={handleSelectRecord}
          onShowCreatePage={onShowCreatePage}
          activeGameListRecord={activeGameListRecord}
        />

        <Divider sx={{ mb: 3 }} />

        {showCreatePage && <CsvLoader handleSelectRecord={handleSelectRecord} />}

        {selectedRecord && (
          <GameListRecordDetail
            handleSelectRecord={handleSelectRecord}
            activeGameListRecord={activeGameListRecord}
            selectedRecord={selectedRecord}
          />
        )}
      </Container>
    </Layout>
  );
}
