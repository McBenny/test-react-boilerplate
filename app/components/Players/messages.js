/**
 * This entire object is embedded in /app/components/Line-up/messages.js
 * Remove keys with extreme care.
 */
import {
    ADD_GOAL,
    ADD_YELLOW_CARD,
    ADD_SUSPENSION,
    ADD_RED_CARD,
    ADD_BLUE_CARD
} from '../../containers/Game/constants';

export const messages = {
    title: 'Players',
    titles: {
        [ADD_GOAL]: 'Add a goal for',
        [ADD_YELLOW_CARD]: 'Add a YELLOW card to',
        [ADD_SUSPENSION]: 'Add a 2 minutes suspension to',
        [ADD_RED_CARD]: 'Add a RED card to',
        [ADD_BLUE_CARD]: 'Add a BLUE card to'
    },
    cancel: 'Cancel',
    maxActionsReached: 'Invalid choice for this player',
    listOfPlayers: 'List of players',
    none: 'none',
    penalty: 'Is it a penalty?',
    captainInitial: 'C',
    goalieInitial: 'GK',
    noPlayers: 'No players, please insert players in',
    listOfOfficials: 'List of officials',
    noOfficials: 'No officials, please insert officials in',
    settings: 'Settings'
};
