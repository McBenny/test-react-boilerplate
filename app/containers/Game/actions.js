/*
 * Game Actions
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
    ADD_EVENT,
    REMOVE_EVENT,
    REMOVE_EVENT_TIMEOUT,
    REMOVE_TIMEOUT,
    STORE_SCORE,
    EVENT_TYPES
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

export function removeEvent(eventType) {
    return {
        type: eventType === EVENT_TYPES.timeout ? REMOVE_EVENT_TIMEOUT : REMOVE_EVENT
    };
}

export function addAction(data) {
    return {
        type: data.type,
        ...data
    };
}

export function removeTimeout(data) {
    return {
        type: REMOVE_TIMEOUT,
        ...data
    };
}

export function storeScore(data) {
    return {
        type: STORE_SCORE,
        ...data
    };
}
