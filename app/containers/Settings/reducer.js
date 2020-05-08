/*
 * SettingsReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
    CHANGE_TEAM_NAME,
    CANCEL_SETTINGS_CHANGE,
    EMPTY_PLAYER,
    ADD_EMPTY_PLAYER,
    CHANGE_PLAYER,
    EMPTY_OFFICIAL,
    ADD_EMPTY_OFFICIAL,
    CHANGE_OFFICIAL
} from './constants';

// The initial state of the App
export const initialState = {
    teams: {
        A: {
            name: 'Team AAA',
            players: [
                {
                    id: 1,
                    playerName: 'Adam',
                    reference: 26,
                    goals: 0,
                    yellowCards: 0,
                    redCards: 0,
                    blueCards: 0,
                    suspensions: 0
                },
                {
                    id: 2,
                    playerName: 'Traverso',
                    reference: 25,
                    goals: 0,
                    yellowCards: 0,
                    redCards: 0,
                    blueCards: 0,
                    suspensions: 0
                }
            ],
            officials: [
                {
                    id: 1,
                    reference: 'A',
                    officialName: 'Puyhardy',
                    yellowCards: 0,
                    redCards: 0,
                    blueCards: 0,
                    suspensions: 0
                }
            ]
        },
        B: {
            name: 'Team B',
            players: [],
            officials: []
        }
    }
};

/* eslint-disable default-case, no-param-reassign */
const settingsReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case CHANGE_TEAM_NAME:
                draft.teams[action.team].name = action.teamName;
                break;
            case ADD_EMPTY_PLAYER:
                // console.log(ADD_EMPTY_PLAYER, action);
                draft.teams[action.team].players = [
                    ...draft.teams[action.team].players,
                    {
                        ...EMPTY_PLAYER,
                        id: action.id,
                        playerName: action.playerName,
                        reference: action.reference
                    }
                ];
                break;
            case CHANGE_PLAYER: {
                // console.log(CHANGE_PLAYER, action);
                draft.teams[action.team].players = draft.teams[action.team].players.map(player => {
                    if (player.id === action.id) {
                        return {
                            ...player,
                            reference: parseInt(action.reference, 10),
                            playerName: action.playerName
                        };
                    }
                    return player;
                });
                break;
            }
            case ADD_EMPTY_OFFICIAL:
                // console.log(ADD_EMPTY_OFFICIAL, action);
                draft.teams[action.team].officials = [
                    ...draft.teams[action.team].officials,
                    {
                        ...EMPTY_OFFICIAL,
                        id: action.id,
                        officialName: action.officialName,
                        reference: action.reference
                    }
                ];
                break;
            case CHANGE_OFFICIAL: {
                // console.log(CHANGE_OFFICIAL, action);
                draft.teams[action.team].officials = draft.teams[action.team].officials.map(official => {
                    if (official.id === action.id) {
                        return {
                            ...official,
                            reference: action.reference.toUpperCase(),
                            officialName: action.officialName
                        };
                    }
                    return official;
                });
                break;
            }
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
