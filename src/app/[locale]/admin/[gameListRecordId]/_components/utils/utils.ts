import { getGameFromBggThing } from './parseUtils';
import { fetchThingData } from './fetchUtils';
import { getBggId } from './processSearch';
import { Dispatch, SetStateAction } from 'react';
import { Game, LogRecord, Status, LogRecordState } from '@/types';
import { PROCESS_GAME_TIMEOUT, TOO_MANY_REQUESTS_CODE } from '../config';

export const processGameList = async (
  gameList: Game[],
  setGameList: Dispatch<SetStateAction<Game[]>>,
  setLog: Dispatch<SetStateAction<LogRecord[]>>,
) => {
  const newGameList: Game[] = [];

  for (const [index, game] of gameList.entries()) {
    const { sourceName, status, id } = game;

    try {
      if (status === Status.FINISHED) {
        setLog((prev) => [...prev, { sourceName, status: LogRecordState.SKIPPED }]);
      } else {
        const bggId = id ?? (await getBggId(sourceName));
        const bggThing = await fetchThingData(bggId);

        const parsedGame = getGameFromBggThing(game, bggThing);

        newGameList.push({ ...parsedGame, status: Status.FINISHED });
        setLog((prev) => [...prev, { sourceName, status: LogRecordState.SUCCESS }]);

        if (index !== gameList.length - 1) {
          // Slow iteration because of API request limit
          await new Promise((resolve) => setTimeout(resolve, PROCESS_GAME_TIMEOUT));
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error, sourceName);
        newGameList.push({ ...game, status: Status.UNFINISHED, statusMessage: `${error}` });
        setLog((prev) => [...prev, { sourceName, status: LogRecordState.ERROR, statusMessage: `${error}` }]);

        if (error?.cause === TOO_MANY_REQUESTS_CODE) break;
      }
    }
  }

  setGameList((prev) => [...prev, ...newGameList]);
};

export const getEstimatedSeconds = (gameList: Game[]) => Math.floor((gameList.length * PROCESS_GAME_TIMEOUT) / 1000);

export const getEstimatedMinutes = (estimatedSeconds: number) => Math.max(Math.floor(estimatedSeconds / 60), 1);
