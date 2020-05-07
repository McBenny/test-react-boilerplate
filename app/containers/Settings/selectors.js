/**
 * Settings selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSettings = state => state.settings || initialState;

const makeSelectTeams = () =>
    createSelector(
        selectSettings,
        settingsState => settingsState.teams
    );

export { selectSettings, makeSelectTeams };
