/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
    SAVE_SETTINGS,
    HANDLE_GAME_STATUS,
    ADD_GOAL,
    ADD_EVENT,
    ADD_YELLOW_CARD,
    ADD_RED_CARD,
    ADD_BLUE_CARD,
    ADD_SUSPENSION
} from './constants';

/**
 * Saves the settings
 *
 * @param  {object} settings TThe whole lot of settings
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function saveSettings(settings) {
    return {
        type: SAVE_SETTINGS,
        settings
    };
}

export function handleGameStatus(data) {
    return {
        type: HANDLE_GAME_STATUS,
        ...data
    };
}

export function addEvent(data) {
    return {
        type: ADD_EVENT,
        ...data
    };
}

export function addGoal(data) {
    return {
        type: ADD_GOAL,
        ...data
    };
}

export function addYellowCard(data) {
    return {
        type: ADD_YELLOW_CARD,
        ...data
    };
}

export function addRedCard(data) {
    return {
        type: ADD_RED_CARD,
        ...data
    };
}

export function addBlueCard(data) {
    return {
        type: ADD_BLUE_CARD,
        ...data
    };
}

export function addSuspension(data) {
    return {
        type: ADD_SUSPENSION,
        ...data
    };
}
