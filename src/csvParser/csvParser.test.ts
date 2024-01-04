import '@testing-library/jest-dom';
import { getGameListFromCsv } from './getGameListFromCsv';
import { CsvColumnsOptions } from './types';
import { testCases, testCasesWithTypeGame } from './test-data';

const OPTIONS_ALL_ENABLED: CsvColumnsOptions = {
  type: {
    enabled: false,
    colName: 'Hra / Poznámka',
    typeGame: 'GAME',
  },
  name: {
    colName: 'Název hry',
  },
  id: {
    enabled: true,
    colName: 'BGG ID',
  },
  langs: {
    enabled: true,
    colName: 'Jazyky',
    langIrrelevant: 'nerozhoduje',
  },
  location: {
    enabled: true,
    colName: 'Umístění',
  },
};

const OPTIONS_ALL_DISABLED: CsvColumnsOptions = {
  ...OPTIONS_ALL_ENABLED,
  id: {
    enabled: false,
    colName: 'BGG ID',
  },
  langs: {
    enabled: false,
    colName: 'Jazyky',
    langIrrelevant: 'nerozhoduje',
  },
  location: {
    enabled: false,
    colName: 'Umístění',
  },
};

const OPTIONS_WITH_TYPE_GAME_ALL_ENABLED: CsvColumnsOptions = {
  ...OPTIONS_ALL_ENABLED,
  type: {
    enabled: true,
    colName: 'Hra / Poznámka',
    typeGame: 'GAME',
  },
};

const OPTIONS_WITH_TYPE_GAME_ALL_DISABLED: CsvColumnsOptions = {
  ...OPTIONS_ALL_DISABLED,
  type: {
    enabled: true,
    colName: 'Hra / Poznámka',
    typeGame: 'GAME',
  },
};

