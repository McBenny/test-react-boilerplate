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

import { EMPTY_PLAYER } from '../Settings/constants';

export const SAVE_SETTINGS = 'boilerplate/Game/SAVE_SETTINGS';
export const HANDLE_GAME_STATUS = 'boilerplate/Game/HANDLE_GAME_STATUS';
export const ADD_EVENT = 'boilerplate/Game/ADD_EVENT';
export const ADD_GOAL = 'boilerplate/Game/ADD_GOAL';
export const ADD_YELLOW_CARD = 'boilerplate/Game/ADD_YELLOW_CARD';
export const ADD_RED_CARD = 'boilerplate/Game/ADD_RED_CARD';
export const ADD_BLUE_CARD = 'boilerplate/Game/ADD_BLUE_CARD';
export const ADD_SUSPENSION = 'boilerplate/Game/ADD_SUSPENSION';
export const ADD_TIMEOUT = 'boilerplate/Game/ADD_TIMEOUT';

export const EVENT_TYPES = {
    goal: 'goal',
    yellowCard: 'yellow card',
    redCard: 'red card',
    blueCard: 'blue card',
    suspension: '2 minutes',
    timeout: 'time out',
    gameStart: 'start game',
    gameEnd: 'end game',
    periodStart: 'start period',
    periodEnd: 'end period'
};

export const PERIODS = {
    0: 'warm-up',
    1: 'half-time 1',
    2: 'half-time 2',
    3: 'extra-time half-time 1',
    4: 'extra-time half-time 2',
    5: 'full-time'
};

export const UNKNOWN_PLAYER = {
    ...EMPTY_PLAYER,
    id: 0,
    playerName: '(unknown)'
};
