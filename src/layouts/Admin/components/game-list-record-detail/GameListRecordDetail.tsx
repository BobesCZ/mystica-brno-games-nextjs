'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import { useTransition } from 'react';
import { deleteGameListRecord, setActiveGameListRecord } from '@/actions';
import { Delete, Download, Visibility } from '@mui/icons-material';
import { ButtonAction } from '@/components';
import { GameListRecord } from '@/actions/types';

type Props = {
  selectedRecordId: number;
  handleSelectRecord: (recordId?: number) => void;
  activeGameListRecord?: number;
  selectedRecord?: GameListRecord;
};

export const GameListRecordDetail = ({
  selectedRecordId,
  handleSelectRecord,
  activeGameListRecord,
  selectedRecord,
}: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(() => deleteGameListRecord(selectedRecordId));
    handleSelectRecord(undefined);
  };

  const handleActivate = async () => {
    startTransition(() => setActiveGameListRecord(selectedRecordId));
  };

  const handleDownload = () => {
    const content = JSON.stringify(selectedRecord, undefined, 2);

    const link = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = 'record.json';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <>
      <Typography variant="h2" gutterBottom>
        Verze: {selectedRecord?.recordName || ''}{' '}
        <Box component="span" fontWeight="normal">
          ({new Date(selectedRecordId).toLocaleString()})
        </Box>
      </Typography>

      <Stack direction="row" gap={2} alignItems="center" my={4}>
        <ButtonAction
          color="error"
          onClick={handleDelete}
          isPending={isPending}
          startIcon={<Delete />}
          disabled={activeGameListRecord === selectedRecordId}
        >
          Smazat tuto verzi
        </ButtonAction>

        <Button color="primary" variant="outlined" onClick={handleDownload} startIcon={<Download />}>
          Stáhnout JSON
        </Button>

        <ButtonAction
          color="success"
          onClick={handleActivate}
          isPending={isPending}
          disabled={activeGameListRecord === selectedRecordId}
          startIcon={<Visibility />}
        >
          Označit jako aktivní
        </ButtonAction>
      </Stack>
    </>
  );
};
