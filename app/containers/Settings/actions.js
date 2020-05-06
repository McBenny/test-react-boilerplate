/*
 * Settings Actions
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

import { CHANGE_TEAM_A_NAME, CHANGE_TEAM_B_NAME, CANCEL_SETTINGS_CHANGE, CHANGE_PLAYER } from './constants';

// TODO: Try to use a single function for both teams
/**
 * Changes the input field of the form
 * @param  {string} teamAName The new text of the input field
 * @return {object} An action object with a type of CHANGE_TEAM_A_NAME
 */
export function changeTeamAName(teamAName) {
    return {
        type: CHANGE_TEAM_A_NAME,
        teamAName
    };
}

/**
 * Changes the input field of the form
 * @param  {string} teamBName The new text of the input field
 * @return {object} An action object with a type of CHANGE_TEAM_B_NAME
 */
export function changeTeamBName(teamBName) {
    return {
        type: CHANGE_TEAM_B_NAME,
        teamBName
    };
}

/**
 * Changes the input field of the form
 * @param  {object} player The new text of the input field
 * @return {object} An action object with a type of CHANGE_PLAYER
 */
export function changePlayer(player) {
    return {
        type: CHANGE_PLAYER,
        player
    };
}

/**
 * Restore the Game settings in the settings
 * @param  {object} settings The object containing the settings
 * @returns {{settings: *, type: string}}
 */
export function cancelChangeSettings(settings) {
    return {
        type: CANCEL_SETTINGS_CHANGE,
        settings
    };
}
