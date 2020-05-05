/*
 * GameReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
    SAVE_SETTINGS,
    HANDLE_GAME_STATUS,
    ADD_EVENT,
    ADD_GOAL,
    ADD_YELLOW_CARD,
    ADD_RED_CARD,
    ADD_BLUE_CARD,
    ADD_SUSPENSION
} from './constants';
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
        score: 0,
        yellowCards: 0,
        redCards: 0,
        blueCards: 0,
        suspensions: 0,
        timeOuts: 0,
        // TODO: probably remove this
        players: [
            {
                number: 0,
                firstName: 'unknown',
                lastName: ''
            }
        ]
    },
    dataTeamB: {
        score: 0,
        yellowCards: 0,
        redCards: 0,
        blueCards: 0,
        suspensions: 0,
        timeOuts: 0,
        // TODO: Probably remove this
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
                // console.log(action);
                draft.gameStarted = action.gameStarted;
                draft.gamePaused = action.gamePaused;
                break;
            case ADD_EVENT:
                // console.log(ADD_EVENT, action);
                draft.gameEvents.push({
                    eventType: action.eventType,
                    team: action.team,
                    playerNumber: action.playerNumber
                });
                break;
            case ADD_GOAL:
                // console.log(ADD_GOAL, action);
                draft[`dataTeam${action.team}`].score += 1;
                break;
            case ADD_YELLOW_CARD:
                // console.log(ADD_YELLOW_CARD, action);
                draft[`dataTeam${action.team}`].yellowCards += 1;
                break;
            case ADD_RED_CARD:
                // console.log(ADD_RED_CARD, action);
                draft[`dataTeam${action.team}`].redCards += 1;
                break;
            case ADD_BLUE_CARD:
                // console.log(ADD_BLUE_CARD, action);
                draft[`dataTeam${action.team}`].blueCards += 1;
                break;
            case ADD_SUSPENSION:
                // console.log(ADD_SUSPENSION, action);
                draft[`dataTeam${action.team}`].suspensions += 1;
                break;
            default:
        }
    });

export default gameReducer;
