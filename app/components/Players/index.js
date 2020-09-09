import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

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

function Players({
    popupVisibility,
    eventType,
    playersListType,
    team,
    jerseyColour,
    referenceColour,
    playersList,
    captainId,
    officialsList,
    actionHandler,
    closeHandler,
    openPopup
}) {
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
        // If it's for a goal
        if (playersListType === ADD_GOAL) {
            // Find the "unknown player"
            const unknownMemberInserted = playersList.filter(member => member.id === 0);
            // If he's not found yet, add him
            if (unknownMemberInserted.length === 0) {
                playersList.push(UNKNOWN_PLAYER);
            }
            // Then sort the players
            membersListSorted = playersList.sort(compareValues('reference', true));
            // But place the unknown player at the first position
            membersListSorted.splice(membersListSorted.length, 0, membersListSorted.splice(0, 1)[0]);
        } else {
            // Just sort the list as there is nothing special
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
                    closeHandler();
                }}
                disabled={isDisabled}
                title={isDisabled ? messages.maxActionsReached : ''}
                style={type === PERSONS_TYPES.players ? { backgroundColor: jerseyColour, color: referenceColour } : {}}
            >
                {member.reference} {member.name}{' '}
                {captainId !== 0 && captainId === member.id ? `(${messages.captainInitial})` : ''}
            </button>
        </li>
    );

    const membersListDisplay = memberType => {
        const membersList = memberType === PERSONS_TYPES.players ? createPlayersList() : officialsList;
        const buffer = membersList.map(member => {
            // Display all members if it's a goal, or don't display "unknown player"
            if (playersListType === ADD_GOAL || member.id !== 0) {
                const memberDisabled = isMemberDisabled(member);
                return buttonTemplate(member, memberType, memberDisabled);
            }
            return '';
        });
        // If no members or one member but this member is the "unknown player" and we're not setting a goal:
        if (
            membersList.length === 0 ||
            (membersList.length === 1 && membersList[0].id === 0 && playersListType !== ADD_GOAL)
        ) {
            return (
                <p>
                    {messages[memberType === PERSONS_TYPES.players ? 'noPlayers' : 'noOfficials']}{' '}
                    <Button
                        variant="contained"
                        onClick={() => openPopup(POPUPS.settings)}
                        startIcon={<SettingsOutlinedIcon />}
                    >
                        {messages.settings}...
                    </Button>
                    .
                </p>
            );
        }
        return <ul>{buffer}</ul>;
    };

    return (
        <Dialog open={popupVisibility} onClose={closeHandler} aria-labelledby="dialog-title-players">
            <DialogTitle id="dialog-title-players">{`${messages.title}: ${playersListType}`}</DialogTitle>
            <DialogContent>
                <h3>{messages.listOfPlayers}</h3>
                {membersListDisplay(PERSONS_TYPES.players)}
                {playersListType !== ADD_GOAL ? <h3>{messages.listOfOfficials}</h3> : ''}
                {playersListType !== ADD_GOAL ? membersListDisplay(PERSONS_TYPES.officials) : ''}
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={closeHandler}>
                    {messages.cancel}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

Players.propTypes = {
    popupVisibility: PropTypes.bool,
    eventType: PropTypes.string,
    playersListType: PropTypes.string,
    team: PropTypes.string,
    jerseyColour: PropTypes.string,
    referenceColour: PropTypes.string,
    playersList: PropTypes.array,
    captainId: PropTypes.number,
    officialsList: PropTypes.array,
    actionHandler: PropTypes.func,
    closeHandler: PropTypes.func,
    openPopup: PropTypes.func
};

export default Players;