describe('Parsing CsvGame[] data to Game[]', () => {
  it('Config: TypeGame disabled, all ENABLED', () => {
    const [game, gameWithBggId, gameWithLangs, gameWithLocation, gameWithAll] = getGameListFromCsv(
      testCases,
      OPTIONS_ALL_ENABLED,
    );

    // Game
    expect(game.sourceName).toEqual('Game');
    expect(game.notes).toBeUndefined;
    expect(game.id).toBeUndefined;
    expect(game.langs?.length).toEqual(0);
    expect(game.location).toBeUndefined;

    // Game with BGG ID
    expect(gameWithBggId.sourceName).toEqual('Game with BGG ID');
    expect(gameWithBggId.notes).toBeUndefined;
    expect(gameWithBggId.id).toEqual(311659);
    expect(gameWithBggId.langs?.length).toEqual(0);
    expect(gameWithBggId.location).toBeUndefined;

    // Game with langs
    expect(gameWithLangs.sourceName).toEqual('Game with langs');
    expect(gameWithLangs.notes).toBeUndefined;
    expect(gameWithLangs.id).toBeUndefined;
    expect(gameWithLangs.langs?.length).toEqual(2);
    expect(gameWithLangs.langs?.[0]).toEqual('CZ');
    expect(gameWithLangs.langs?.[1]).toEqual('ENG');
    expect(gameWithLangs.location).toBeUndefined;

    // Game with location
    expect(gameWithLocation.sourceName).toEqual('Game with location');
    expect(gameWithLocation.notes).toBeUndefined;
    expect(gameWithLocation.id).toBeUndefined;
    expect(gameWithLocation.langs?.length).toEqual(0);
    expect(gameWithLocation.location).toEqual('A1');

    // Game with all features
    expect(gameWithAll.sourceName).toEqual('Game with BGG ID and langs');
    expect(gameWithAll.notes).toBeUndefined;
    expect(gameWithAll.id).toEqual(54998);
    expect(gameWithAll.langs?.length).toEqual(3);
    expect(gameWithAll.langs?.[0]).toEqual('CZ');
    expect(gameWithAll.langs?.[1]).toEqual('ENG');
    expect(gameWithAll.langs?.[2]).toEqual('Irrelevant');
    expect(gameWithAll.location).toEqual('B2');
  });

  it('Config: TypeGame disabled, id disabled, langs disabled, location disabled', () => {
    const [game, gameWithBggId, gameWithLangs, gameWithLocation, gameWithAll] = getGameListFromCsv(
      testCases,
      OPTIONS_ALL_DISABLED,
    );

    // Game
    expect(game.sourceName).toEqual('Game');
    expect(game.notes).toBeUndefined;
    expect(game.id).toBeUndefined;
    expect(game.langs?.length).toEqual(0);
    expect(game.location).toBeUndefined;

    // Game with BGG ID
    expect(gameWithBggId.sourceName).toEqual('Game with BGG ID');
    expect(gameWithBggId.notes).toBeUndefined;
    expect(gameWithBggId.id).toBeUndefined;
    expect(gameWithBggId.langs?.length).toEqual(0);
    expect(gameWithBggId.location).toBeUndefined;

    // Game with langs
    expect(gameWithLangs.sourceName).toEqual('Game with langs');
    expect(gameWithLangs.notes).toBeUndefined;
    expect(gameWithLangs.id).toBeUndefined;
    expect(gameWithLangs.langs?.length).toEqual(0);
    expect(gameWithLangs.location).toBeUndefined;

    // Game with location
    expect(gameWithLocation.sourceName).toEqual('Game with location');
    expect(gameWithLocation.notes).toBeUndefined;
    expect(gameWithLocation.id).toBeUndefined;
    expect(gameWithLocation.langs?.length).toEqual(0);
    expect(gameWithLocation.location).toBeUndefined;

    // Game with all features
    expect(gameWithAll.sourceName).toEqual('Game with BGG ID and langs');
    expect(gameWithAll.notes).toBeUndefined;
    expect(gameWithAll.id).toBeUndefined;
    expect(gameWithAll.langs?.length).toEqual(0);
    expect(gameWithAll.location).toBeUndefined;
  });

  it('Config: TypeGame ENABLED, all ENABLED', () => {
    const [game, gameWithNotes, gameWithBggId, gameWithLangs, gameWithLocation, gameWithAll] = getGameListFromCsv(
      testCasesWithTypeGame,
      OPTIONS_WITH_TYPE_GAME_ALL_ENABLED,
    );

    // Game
    expect(game.sourceName).toEqual('Game');
    expect(game.notes?.length).toEqual(0);
    expect(game.id).toBeUndefined;
    expect(game.langs?.length).toEqual(0);
    expect(game.location).toBeUndefined;

    // Game with notes
    expect(gameWithNotes.sourceName).toEqual('Game with 2 notes');
    expect(gameWithNotes.notes?.length).toEqual(2);
    expect(gameWithNotes.notes?.[0]).toEqual('Note 1');
    expect(gameWithNotes.notes?.[1]).toEqual('Note 2');
    expect(gameWithNotes.id).toBeUndefined;
    expect(gameWithNotes.langs?.length).toEqual(0);
    expect(gameWithNotes.location).toBeUndefined;

    // Game with BGG ID
    expect(gameWithBggId.sourceName).toEqual('Game with BGG ID');
    expect(gameWithBggId.notes?.length).toEqual(0);
    expect(gameWithBggId.id).toEqual(311659);
    expect(gameWithBggId.langs?.length).toEqual(0);
    expect(gameWithBggId.location).toBeUndefined;

    // Game with langs
    expect(gameWithLangs.sourceName).toEqual('Game with langs');
    expect(gameWithLangs.notes?.length).toEqual(0);
    expect(gameWithLangs.id).toBeUndefined;
    expect(gameWithLangs.langs?.length).toEqual(2);
    expect(gameWithLangs.langs?.[0]).toEqual('CZ');
    expect(gameWithLangs.langs?.[1]).toEqual('ENG');
    expect(gameWithLangs.location).toBeUndefined;

    // Game with location
    expect(gameWithLocation.sourceName).toEqual('Game with location');
    expect(gameWithLocation.notes).toBeUndefined;
    expect(gameWithLocation.id).toBeUndefined;
    expect(gameWithLocation.langs?.length).toEqual(0);
    expect(gameWithLocation.location).toEqual('A1');

    // Game with all features
    expect(gameWithAll.sourceName).toEqual('Game with note, BGG ID and langs');
    expect(gameWithAll.notes?.length).toEqual(1);
    expect(gameWithAll.notes?.[0]).toEqual('Note');
    expect(gameWithAll.id).toEqual(54998);
    expect(gameWithAll.langs?.length).toEqual(3);
    expect(gameWithAll.langs?.[0]).toEqual('CZ');
    expect(gameWithAll.langs?.[1]).toEqual('ENG');
    expect(gameWithAll.langs?.[2]).toEqual('Irrelevant');
    expect(gameWithAll.location).toEqual('B2');
  });

  it('Config: TypeGame ENABLED, id disabled, langs disabled, location disabled', () => {
    const [game, gameWithNotes, gameWithBggId, gameWithLangs, gameWithLocation, gameWithAll] = getGameListFromCsv(
      testCasesWithTypeGame,
      OPTIONS_WITH_TYPE_GAME_ALL_DISABLED,
    );

    // Game
    expect(game.sourceName).toEqual('Game');
    expect(game.notes?.length).toEqual(0);
    expect(game.id).toBeUndefined;
    expect(game.langs?.length).toEqual(0);
    expect(game.location).toBeUndefined;

    // Game with notes
    expect(gameWithNotes.sourceName).toEqual('Game with 2 notes');
    expect(gameWithNotes.notes?.length).toEqual(2);
    expect(gameWithNotes.notes?.[0]).toEqual('Note 1');
    expect(gameWithNotes.notes?.[1]).toEqual('Note 2');
    expect(gameWithNotes.id).toBeUndefined;
    expect(gameWithNotes.langs?.length).toEqual(0);
    expect(gameWithNotes.location).toBeUndefined;

    // Game with BGG ID
    expect(gameWithBggId.sourceName).toEqual('Game with BGG ID');
    expect(gameWithBggId.notes?.length).toEqual(0);
    expect(gameWithBggId.id).toBeUndefined;
    expect(gameWithBggId.langs?.length).toEqual(0);
    expect(gameWithBggId.location).toBeUndefined;

    // Game with langs
    expect(gameWithLangs.sourceName).toEqual('Game with langs');
    expect(gameWithLangs.notes?.length).toEqual(0);
    expect(gameWithLangs.id).toBeUndefined;
    expect(gameWithLangs.langs?.length).toEqual(0);
    expect(gameWithLangs.location).toBeUndefined;

    // Game with location
    expect(gameWithLocation.sourceName).toEqual('Game with location');
    expect(gameWithLocation.notes).toBeUndefined;
    expect(gameWithLocation.id).toBeUndefined;
    expect(gameWithLocation.langs?.length).toEqual(0);
    expect(gameWithLocation.location).toBeUndefined;

    // Game with all features
    expect(gameWithAll.sourceName).toEqual('Game with note, BGG ID and langs');
    expect(gameWithAll.notes?.length).toEqual(1);
    expect(gameWithAll.notes?.[0]).toEqual('Note');
    expect(gameWithAll.id).toBeUndefined;
    expect(gameWithAll.langs?.length).toEqual(0);
    expect(gameWithAll.location).toBeUndefined;
  });

  it('Config: TypeGame ENABLED, but missing in data', () => {
    const gamelist = getGameListFromCsv(testCases, OPTIONS_WITH_TYPE_GAME_ALL_ENABLED);
    // No games parsed
    expect(gamelist.length).toEqual(0);
  });

  it('Config: TypeGame disabled, but data contains notes', () => {
    // Each row (including notes) is parsed as a Game
    const gamelist = getGameListFromCsv(testCasesWithTypeGame, OPTIONS_ALL_ENABLED);
    expect(gamelist.length).toEqual(9);
  });
});
