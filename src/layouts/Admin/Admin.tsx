'use client';

import Container from '@mui/material/Container';
import { Layout } from '../Layout';
import { BggLoader, CsvLoader, GameListRecordDetail, GameListRecords } from './components';
import { GameListRecord } from '@/actions/types';
import { useState } from 'react';
import { Divider } from '@mui/material';

type Props = {
  gameListRecords: GameListRecord[];
  activeGameListRecord?: number;
};

export default function Admin({ gameListRecords, activeGameListRecord }: Props) {
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
    <Layout>
      <Container maxWidth="lg">
        <GameListRecords
          gameListRecords={gameListRecords}
          selectedRecordId={selectedRecordId}
          handleSelectRecord={handleSelectRecord}
          onShowCreatePage={onShowCreatePage}
          activeGameListRecord={activeGameListRecord}
        />
        <Divider sx={{ mb: 3 }} />
        {showCreatePage && <CsvLoader handleSelectRecord={handleSelectRecord} />}
        {!!selectedRecordId && (
          <GameListRecordDetail
            selectedRecordId={selectedRecordId}
            handleSelectRecord={handleSelectRecord}
            activeGameListRecord={activeGameListRecord}
            selectedRecord={selectedRecord}
          />
        )}
        {!!selectedRecord && <BggLoader selectedRecord={selectedRecord} />}
      </Container>
    </Layout>
  );
}
