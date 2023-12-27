import { Alert, AlertTitle, Box, Button, LinearProgress, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import { UnfinishedOverview } from '../unfinished-overview';
import { Log } from '../log';
import { Game, LogRecord, Status } from '@/types';
import { getEstimatedMinutes, getEstimatedSeconds, processGameList } from '../../utils';
import { updateGameListRecord } from '@/actions';
import { GameListRecord } from '@/actions/types';
import { isEqual } from 'lodash-es';
import { Sync } from '@mui/icons-material';
import { enqueueSnackbar } from 'notistack';
import { Countdown } from '../countdown';

type Props = {
  gameListRecord: GameListRecord;
};

export const BggLoader = ({ gameListRecord }: Props) => {
  const [_isPending, startTransition] = useTransition();

  const [newGameList, setNewGameList] = useState<Game[]>([]);
  const [log, setLog] = useState<LogRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const processingCount = log.length;

  const { processingGameList, estimatedSeconds, estimatedMinutes } = useMemo(() => {
    const processingGameList = gameListRecord.gameList.filter(({ status }) => status !== Status.FINISHED);
    const estimatedSeconds = getEstimatedSeconds(processingGameList);
    const estimatedMinutes = getEstimatedMinutes(estimatedSeconds);

    return { processingGameList, estimatedSeconds, estimatedMinutes };
  }, [gameListRecord]);

  const handleLoad = async () => {
    if (!processingGameList.length) {
      return;
    }

    setNewGameList([]);
    setLog([]);
    setIsLoading(true);

    await processGameList(processingGameList, setNewGameList, setLog);

    setIsLoading(false);
  };

  const handleSaveGameList = useCallback(
    async (mergedGameList: Game[]) => {
      if (gameListRecord && mergedGameList.length) {
        startTransition(async () => {
          await updateGameListRecord(gameListRecord, mergedGameList);
          setNewGameList([]);

          enqueueSnackbar('Načtení her proběhlo úspěšně, nyní můžete opustit stránku', {
            variant: 'success',
            persist: true,
          });
        });
      }
    },
    [gameListRecord],
  );

  useEffect(() => {
    if (newGameList.length) {
      const mergedGameList = gameListRecord.gameList.map(
        (oldGame) => newGameList.find((game) => oldGame.uid === game.uid) ?? oldGame,
      );
      const mergedGameListHasChanges = !isEqual(mergedGameList, gameListRecord.gameList);

      if (mergedGameListHasChanges) {
        handleSaveGameList(mergedGameList);
      } else {
        enqueueSnackbar('Načtení her dokončeno (žádné nové změny), nyní můžete opustit stránku', {
          variant: 'info',
          persist: true,
        });
      }
    }
  }, [gameListRecord.gameList, handleSaveGameList, newGameList, processingGameList]);

  return (
    <>
      <Box my={4}>
        <Typography variant="h2" gutterBottom>
          BGG loader
        </Typography>

        <UnfinishedOverview gameList={processingGameList} />

        <Alert severity="warning" sx={{ mb: 4 }}>
          <AlertTitle>Po spuštění loaderu nezavírejte stránku!</AlertTitle>
          Všechny hry se uloží až po skončení loaderu. Nezavírejte stránku, dokud loader neskončí!
        </Alert>

        {!isLoading ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleLoad}
            disabled={isLoading || !processingGameList.length}
            startIcon={<Sync />}
          >
            Načíst {processingGameList.length} her (cca {estimatedMinutes} min)
          </Button>
        ) : (
          <Stack direction="row" alignItems="center" gap={3} width="50%">
            <Box position="relative" height="100%" flexGrow={1}>
              <LinearProgress
                value={(processingCount / processingGameList.length) * 100}
                variant="determinate"
                color="success"
                sx={{ width: '100%', height: 56 }}
              />
              <LinearProgress
                variant="indeterminate"
                color="success"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0.2,
                }}
              />
            </Box>
            <Typography variant="h4" color="text.secondary" noWrap flexShrink={0}>
              {processingCount} / {processingGameList.length}
            </Typography>
            <Countdown estimatedSeconds={estimatedSeconds} />
          </Stack>
        )}
      </Box>

      <Log log={log} />
    </>
  );
};
