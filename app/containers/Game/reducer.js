/*
 * GameReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { CHANGE_TEAM_A_NAME } from './constants';

const today = new Date();
const todayDD = today.getDate();
let todayMM = today.getMonth() + 1;
todayMM = todayMM < 10 ? `0${todayMM}` : todayMM;
const todayYYYY = today.getFullYear();

// The initial state of the App
export const initialState = {
    teamAName: 'Team A',
    teamBName: 'Team B',
    date: `${todayDD}/${todayMM}/${todayYYYY}`
};

/* eslint-disable default-case, no-param-reassign */
const gameReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case CHANGE_TEAM_A_NAME:
                draft.teamAName = action.teamAName.replace(/@/gi, '');
                break;
            default:
        }
    });

export default gameReducer;
