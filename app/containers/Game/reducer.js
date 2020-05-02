/*
 * GameReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { SAVE_SETTINGS } from './constants';
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
    date: getToday()
};

/* eslint-disable default-case, no-param-reassign */
const gameReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case SAVE_SETTINGS:
                draft.settings = action.settings;
                break;
            default:
        }
    });

export default gameReducer;
