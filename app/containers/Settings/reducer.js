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
    CHANGE_PLACE,
    CHANGE_VENUE,
    CHANGE_DATE,
    CHANGE_TIME,
    CHANGE_REFEREE_1,
    CHANGE_REFEREE_2,
    CHANGE_SCORE_KEEPER,
    CHANGE_TIME_KEEPER,
    CHANGE_TEAM_NAME,
    CHANGE_COLOUR,
    CHANGE_TEAM_CAPTAIN,
    INIT_SETTINGS,
    EMPTY_MEMBER,
    ADD_EMPTY_MEMBER,
    CHANGE_MEMBER,
    REMOVE_MEMBER,
    MEMBERS_QUALIFICATIONS,
    SWAP_TEAMS
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
 *      place: {string}
 *      venue: {string}
 *      date: {string}
 *      time: {string}
 *      referee1: {string}
 *      referee2: {string}
 *      scoreKeeper: {string}
 *      timeKeeper: {string}
 *      teams: {
 *          A: {
 *              name: {string},
 *              jersey: {string},
 *              reference: {string},
 *              captain: 0,
 *              players: [],
 *              officials: []
 *          },
 *          B: {
 *              name: {string},
 *              jersey: {string},
 *              reference: {string},
 *              captain: 0,
 *              players: [],
 *              officials: []
 *          }
 *      },
 *  }
 * }
 */
const getToday = () => {
    const today = new Date();
    let todayDD = today.getDate();
    todayDD = todayDD < 10 ? `0${todayDD}` : todayDD;
    let todayMM = today.getMonth() + 1;
    todayMM = todayMM < 10 ? `0${todayMM}` : todayMM;
    const todayYYYY = today.getFullYear();
    return `${todayYYYY}-${todayMM}-${todayDD}`;
};

export const initialState = {
    competition: '',
    round: '',
    gender: '',
    place: '',
    venue: '',
    date: getToday(),
    time: '20:00',
    referee1: '',
    referee2: '',
    scoreKeeper: '',
    timeKeeper: '',
    teams: {
        A: {
            name: 'Home HC',
            jersey: '#ffffff',
            reference: '#000000',
            captain: 0,
            players: [],
            officials: []
        },
        B: {
            name: 'Away HC',
            jersey: '#000000',
            reference: '#ffffff',
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
            case CHANGE_PLACE:
                updatedData = 'place';
                break;
            case CHANGE_VENUE:
                updatedData = 'venue';
                break;
            case CHANGE_DATE:
                updatedData = 'date';
                break;
            case CHANGE_TIME:
                updatedData = 'time';
                break;
            case CHANGE_REFEREE_1:
                updatedData = 'referee1';
                break;
            case CHANGE_REFEREE_2:
                updatedData = 'referee2';
                break;
            case CHANGE_SCORE_KEEPER:
                updatedData = 'scoreKeeper';
                break;
            case CHANGE_TIME_KEEPER:
                updatedData = 'timeKeeper';
                break;
            default:
        }
        switch (action.type) {
            case CHANGE_COMPETITION:
            case CHANGE_ROUND:
            case CHANGE_GENDER:
            case CHANGE_PLACE:
            case CHANGE_VENUE:
            case CHANGE_DATE:
            case CHANGE_TIME:
            case CHANGE_REFEREE_1:
            case CHANGE_REFEREE_2:
            case CHANGE_SCORE_KEEPER:
            case CHANGE_TIME_KEEPER:
                // console.log(CHANGE_GENDER, action);
                draft[updatedData] = action.data;
                break;
            case CHANGE_TEAM_NAME:
                // console.log(CHANGE_TEAM_NAME, action);
                draft.teams[action.team].name = action.teamName;
                break;
            case CHANGE_COLOUR:
                // console.log(CHANGE_COLOUR, action);
                draft.teams[action.team][action.part] = action.colour;
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
                        reference: action.reference,
                        qualification: action.qualification ? MEMBERS_QUALIFICATIONS.players.goalie : undefined
                    }
                ];
                break;
            case CHANGE_MEMBER: {
                // console.log(CHANGE_MEMBER, action);
                draft.teams[action.team][action.memberType] = draft.teams[action.team][action.memberType].map(
                    member => {
                        if (member.id === action.id) {
                            // Keep the coming reference if:
                            //   - it's not empty,
                            //   - or, even if it's empty, keep it if the member has no goals or yellow cards or suspensions or red cards registered
                            // Restore previous reference if the coming reference is empty AND they have goals, yellow cards, suspension or red cards registered.
                            const reference =
                                action.reference !== '' ||
                                (member.goals === 0 &&
                                    member.yellowCards === 0 &&
                                    member.suspensions === 0 &&
                                    member.redCards === 0)
                                    ? action.reference
                                    : member.reference;
                            return {
                                ...member,
                                reference,
                                name: action.name,
                                qualification: action.qualification ? MEMBERS_QUALIFICATIONS.players.goalie : undefined
                            };
                        }
                        return member;
                    }
                );
                break;
            }
            case REMOVE_MEMBER: {
                // console.log(REMOVE_MEMBER, action);
                draft.teams[action.team][action.memberType] = draft.teams[action.team][action.memberType].filter(
                    member => member.id !== action.id
                );
                break;
            }
            case SWAP_TEAMS:
                // console.log(SWAP_TEAMS, action);
                draft.teams.A = action.B;
                draft.teams.B = action.A;
                break;
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
