import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    Button,
    FormControlLabel,
    Checkbox
} from '@material-ui/core';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import {
    ADD_GOAL,
    ADD_YELLOW_CARD,
    ADD_BLUE_CARD,
    ADD_SUSPENSION,
    UNKNOWN_PLAYER,
    POPUPS,
    EVENT_TYPES
} from '../../containers/Game/constants';
import { MAX_NUMBER, MEMBERS_QUALIFICATIONS, MEMBERS_TYPES } from '../../containers/Settings/constants';
import { naturalSorting } from '../../utils/utilities';

import { messages } from './messages';
import './styles.scss';

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
    const [firstRendering, setFirstRendering] = useState(true);

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

    /**
     * According to the rules of handball:
     *  - there should not be more than 3 yellow cards per team, all players included
     *  - there should not be more than 1 yellow card per team, all officials included
     * @param memberType
     * @param membersList
     * @returns {boolean}
     */
    const disabledAllMembers = (memberType, membersList) => {
        if (eventType === EVENT_TYPES.yellowCard) {
            const yellowCardsLimit =
                memberType === MEMBERS_TYPES.players
                    ? MAX_NUMBER.yellowCardsPlayersPerTeam
                    : MAX_NUMBER.yellowCardsOfficialsPerTeam;
            const warnedMembers = membersList.filter(member => member.yellowCards === yellowCardsLimit);
            if (warnedMembers.length > 0) {
                return true;
            }
        }
        return false;
    };

    const [penalty, setPenalty] = useState(false);
    const handleChangePenalty = e => {
        setPenalty(e.target.checked);
    };
    useEffect(() => {
        setPenalty(false);
    }, [popupVisibility]);

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
            membersListSorted = naturalSorting(playersList, 'reference');
            // But place the unknown player at the first position
            if (firstRendering) {
                membersListSorted.splice(membersListSorted.length, 0, membersListSorted.splice(0, 1)[0]);
                setFirstRendering(false);
            }
        } else {
            // Just sort the list as there is nothing special
            membersListSorted = naturalSorting(playersList, 'reference');
        }
        return membersListSorted;
    };

    const buttonTemplate = (member, type, isDisabled) => (
        <Grid
            item
            key={`${playersListType}${type}Reference${member.id}`}
            hidden={playersListType !== ADD_GOAL && member.id === 0}
            className="players__grid-item"
        >
            <Button
                variant="contained"
                className={`button member member--${type}`}
                onClick={() => {
                    actionHandler({
                        eventType,
                        penalty,
                        type: playersListType,
                        team,
                        id: member.id,
                        memberType: type
                    });
                    closeHandler();
                }}
                disabled={isDisabled}
                title={isDisabled ? messages.maxActionsReached : ''}
                style={{
                    backgroundColor: !isDisabled ? jerseyColour : null,
                    color: referenceColour
                }}
            >
                <span className="member__reference">{member.reference}</span>
                <span className={`member__name${member.reference === '' ? ' member__name--unidentified' : ''}`}>
                    {member.name} {captainId !== 0 && captainId === member.id ? `(${messages.captainInitial})` : ''}
                    {member.qualification && member.qualification === MEMBERS_QUALIFICATIONS.players.goalie
                        ? `(${messages.goalieInitial})`
                        : ''}
                </span>
            </Button>
        </Grid>
    );

    const membersListDisplay = memberType => {
        const membersList = memberType === MEMBERS_TYPES.players ? createPlayersList() : officialsList;
        const buffer = membersList.map(member => {
            // Display all members if it's a goal, or don't display "unknown player"
            if (playersListType === ADD_GOAL || member.id !== 0) {
                const memberDisabled = isMemberDisabled(member) || disabledAllMembers(memberType, membersList);
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
                    {messages[memberType === MEMBERS_TYPES.players ? 'noPlayers' : 'noOfficials']}{' '}
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
        return (
            <Grid container spacing={1} className="players__grid">
                {buffer}
            </Grid>
        );
    };

    return (
        <Dialog
            open={popupVisibility}
            onClose={closeHandler}
            aria-labelledby="dialog-title-players"
            fullWidth
            maxWidth="md"
            className={`member__popup member__popup--${eventType.toLowerCase()}`}
        >
            <DialogTitle id="dialog-title-players" disableTypography>
                <h2 className="title title--action">{messages.titles[playersListType]}...</h2>
            </DialogTitle>
            <DialogContent>
                {playersListType === ADD_GOAL ? (
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={penalty}
                                    onChange={e => handleChangePenalty(e)}
                                    name="penalty"
                                    color="primary"
                                    value
                                />
                            }
                            label={messages.penalty}
                            labelPlacement="start"
                        />
                    </div>
                ) : (
                    ''
                )}
                {membersListDisplay(MEMBERS_TYPES.players)}
                {playersListType !== ADD_GOAL ? membersListDisplay(MEMBERS_TYPES.officials) : ''}
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
