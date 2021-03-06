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
    ADD_TIMEOUT,
    REMOVE_EVENT,
    REMOVE_EVENT_TIMEOUT,
    REMOVE_GOAL,
    REMOVE_YELLOW_CARD,
    REMOVE_SUSPENSION,
    REMOVE_RED_CARD,
    REMOVE_BLUE_CARD,
    REMOVE_TIMEOUT,
    STORE_SCORE,
    EVENT_TYPES
} from './constants';
import { SESSION_KEY } from '../App/constants';
import { initialState as initialSettings } from '../Settings/reducer';
import LocalStorage from '../../utils/local-storage';

// The initial state of the App
export const initialState = {
    settings: initialSettings,
    gameId: sessionStorage.getItem(SESSION_KEY),
    gameStarted: false,
    gamePaused: true,
    currentPeriod: 0,
    currentScore: {
        // These numbers match the playing periods in ./Game/constants.js:PERIODS
        half1: '',
        half3: '',
        half5: '',
        half7: ''
    },
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

const savedState = LocalStorage.get(sessionStorage.getItem(SESSION_KEY) || '');
const useableState = savedState !== '' ? savedState : initialState;

/* eslint-disable default-case, no-param-reassign */
const gameReducer = (state = useableState, action) =>
    produce(state, draft => {
        let updatedData;
        let penaltyStatus = false;
        switch (action.type) {
            case ADD_GOAL:
            case REMOVE_GOAL:
                updatedData = 'goals';
                penaltyStatus = action.penalty;
                break;
            case ADD_YELLOW_CARD:
            case REMOVE_YELLOW_CARD:
                updatedData = 'yellowCards';
                break;
            case ADD_SUSPENSION:
            case REMOVE_SUSPENSION:
                updatedData = 'suspensions';
                break;
            case ADD_RED_CARD:
            case REMOVE_RED_CARD:
                updatedData = 'redCards';
                break;
            case ADD_BLUE_CARD:
            case REMOVE_BLUE_CARD:
                updatedData = 'blueCards';
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
                draft.gameId = action.gameId;
                draft.gameStarted = action.gameStarted;
                draft.gamePaused = action.gamePaused;
                draft.currentPeriod = action.currentPeriod !== '' ? action.currentPeriod : draft.currentPeriod - 1;
                break;
            case ADD_EVENT: {
                // console.log(ADD_EVENT, action);
                const { id, team, eventType, memberType, score, second2Minutes, penalty, missed } = action;
                draft.gameEvents.push({
                    eventType,
                    second2Minutes,
                    penalty,
                    missed,
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
            case ADD_SUSPENSION:
            case ADD_RED_CARD:
            case ADD_BLUE_CARD: {
                // console.log(updatedData, action);
                // UpdatedData is determined in the previous switch statement
                if (!action.missed) {
                    draft[`dataTeam${action.team}`][updatedData] += action.second2Minutes ? 2 : 1;
                    const { memberType } = action;
                    draft.settings.teams[action.team][memberType] = draft.settings.teams[action.team][memberType].map(
                        member => {
                            if (member.id === action.id) {
                                return {
                                    ...member,
                                    [updatedData]: member[updatedData] + (action.second2Minutes ? 2 : 1),
                                    penalty: penaltyStatus ? member.penalty + 1 : member.penalty
                                };
                            }
                            return member;
                        }
                    );
                }
                break;
            }
            case ADD_TIMEOUT:
                // console.log(ADD_TIMEOUT, action);
                draft[`dataTeam${action.team}`].timeouts += 1;
                break;
            case REMOVE_EVENT: {
                // console.log(REMOVE_EVENT, action);
                draft.gameEvents.pop();
                break;
            }
            case REMOVE_EVENT_TIMEOUT: {
                // console.log(REMOVE_EVENT_TIMEOUT, action);
                if (draft.gameEvents[draft.gameEvents.length - 1].eventType === EVENT_TYPES.timeout) {
                    draft.gameEvents.pop();
                }
                if (draft.gameEvents[draft.gameEvents.length - 1].eventType === EVENT_TYPES.gameResumed) {
                    draft.gameEvents.pop();
                    draft.gameEvents.pop();
                }
                break;
            }
            case REMOVE_GOAL:
            case REMOVE_YELLOW_CARD:
            case REMOVE_SUSPENSION:
            case REMOVE_RED_CARD:
            case REMOVE_BLUE_CARD: {
                // console.log(updatedData, action);
                // UpdatedData is determined in the previous switch statement
                if (!action.missed) {
                    draft[`dataTeam${action.team}`][updatedData] -= action.second2Minutes ? 2 : 1;
                    const { memberType } = action;
                    draft.settings.teams[action.team][memberType] = draft.settings.teams[action.team][memberType].map(
                        member => {
                            if (member.id === action.id) {
                                return {
                                    ...member,
                                    [updatedData]: member[updatedData] - (action.second2Minutes ? 2 : 1),
                                    penalty: penaltyStatus ? member.penalty - 1 : member.penalty
                                };
                            }
                            return member;
                        }
                    );
                }
                break;
            }
            case REMOVE_TIMEOUT:
                // console.log(REMOVE_TIMEOUT, action);
                draft[`dataTeam${action.team}`].timeouts -= 1;
                break;
            case STORE_SCORE: {
                // console.log(STORE_SCORE, action);
                const periodId = action.id !== '' ? action.id : draft.currentPeriod;
                draft.currentScore[`half${periodId}`] = action.currentScore;
                break;
            }
            default:
        }
    });

export default gameReducer;
