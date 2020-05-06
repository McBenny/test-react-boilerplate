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

import { CHANGE_TEAM_NAME, CANCEL_SETTINGS_CHANGE, CHANGE_PLAYER } from './constants';

// TODO: Try to use a single function for both teams
/**
 * Changes the input field of the form
 * @param  {string} team The reference of the team
 * @param  {string} teamName The new text of the input field
 * @return {object} An action object with a type of CHANGE_TEAM_NAME
 */
export function changeTeamName({ team, teamName }) {
    return {
        type: CHANGE_TEAM_NAME,
        team,
        teamName
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
