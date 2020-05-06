/*
 * SettingsReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { CHANGE_TEAM_NAME, CANCEL_SETTINGS_CHANGE, CHANGE_PLAYER } from './constants';

// The initial state of the App
export const initialState = {
    teams: {
        A: {
            name: 'Team AAA',
            players: [
                {
                    id: 1,
                    playerName: 'Adam',
                    playerNumber: 26
                },
                {
                    id: 2,
                    playerName: 'Traverso',
                    playerNumber: 25
                }
            ]
        },
        B: {
            name: 'Team B',
            players: []
        }
    },
    players: {
        // TODO: transform this into an array to simplify it
        teamA: {
            player1: {
                playerNumber: 1,
                playerName: 'Player 1'
            },
            player2: {
                playerNumber: 2,
                playerName: 'Player 2'
            }
        },
        teamB: {
            player1: {
                playerNumber: 11,
                playerName: 'Joueur 1'
            },
            player2: {
                playerNumber: 12,
                playerName: 'Joueur 2'
            }
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
            case CHANGE_PLAYER: {
                // console.log(CHANGE_PLAYER, action);
                draft.teams[action.team].players = draft.teams[action.team].players.map(player => {
                    if (player.id === action.id) {
                        return {
                            ...player,
                            playerNumber: action.playerNumber,
                            playerName: action.playerName
                        };
                    }
                    return player;
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
