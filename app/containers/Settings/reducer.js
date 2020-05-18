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
    CHANGE_COMPETITION,
    CHANGE_ROUND,
    CHANGE_GENDER,
    CHANGE_TEAM_NAME,
    CHANGE_TEAM_CAPTAIN,
    INIT_SETTINGS,
    EMPTY_MEMBER,
    ADD_EMPTY_MEMBER,
    CHANGE_MEMBER,
    PERSONS_TYPES
} from './constants';

// The initial state of the App
/**
 *
 * @type {
 *  {
 *      gameId: {string},
 *      competition: {string}
 *      round: {string},
 *      gender: {string}
 *      teams: {
 *          A: {
 *              players: [],
 *              captain: 0,
 *              name: {string},
 *              officials: []
 *          },
 *          B: {
 *              players: [],
 *              captain: 0,
 *              name: {string},
 *              officials: []
 *          }
 *      },
 *  }
 * }
 */
export const initialState = {
    competition: '',
    round: '',
    gender: '',
    teams: {
        A: {
            name: 'Team A',
            captain: 0,
            players: [],
            officials: []
        },
        B: {
            name: 'Team B',
            captain: 0,
            players: [],
            officials: []
        }
    }
};

/* eslint-disable default-case, no-param-reassign */
const settingsReducer = (state = initialState, action) =>
    produce(state, draft => {
        let updatedData;
        switch (action.type) {
            case CHANGE_COMPETITION:
                updatedData = 'competition';
                break;
            case CHANGE_ROUND:
                updatedData = 'round';
                break;
            case CHANGE_GENDER:
                updatedData = 'gender';
                break;
            default:
        }
        switch (action.type) {
            case CHANGE_COMPETITION:
            case CHANGE_ROUND:
            case CHANGE_GENDER:
                // console.log(CHANGE_GENDER, action);
                draft[updatedData] = action.data;
                break;
            case CHANGE_TEAM_NAME:
                // console.log(CHANGE_TEAM_NAME, action);
                draft.teams[action.team].name = action.teamName;
                break;
            case CHANGE_TEAM_CAPTAIN:
                // console.log(CHANGE_TEAM_CAPTAIN, action);
                draft.teams[action.team].captain = action.captain;
                break;
            case ADD_EMPTY_MEMBER:
                // console.log(ADD_EMPTY_MEMBER, action);
                draft.teams[action.team][action.memberType] = [
                    ...draft.teams[action.team][action.memberType],
                    {
                        ...EMPTY_MEMBER[action.memberType],
                        id: action.id,
                        name: action.name,
                        reference: action.reference
                    }
                ];
                break;
            case CHANGE_MEMBER: {
                // console.log(CHANGE_MEMBER, action);
                const reference =
                    action.memberType === PERSONS_TYPES.players ? parseInt(action.reference, 10) : action.reference;
                draft.teams[action.team][action.memberType] = draft.teams[action.team][action.memberType].map(
                    member => {
                        if (member.id === action.id) {
                            return {
                                ...member,
                                reference,
                                name: action.name
                            };
                        }
                        return member;
                    }
                );
                break;
            }
            case INIT_SETTINGS: {
                // console.log(INIT_SETTINGS, action);
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
