import { Game } from '@/types';
import { Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';
import { useTranslations } from 'next-intl';
import FloorPlan from './FloorPlan.svg';
import { useCallback } from 'react';
import { SHELF_FILL_COLOR } from './config';

type Props = {
  handleClose: () => void;
  location: Game['location'];
};

export const LocationDialog = ({ handleClose, location }: Props) => {
  const t = useTranslations();

  const setRef = useCallback(
    (node: SVGSVGElement) => {
      if (!node || !location) return;

      const shelfNode = node.querySelector(`#${location} rect`);
      shelfNode?.setAttribute('fill', SHELF_FILL_COLOR);
    },
    [location],
  );

  return (
    <Dialog onClose={handleClose} open maxWidth={false}>
      <DialogTitle variant="h1">
        {t('gameCard.location')}: {location}
      </DialogTitle>

      <Divider />

      <DialogContent>
        <FloorPlan ref={setRef} />
      </DialogContent>
    </Dialog>
  );
};
