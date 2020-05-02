/*
 * GameReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { SAVE_SETTINGS, HANDLE_GAME_STATUS } from './constants';
import { initialState as initialSettings } from '../Settings/reducer';

const getToday = () => {
    const today = new Date();
    let todayDD = today.getDate();
    todayDD = todayDD < 10 ? `0${todayDD}` : todayDD;
    let todayMM = today.getMonth() + 1;
    todayMM = todayMM < 10 ? `0${todayMM}` : todayMM;
    const todayYYYY = today.getFullYear();
    return `${todayDD}/${todayMM}/${todayYYYY}`;
};

// The initial state of the App
export const initialState = {
    settings: initialSettings,
    date: getToday(),
    gameStarted: false,
    gamePaused: true,
    currentPeriod: 0,
    dataTeamA: {
        score: 7,
        yellowCards: 0,
        redCards: 0,
        blueCards: 0,
        suspensions: 0,
        timeOuts: 0,
        players: [
            {
                number: 0,
                firstName: 'unknown',
                lastName: ''
            }
        ]
    },
    dataTeamB: {
        score: 5,
        yellowCards: 0,
        redCards: 0,
        blueCards: 0,
        suspensions: 0,
        timeOuts: 0,
        players: [
            {
                number: 0,
                firstName: 'unknown',
                lastName: ''
            }
        ]
    },
    gameEvents: []
};

/* eslint-disable default-case, no-param-reassign */
const gameReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case SAVE_SETTINGS:
                draft.settings = action.settings;
                break;
            case HANDLE_GAME_STATUS:
                console.log(action);
                draft.gameStarted = action.gameStarted;
                draft.gamePaused = action.gamePaused;
                break;
            default:
        }
    });

export default gameReducer;
