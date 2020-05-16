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

export const CHANGE_COMPETITION = 'boilerplate/Settings/CHANGE_COMPETITION';
export const CHANGE_ROUND = 'boilerplate/Settings/CHANGE_ROUND';
export const CHANGE_GENDER = 'boilerplate/Settings/CHANGE_GENDER';
export const CHANGE_TEAM_NAME = 'boilerplate/Settings/CHANGE_TEAM_NAME';
export const ADD_EMPTY_MEMBER = 'boilerplate/Settings/ADD_EMPTY_MEMBER';
export const CHANGE_MEMBER = 'boilerplate/Settings/CHANGE_MEMBER';
export const INIT_SETTINGS = 'boilerplate/Settings/INIT_SETTINGS';

export const EMPTY_MEMBER_DATA = {
    id: 1,
    reference: 0,
    name: '',
    goals: 0,
    yellowCards: 0,
    redCards: 0,
    blueCards: 0,
    suspensions: 0
};
export const OFFICIALS_REFERENCES = ['A', 'B', 'C', 'D'];
export const EMPTY_MEMBER = {
    players: {
        ...EMPTY_MEMBER_DATA
    },
    officials: {
        ...EMPTY_MEMBER_DATA,
        reference: OFFICIALS_REFERENCES[0]
    }
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

export const GENDERS = {
    men: 'Men',
    women: 'Women',
    mixed: 'Mixed'
};

export const UUID_PREFIX = 'uuid-';

export const PERSONS_TYPES = {
    players: 'players',
    officials: 'officials'
};
