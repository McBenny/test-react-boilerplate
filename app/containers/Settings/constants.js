/*
 * SettingsConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_TEAM_NAME = 'boilerplate/Settings/CHANGE_TEAM_NAME';
export const ADD_EMPTY_PLAYER = 'boilerplate/Settings/ADD_EMPTY_PLAYER';
export const CHANGE_PLAYER = 'boilerplate/Settings/CHANGE_PLAYER';
export const ADD_EMPTY_OFFICIAL = 'boilerplate/Settings/ADD_EMPTY_OFFICIAL';
export const CHANGE_OFFICIAL = 'boilerplate/Settings/CHANGE_OFFICIAL';
export const CANCEL_SETTINGS_CHANGE = 'boilerplate/Settings/CANCEL_SETTINGS_CHANGE';

export const EMPTY_PLAYER = {
    id: 1,
    reference: 0,
    playerName: '',
    goals: 0,
    yellowCards: 0,
    redCards: 0,
    blueCards: 0,
    suspensions: 0
};

export const OFFICIALS_REFERENCES = ['A', 'B', 'C', 'D'];
export const EMPTY_OFFICIAL = {
    id: 1,
    reference: OFFICIALS_REFERENCES[0],
    officialName: '',
    yellowCards: 0,
    redCards: 0,
    blueCards: 0,
    suspensions: 0
};

export const MAX_NUMBER = {
    players: 16,
    officials: 4,
    yellowCards: 1,
    redCards: 1,
    blueCards: 1,
    suspensions: 2,
    timeouts: 3
};
