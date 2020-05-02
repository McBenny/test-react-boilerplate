/**
 * Settings selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSettings = state => state.settings || initialState;

const makeSelectTeamAName = () =>
    createSelector(
        selectSettings,
        settingsState => settingsState.teamAName
    );

const makeSelectTeamBName = () =>
    createSelector(
        selectSettings,
        settingsState => settingsState.teamBName
    );

export { selectSettings, makeSelectTeamAName, makeSelectTeamBName };