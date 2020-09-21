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

import {
    CHANGE_GENDER,
    GENDERS,
    CHANGE_TEAM_NAME,
    CHANGE_COLOUR,
    CHANGE_TEAM_CAPTAIN,
    INIT_SETTINGS,
    ADD_EMPTY_MEMBER,
    CHANGE_MEMBER,
    SWAP_TEAMS
} from './constants';

/**
 * Changes a single input field of the form
 * @param  {string} type The type of actions to perform
 * @param  {string} data The new text of the input field
 * @return {object} An action object with a type of CHANGE_XXX
 */
export function changeSetting({ type, data }) {
    if (type !== CHANGE_GENDER || (type === CHANGE_GENDER && GENDERS[data])) {
        return {
            type,
            data
        };
    }
    // Minimum object to return as an action
    return { type: null };
}

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
 * @param  {string} team The reference of the team
 * @param  {string} part The part to be changed
 * @param  {string} colour The new text of the input field
 * @return {object} An action object with a type of CHANGE_COLOUR
 */
export function changeColour({ team, part, colour }) {
    return {
        type: CHANGE_COLOUR,
        team,
        part,
        colour
    };
}

/**
 * Changes the input field of the form
 * @param  {string} team The reference of the team
 * @param  {string} captain The new text of the input field
 * @return {object} An action object with a type of CHANGE_TEAM_CAPTAIN
 */
export function changeTeamCaptain({ team, captain }) {
    return {
        type: CHANGE_TEAM_CAPTAIN,
        team,
        captain
    };
}

/**
 * Changes the input field of the form
 * @param  {object} member The new text of the input field
 * @return {object} An action object with a type of ADD_EMPTY_MEMBER
 */
export function addEmptyMember(member) {
    return {
        type: ADD_EMPTY_MEMBER,
        ...member
    };
}

/**
 * Changes the input field of the form
 * @param  {object} member The new text of the input field
 * @return {object} An action object with a type of CHANGE_MEMBER
 */
export function changeMember(member) {
    return {
        type: CHANGE_MEMBER,
        ...member
    };
}

/**
 * Swaps the teams
 * @param  {object} teams The object containing the 2 teams
 * @return {object} An action object with a type of SWAP_TEAMS
 */
export function swapTeams(teams) {
    return {
        type: SWAP_TEAMS,
        ...teams
    };
}

/**
 * Restore the Game settings in the settings
 * @param  {object} settings The object containing the settings
 * @returns {{settings: *, type: string}}
 */
export function initSettings(settings) {
    return {
        type: INIT_SETTINGS,
        settings
    };
}
