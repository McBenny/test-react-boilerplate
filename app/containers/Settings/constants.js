/*
 * SettingsConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_TEAM_NAME = 'boilerplate/Settings/CHANGE_TEAM_NAME';
export const CHANGE_PLAYER = 'boilerplate/Settings/CHANGE_PLAYER';
export const CANCEL_SETTINGS_CHANGE = 'boilerplate/Settings/CANCEL_SETTINGS_CHANGE';
