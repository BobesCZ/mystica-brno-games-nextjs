import { Game } from '@/types';
import { ExpandLess, ExpandMore, NotListedLocationOutlined } from '@mui/icons-material';
import { CardActions as CardActionsComponent, Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { LocationDialog } from '../location-dialog';

type Props = {
  expanded: boolean;
  handleToggleExpanded: () => void;
  location: Game['location'];
};

export const CardActions = ({ expanded, handleToggleExpanded, location }: Props) => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  return (
    <CardActionsComponent sx={{ gap: 1, justifyContent: 'center' }}>
      <Button
        color="primary"
        sx={{
          '& .MuiButton-startIcon': {
            marginRight: 0.25,
          },
          textTransform: 'none',
        }}
        startIcon={expanded ? <ExpandLess /> : <ExpandMore />}
        onClick={handleToggleExpanded}
      >
        {t(expanded ? 'common.showLess' : 'common.showMore')}
      </Button>

      {location && (
        <Button
          color="primary"
          sx={{
            '& .MuiButton-startIcon': {
              marginRight: 0.75,
            },
            '& .MuiButton-startIcon>*:nth-of-type(1)': {
              fontSize: 'inherit',
            },
            textTransform: 'none',
          }}
          startIcon={<NotListedLocationOutlined />}
          onClick={() => setOpen(true)}
        >
          {t('gameCard.location')}
        </Button>
      )}
      {open && <LocationDialog handleClose={() => setOpen(false)} location={location} />}
    </CardActionsComponent>
  );
};
