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

export { selectGame, makeSelectSettings, makeSelectDate };
