/**
 * Settings selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSettings = state => state.settings || initialState;

const makeSelectGameId = () =>
    createSelector(
        selectSettings,
        settingsState => settingsState.gameId
    );

const makeSelectCompetition = () =>
    createSelector(
        selectSettings,
        settingsState => settingsState.competition
    );

const makeSelectRound = () =>
    createSelector(
        selectSettings,
        settingsState => settingsState.round
    );

const makeSelectGender = () =>
    createSelector(
        selectSettings,
        settingsState => settingsState.gender
    );

const makeSelectTeams = () =>
    createSelector(
        selectSettings,
        settingsState => settingsState.teams
    );

export { selectSettings, makeSelectGameId, makeSelectCompetition, makeSelectRound, makeSelectGender, makeSelectTeams };
