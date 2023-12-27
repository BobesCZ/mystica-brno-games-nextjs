import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { getRowColor, getStatusText } from './utils';
import { LogRecord, LogRecordState } from '@/types';

type Props = {
  log?: LogRecord[];
};

export const Log = ({ log }: Props) => {
  const successCount = (log || []).filter(({ status }) => status === LogRecordState.SUCCESS).length;
  const errorCount = (log || []).filter(({ status }) => status === LogRecordState.ERROR).length;
  const skippedCount = (log || []).filter(({ status }) => status === LogRecordState.SKIPPED).length;

  return (
    <>
      {!!log?.length && (
        <Typography variant="h3" gutterBottom>
          Zpracováno {log?.length} (
          <Box component="span" color={(theme) => getRowColor(theme, LogRecordState.SUCCESS)}>
            načteno {successCount}
          </Box>
          ,{' '}
          <Box component="span" color={(theme) => getRowColor(theme, LogRecordState.ERROR)}>
            nenalezeno {errorCount}
          </Box>
          ,{' '}
          <Box component="span" color={(theme) => getRowColor(theme, LogRecordState.SKIPPED)}>
            přeskočeno {skippedCount}
          </Box>
          )
        </Typography>
      )}
      <TableContainer component={Paper} elevation={4} sx={{ my: 4, maxHeight: '500px', overflow: 'auto' }}>
        <Table>
          <TableBody>
            {log?.map(({ sourceName, status, statusMessage }, index) => (
              <TableRow key={`${sourceName}_${index}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="td" scope="row" sx={(theme) => ({ color: getRowColor(theme, status) })}>
                  {index + 1}
                </TableCell>
                <TableCell component="td" scope="row" sx={(theme) => ({ color: getRowColor(theme, status) })}>
                  {sourceName}
                </TableCell>
                <TableCell component="td" scope="row" sx={(theme) => ({ color: getRowColor(theme, status) })}>
                  {getStatusText(status)}
                </TableCell>
                <TableCell component="td" scope="row" sx={(theme) => ({ color: getRowColor(theme, status) })}>
                  {statusMessage}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
