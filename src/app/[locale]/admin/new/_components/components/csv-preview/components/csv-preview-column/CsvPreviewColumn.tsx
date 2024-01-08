import { CsvColumnsOptions } from '@/csvParser';
import { Game } from '@/types';
import { Typography } from '@mui/material';
import { getColumnValue } from './utils';

type Props = {
  column: string;
  columnOption: CsvColumnsOptions[keyof CsvColumnsOptions];
  game: Game;
};

export const CsvPreviewColumn = ({ column, columnOption, game }: Props) => {
  const value = getColumnValue(column, columnOption, game);

  return (
    <>
      {Array.isArray(value) ? (
        value.map((item, index) => (
          <Typography key={index} variant="body2" gutterBottom noWrap>
            {item}
          </Typography>
        ))
      ) : (
        <Typography variant="body2" gutterBottom noWrap title={value?.toString()}>
          {value}
        </Typography>
      )}
    </>
  );
};
