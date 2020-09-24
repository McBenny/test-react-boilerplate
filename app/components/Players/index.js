import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import { compareValues } from '../../utils/utilities';
import './styles.scss';
import { messages } from './messages';
import {
    ADD_GOAL,
    ADD_YELLOW_CARD,
    ADD_BLUE_CARD,
    ADD_SUSPENSION,
    UNKNOWN_PLAYER,
    POPUPS
} from '../../containers/Game/constants';
import { MAX_NUMBER, MEMBERS_QUALIFICATIONS, MEMBERS_TYPES } from '../../containers/Settings/constants';

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
            membersListSorted = playersList.sort(compareValues('reference', true, true));
            // But place the unknown player at the first position
            if (firstRendering) {
                membersListSorted.splice(membersListSorted.length, 0, membersListSorted.splice(0, 1)[0]);
                setFirstRendering(false);
            }
        } else {
            // Just sort the list as there is nothing special
            membersListSorted = playersList.sort(compareValues('reference', true, true));
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
                <span className="member__name">
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
        >
            <DialogTitle id="dialog-title-players">{messages.titles[playersListType]}</DialogTitle>
            <DialogContent>
                <h3 className="member__title">{messages.listOfPlayers}</h3>
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
                {playersListType !== ADD_GOAL ? (
                    <Fragment>
                        <h3 className="member__title">{messages.listOfOfficials}</h3>
                        {membersListDisplay(MEMBERS_TYPES.officials)}
                    </Fragment>
                ) : (
                    ''
                )}
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
