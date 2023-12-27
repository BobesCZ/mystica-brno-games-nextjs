import { LogRecordState } from '@/types';
import { Theme } from '@mui/material';

export const getRowColor = (theme: Theme, status: LogRecordState) => {
  const mapColors = {
    [LogRecordState.SUCCESS]: theme.palette.success.dark,
    [LogRecordState.SKIPPED]: theme.palette.action.disabled,
    [LogRecordState.ERROR]: theme.palette.error.main,
  };

  return mapColors[status];
};

export const getStatusText = (status: LogRecordState) => {
  const mapTexts = {
    [LogRecordState.SUCCESS]: 'Načteno',
    [LogRecordState.SKIPPED]: 'Přeskočeno',
    [LogRecordState.ERROR]: 'Nenalezeno',
  };

  return mapTexts[status];
};
