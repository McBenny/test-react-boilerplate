/*
 * SettingsReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { CHANGE_TEAM_A_NAME, CHANGE_TEAM_B_NAME, CANCEL_SETTINGS_CHANGE, CHANGE_PLAYER } from './constants';

// The initial state of the App
export const initialState = {
    teamAName: 'Team A',
    teamBName: 'Team B',
    players: {
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
            case CHANGE_TEAM_A_NAME:
                draft.teamAName = action.teamAName;
                break;
            case CHANGE_TEAM_B_NAME:
                draft.teamBName = action.teamBName;
                break;
            case CHANGE_PLAYER: {
                // console.log(CHANGE_PLAYER, action);
                const targetPlayer = draft.players[`team${action.player.team}`][`player${action.player.playerIndex}`];
                if (action.player.playerNumber) {
                    targetPlayer.playerNumber = parseInt(action.player.playerNumber, 10);
                }
                if (action.player.playerName) {
                    targetPlayer.playerName = action.player.playerName;
                }
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
