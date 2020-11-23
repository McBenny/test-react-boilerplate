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

const makeSelectGameId = () =>
    createSelector(
        selectGame,
        gameState => gameState.gameId
    );

const makeSelectDate = () =>
    createSelector(
        selectGame,
        gameState => gameState.settings.date
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

const makeSelectGameEvents = () =>
    createSelector(
        selectGame,
        gameState => gameState.gameEvents
    );

const makeSelectPeriod = () =>
    createSelector(
        selectGame,
        gameState => gameState.currentPeriod
    );

const makeSelectScore = () =>
    createSelector(
        selectGame,
        gameState => gameState.currentScore
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
    makeSelectGameId,
    makeSelectDate,
    makeSelectGameStarted,
    makeSelectGamePaused,
    makeSelectGameEvents,
    makeSelectPeriod,
    makeSelectScore,
    makeSelectDataTeamA,
    makeSelectDataTeamB
};
