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
    ADD_SUSPENSION,
    ADD_TIMEOUT
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
        goals: 0,
        yellowCards: 0,
        redCards: 0,
        blueCards: 0,
        suspensions: 0,
        timeouts: 0
    },
    dataTeamB: {
        goals: 0,
        yellowCards: 0,
        redCards: 0,
        blueCards: 0,
        suspensions: 0,
        timeouts: 0
    },
    gameEvents: []
};

/* eslint-disable default-case, no-param-reassign */
const gameReducer = (state = initialState, action) =>
    produce(state, draft => {
        let updatedData;
        switch (action.type) {
            case ADD_GOAL:
                updatedData = 'goals';
                break;
            case ADD_YELLOW_CARD:
                updatedData = 'yellowCards';
                break;
            case ADD_RED_CARD:
                updatedData = 'redCards';
                break;
            case ADD_BLUE_CARD:
                updatedData = 'blueCards';
                break;
            case ADD_SUSPENSION:
                updatedData = 'suspensions';
                break;
            default:
        }
        switch (action.type) {
            case SAVE_SETTINGS:
                // console.log(SAVE_SETTINGS, action);
                draft.settings = action.settings;
                break;
            case HANDLE_GAME_STATUS:
                // console.log(HANDLE_GAME_STATUS, action);
                draft.gameStarted = action.gameStarted;
                draft.gamePaused = action.gamePaused;
                break;
            case ADD_EVENT: {
                // console.log(ADD_EVENT, action);
                const { id, team, eventType, memberType, score } = action;
                draft.gameEvents.push({
                    eventType,
                    team,
                    id,
                    memberType,
                    score: {
                        teamA: score.teamA,
                        teamB: score.teamB
                    }
                });
                break;
            }
            case ADD_GOAL:
            case ADD_YELLOW_CARD:
            case ADD_RED_CARD:
            case ADD_BLUE_CARD:
            case ADD_SUSPENSION: {
                // console.log(updatedData, action);
                // UpdatedData is determined in the previous switch statement
                draft[`dataTeam${action.team}`][updatedData] += 1;
                const { memberType } = action;
                draft.settings.teams[action.team][memberType] = draft.settings.teams[action.team][memberType].map(
                    member => {
                        if (member.id === action.id) {
                            return {
                                ...member,
                                [updatedData]: member[updatedData] + 1
                            };
                        }
                        return member;
                    }
                );
                break;
            }
            case ADD_TIMEOUT:
                // console.log(ADD_TIMEOUT, action);
                draft[`dataTeam${action.team}`].timeouts += 1;
                break;
            default:
        }
    });

export default gameReducer;
