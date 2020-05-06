/**
 * Settings selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSettings = state => state.settings || initialState;

const makeSelectTeamName = () =>
    createSelector(
        selectSettings,
        settingsState => settingsState.teams
    );

const makeSelectPlayer = () =>
    createSelector(
        selectSettings,
        settingsState => settingsState.players
    );

export { selectSettings, makeSelectTeamName, makeSelectPlayer };
