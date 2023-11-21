'use client';

import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { useTransition } from 'react';
import { ButtonAction } from '@/components';
import { deleteGameListRecords } from '@/actions';
import { Delete } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

type Props = {
  isModalOpened: boolean;
  handleCloseModal: () => void;
};

export const ConfirmDeleteModal = ({ isModalOpened, handleCloseModal }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleDeleteRecords = async () => {
    startTransition(() => deleteGameListRecords());
  };

  return (
    <Modal open={isModalOpened} onClose={handleCloseModal}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Upozornění
        </Typography>

        <Typography sx={{ mt: 2, mb: 3 }}>Opravdu chcete smazat všechny položky?</Typography>

        <Stack direction="row" gap={4}>
          <ButtonAction color="error" onClick={handleDeleteRecords} isPending={isPending} startIcon={<Delete />}>
            Ano, smazat
          </ButtonAction>

          <Button variant="text" onClick={handleCloseModal}>
            Zrušit
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
