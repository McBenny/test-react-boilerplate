/**
 * Game selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGame = state => state.game || initialState;

const makeSelectSettings = () =>
    createSelector(
        selectGame,
        gameState => gameState.settings
    );

const makeSelectDate = () =>
    createSelector(
        selectGame,
        gameState => gameState.date
    );

const makeSelectGameStarted = () =>
    createSelector(
        selectGame,
        gameState => gameState.gameStarted
    );

const makeSelectGamePaused = () =>
    createSelector(
        selectGame,
        gameState => gameState.gamePaused
    );

// TODO: Try with deleting this function
const makeSelectGameEvents = () =>
    createSelector(
        selectGame,
        gameState => gameState.gameEvents
    );

const makeSelectDataTeamA = () =>
    createSelector(
        selectGame,
        gameState => gameState.dataTeamA
    );

const makeSelectDataTeamB = () =>
    createSelector(
        selectGame,
        gameState => gameState.dataTeamB
    );

export {
    selectGame,
    makeSelectSettings,
    makeSelectDate,
    makeSelectGameStarted,
    makeSelectGamePaused,
    makeSelectGameEvents,
    makeSelectDataTeamA,
    makeSelectDataTeamB
};
