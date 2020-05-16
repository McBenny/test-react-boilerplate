import React from 'react';
import PropTypes from 'prop-types';
import { compareValues } from '../../utils/utilities';
import { messages } from './messages';
import {
    ADD_GOAL,
    ADD_YELLOW_CARD,
    ADD_BLUE_CARD,
    ADD_SUSPENSION,
    UNKNOWN_PLAYER,
    POPUPS
} from '../../containers/Game/constants';
import { MAX_NUMBER, PERSONS_TYPES } from '../../containers/Settings/constants';
import Modal, { cancelButton } from '../modal';

function Players({ eventType, playersListType, team, playersList, officialsList, actionHandler, closeHandler }) {
    const popup = POPUPS.players;

    /**
     * According to the rules of handball:
     *  - in general, when the maximum number of a sanction is reached, referees can't add the same sanction,
     *  - reaching the maximum number of yellow cards only prevents from receiving another yellow card,
     *  - reaching maximum number of red cards prevents from playing so only possibility: blue card,
     *  - a blue card can only be given to a player with a red card. Reaching maximum number of blue cards prevents from everything,
     *  - reaching maximum number of suspensions still allows for goals and red cards.
     * @param member
     * @returns {boolean|boolean}
     */
    const isMemberDisabled = member => {
        const yellowCardsMax =
            playersListType === ADD_YELLOW_CARD &&
            (member.yellowCards >= MAX_NUMBER.yellowCards || member.suspensions > 0);
        const redCardsMax = playersListType !== ADD_BLUE_CARD && member.redCards >= MAX_NUMBER.redCards;
        const blueCardsMax =
            playersListType === ADD_BLUE_CARD &&
            (member.redCards < MAX_NUMBER.redCards || member.blueCards >= MAX_NUMBER.blueCards);
        const suspensionsMax =
            (playersListType === ADD_YELLOW_CARD || playersListType === ADD_SUSPENSION) &&
            member.suspensions >= MAX_NUMBER.suspensions;
        return yellowCardsMax || redCardsMax || blueCardsMax || suspensionsMax;
    };

    const createPlayersList = () => {
        let membersListSorted;
        const unknownMemberInserted = playersList.filter(member => member.id === 0);
        if (playersListType === ADD_GOAL) {
            if (unknownMemberInserted.length === 0) {
                playersList.push(UNKNOWN_PLAYER);
            }
            membersListSorted = playersList.sort(compareValues('reference', true));
            membersListSorted.splice(membersListSorted.length, 0, membersListSorted.splice(0, 1)[0]);
        } else {
            membersListSorted = playersList.sort(compareValues('reference', true));
        }
        return membersListSorted;
    };

    const buttonTemplate = (member, type, isDisabled) => (
        <li
            key={`${playersListType}${type}Reference${member.id}`}
            hidden={playersListType !== ADD_GOAL && member.id === 0}
        >
            <button
                type="button"
                onClick={() => {
                    actionHandler({
                        eventType,
                        type: playersListType,
                        team,
                        id: member.id,
                        memberType: type
                    });
                    closeHandler(popup);
                }}
                disabled={isDisabled}
                title={isDisabled ? messages.maxActionsReached : ''}
            >
                {member.reference} {member.name}
            </button>
        </li>
    );

    const playersListDisplay = () => {
        const cleanMembersList = createPlayersList();
        const buffer = cleanMembersList.map(member => {
            const memberDisabled = isMemberDisabled(member);
            return buttonTemplate(member, PERSONS_TYPES.players, memberDisabled);
        });
        if (cleanMembersList.length === 0) {
            return <p>{messages.noPlayers}</p>;
        }
        return <ul>{buffer}</ul>;
    };

    const officialsListDisplay = () => {
        const buffer = officialsList.map(member => {
            const memberDisabled = isMemberDisabled(member);
            return buttonTemplate(member, PERSONS_TYPES.officials, memberDisabled);
        });
        if (officialsList.length === 0) {
            return <p>{messages.noOfficials}</p>;
        }
        return <ul>{buffer}</ul>;
    };

    return (
        <Modal title={`${messages.title}: ${playersListType}`} closeHandler={closeHandler} popup={popup}>
            <h3>{messages.listOfPlayers}</h3>
            {playersListDisplay()}
            {playersListType !== ADD_GOAL ? <h3>{messages.listOfOfficials}</h3> : ''}
            {playersListType !== ADD_GOAL ? officialsListDisplay() : ''}
            {cancelButton(closeHandler, popup)}
        </Modal>
    );
}

Players.propTypes = {
    eventType: PropTypes.string,
    playersListType: PropTypes.string,
    team: PropTypes.string,
    playersList: PropTypes.array,
    officialsList: PropTypes.array,
    actionHandler: PropTypes.func,
    closeHandler: PropTypes.func
};

export default Players;
