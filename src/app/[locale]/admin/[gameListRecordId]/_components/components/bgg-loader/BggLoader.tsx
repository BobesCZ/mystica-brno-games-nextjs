import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { useEffect, useState, useTransition } from 'react';
import { UnfinishedOverview } from '../unfinished-overview';
import { Log } from '../log';
import { Game, LogRecord } from '@/types';
import { GAME_LIST_SLICE } from '../../config';
import { processGameList } from '../../utils';
import { updateGameListRecord } from '@/actions';
import { GameListRecord } from '@/actions/types';
import { unionBy } from 'lodash-es';
import { Sync } from '@mui/icons-material';

type Props = {
  gameListRecord: GameListRecord;
};

export const BggLoader = ({ gameListRecord }: Props) => {
  const [_isPending, startTransition] = useTransition();

  const [newGameList, setNewGameList] = useState<Game[]>([]);
  const [log, setLog] = useState<LogRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const processingCount = log.length;
  const processGoalCount = GAME_LIST_SLICE[1] - GAME_LIST_SLICE[0];

  const gameList = gameListRecord.gameList;

  const handleLoad = async () => {
    if (!gameList.length) {
      return;
    }

    setNewGameList([]);
    setLog([]);
    setIsLoading(true);

    await processGameList(gameList.slice(...GAME_LIST_SLICE), setNewGameList, setLog);

    setIsLoading(false);
  };

  useEffect(() => {
    const mergedGameList = unionBy([...newGameList, ...gameList], 'uid');

    if (gameListRecord && mergedGameList.length) {
      const handleSaveGameList = async () => {
        startTransition(() => updateGameListRecord(gameListRecord, mergedGameList));
      };

      handleSaveGameList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newGameList]);

  return (
    <>
      <Box my={4}>
        <Typography variant="h2" gutterBottom>
          BGG loader
        </Typography>

        <UnfinishedOverview gameList={gameList} />

        <Box sx={{ display: 'inline-block', position: 'relative' }}>
          <Button variant="contained" color="info" onClick={handleLoad} disabled={isLoading} startIcon={<Sync />}>
            Načíst BGG pro hry {GAME_LIST_SLICE[0]}-{GAME_LIST_SLICE[1]}
          </Button>
          {isLoading && (
            <LinearProgress
              value={(processingCount / processGoalCount) * 100}
              variant="determinate"
              color="success"
              sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            />
          )}
        </Box>
        {isLoading && (
          <Typography color="text.secondary" sx={{ display: 'inline-block', ml: 2 }}>
            {processingCount} / {processGoalCount}
          </Typography>
        )}
      </Box>

      <Log log={log} />
    </>
  );
};
