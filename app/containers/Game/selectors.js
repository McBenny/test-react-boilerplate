/**
 * Game selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGame = state => state.game || initialState;

const makeSelectTeamAName = () =>
    createSelector(
        selectGame,
        gameState => gameState.teamAName,
    );

const makeSelectTeamBName = () =>
    createSelector(
        selectGame,
        gameState => gameState.teamBName,
    );

const makeSelectDate = () =>
    createSelector(
        selectGame,
        gameState => gameState.date,
    );

export { selectGame, makeSelectTeamAName, makeSelectTeamBName, makeSelectDate };
