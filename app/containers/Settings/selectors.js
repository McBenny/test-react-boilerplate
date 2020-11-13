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

const makeSelectPlace = () =>
    createSelector(
        selectSettings,
        settingsState => settingsState.place
    );

const makeSelectVenue = () =>
    createSelector(
        selectSettings,
        settingsState => settingsState.venue
    );

const makeSelectTime = () =>
    createSelector(
        selectSettings,
        settingsState => settingsState.time
    );

const makeSelectReferee1 = () =>
    createSelector(
        selectSettings,
        settingsState => settingsState.referee1
    );

const makeSelectReferee2 = () =>
    createSelector(
        selectSettings,
        settingsState => settingsState.referee2
    );

const makeSelectScoreKeeper = () =>
    createSelector(
        selectSettings,
        settingsState => settingsState.scoreKeeper
    );

const makeSelectTimeKeeper = () =>
    createSelector(
        selectSettings,
        settingsState => settingsState.timeKeeper
    );

const makeSelectTeams = () =>
    createSelector(
        selectSettings,
        settingsState => settingsState.teams
    );

export {
    selectSettings,
    makeSelectGameId,
    makeSelectCompetition,
    makeSelectRound,
    makeSelectGender,
    makeSelectPlace,
    makeSelectVenue,
    makeSelectTime,
    makeSelectReferee1,
    makeSelectReferee2,
    makeSelectScoreKeeper,
    makeSelectTimeKeeper,
    makeSelectTeams
};
