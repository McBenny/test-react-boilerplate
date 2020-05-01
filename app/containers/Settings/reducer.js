/*
 * SettingsReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { CHANGE_TEAM_A_NAME, CHANGE_TEAM_B_NAME, CANCEL_SETTINGS_CHANGE } from './constants';

// The initial state of the App
export const initialState = {
    teamAName: 'Team A',
    teamBName: 'Team B'
};

/* eslint-disable default-case, no-param-reassign */
const settingsReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case CHANGE_TEAM_A_NAME:
                draft.teamAName = action.teamAName;
                break;
            case CHANGE_TEAM_B_NAME:
                draft.teamBName = action.teamBName;
                break;
            case CANCEL_SETTINGS_CHANGE: {
                const newSettings = Object.keys(action.settings);
                newSettings.forEach(setting => {
                    draft[setting] = action.settings[setting];
                });
                break;
            }
            default:
        }
    });

export default settingsReducer;
