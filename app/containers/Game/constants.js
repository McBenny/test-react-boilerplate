/*
 * GameConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

import { EMPTY_MEMBER } from '../Settings/constants';
import { messages } from './messages';

export const SAVE_SETTINGS = 'boilerplate/Game/SAVE_SETTINGS';
export const HANDLE_GAME_STATUS = 'boilerplate/Game/HANDLE_GAME_STATUS';
export const ADD_EVENT = 'boilerplate/Game/ADD_EVENT';
export const ADD_GOAL = 'boilerplate/Game/ADD_GOAL';
export const ADD_YELLOW_CARD = 'boilerplate/Game/ADD_YELLOW_CARD';
export const ADD_RED_CARD = 'boilerplate/Game/ADD_RED_CARD';
export const ADD_BLUE_CARD = 'boilerplate/Game/ADD_BLUE_CARD';
export const ADD_SUSPENSION = 'boilerplate/Game/ADD_SUSPENSION';
export const ADD_TIMEOUT = 'boilerplate/Game/ADD_TIMEOUT';
export const REMOVE_EVENT = 'boilerplate/Game/REMOVE_EVENT';
export const REMOVE_EVENT_TIMEOUT = 'boilerplate/Game/REMOVE_EVENT_TIMEOUT';
export const REMOVE_GOAL = 'boilerplate/Game/REMOVE_GOAL';
export const REMOVE_YELLOW_CARD = 'boilerplate/Game/REMOVE_YELLOW_CARD';
export const REMOVE_SUSPENSION = 'boilerplate/Game/REMOVE_SUSPENSION';
export const REMOVE_RED_CARD = 'boilerplate/Game/REMOVE_RED_CARD';
export const REMOVE_BLUE_CARD = 'boilerplate/Game/REMOVE_BLUE_CARD';
export const REMOVE_TIMEOUT = 'boilerplate/Game/REMOVE_TIMEOUT';
export const STORE_SCORE = 'boilerplate/Game/STORE_SCORE';

export const EVENT_TYPES = {
    goal: 'goal',
    yellowCard: 'yellowCard',
    redCard: 'redCard',
    blueCard: 'blueCard',
    suspension: 'suspension',
    timeout: 'timeOut',
    gameStart: 'startGame',
    periodStart: 'startPeriod',
    gamePaused: 'gamePaused',
    gameResumed: 'gameResumed',
    periodEnd: 'endPeriod',
    gameEnd: 'endGame'
};

export const TIME_DURATIONS = {
    suspension: 120,
    timeout: 60
};

// Even numbers represent non-playable periods (used in /components/Play-pause)
// Numbers of playing periods match the score periods in ./Game/reducer.js:initialState.currentScore
export const PERIODS = {
    0: 'warm-up',
    1: 'half-time 1',
    2: 'half-time',
    3: 'half-time 2',
    4: 'full-time',
    5: 'extra-time half-time 1',
    6: 'extra-time half-time',
    7: 'extra-time half-time 2',
    8: 'full-time + extra-time'
};

export const FOULS = {
    yellowCard: 'yellowCard',
    suspension: 'suspension',
    redCard: 'redCard',
    blueCard: 'blueCard'
};

export const UNKNOWN_PLAYER = {
    ...EMPTY_MEMBER.players,
    id: 0,
    reference: '?',
    name: `(${messages.unknownPlayer})`
};

export const GAMES_PREFIX = 'game-';

export const POPUPS = {
    deleteGame: 'deleteGame',
    duplicateGame: 'duplicateGame',
    lineUp: 'lineUp',
    players: 'players',
    playPause: 'playPause',
    settings: 'settings',
    undo: 'undo'
};
