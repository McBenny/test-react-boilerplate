import { messages as HomeMessages } from '../../containers/HomePage/messages';

export const messages = {
    ...HomeMessages,
    title: 'Duplicate a game',
    question: 'Are you sure you want to duplicate the following game?',
    caption: 'Match data',
    match: 'Teams and score',
    typeOfDuplication: 'What type of duplication do you want?',
    duplicationTypes: {
        full: 'Full game',
        initial: 'Settings only (game not started)'
    },
    cancel: 'Cancel',
    confirm: 'Confirm'
};
