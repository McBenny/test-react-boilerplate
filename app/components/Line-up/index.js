import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import { compareValues } from '../../utils/utilities';
import { messages } from './messages';
import { POPUPS } from '../../containers/Game/constants';
import { PERSONS_TYPES } from '../../containers/Settings/constants';

const memberTemplate = ({ member, memberType, team, captainId, jerseyColour, referenceColour }) => (
    <Grid item key={`lineUp${team}${member.id}`} className="players__grid-item">
        <div className="member__container">
            <Button
                variant="contained"
                className={`button member member--${memberType}`}
                style={{
                    backgroundColor: jerseyColour,
                    color: referenceColour
                }}
            >
                <span className="member__reference">{member.reference}</span>
                <span className="member__name">
                    {member.name}{' '}
                    {captainId !== 0 && captainId === member.id && memberType === PERSONS_TYPES.players
                        ? `(${messages.captainInitial})`
                        : ''}{' '}
                </span>
            </Button>
            <div>
                {member.goals > 0 && `${messages.goals}: ${member.goals}`}
                {member.goals > 0 && <br />}
                {member.yellowCards > 0 && `${messages.yellowCards}: ${member.yellowCards}`}
                {member.yellowCards > 0 && <br />}
                {member.suspensions > 0 && `${messages.suspension}: ${member.suspensions}`}
                {member.suspensions > 0 && <br />}
                {member.redCards > 0 && `${messages.redCards}: ${member.redCards}`}
                {member.redCards > 0 && <br />}
                {member.blueCards > 0 && `${messages.blueCards}: ${member.blueCards}`}
            </div>
        </div>
    </Grid>
);

memberTemplate.propTypes = {
    member: PropTypes.array,
    memberType: PropTypes.string,
    team: PropTypes.string,
    captainId: PropTypes.number,
    jerseyColour: PropTypes.string,
    referenceColour: PropTypes.string
};

const membersListDisplay = ({ memberType, membersList, captainId, team, openPopup, jerseyColour, referenceColour }) => {
    const sortedMembersList = membersList.sort(compareValues('reference'));
    let captainTemplate = '';
    if (captainId !== 0) {
        const captain = memberType === PERSONS_TYPES.players && membersList.filter(player => player.id === captainId);
        if (captain.length === 1) {
            captainTemplate = memberTemplate({
                member: captain[0],
                memberType,
                team,
                captainId,
                jerseyColour,
                referenceColour
            });
        }
    }
    const buffer = sortedMembersList.map(member => {
        // If it's a player, it shouldn't be the "unknown player', nor the captain, all Ok if it's an official
        if ((member.id && member.id !== 0 && member.id !== captainId) || memberType === PERSONS_TYPES.officials) {
            return memberTemplate({
                member,
                memberType,
                team,
                captainId,
                jerseyColour,
                referenceColour
            });
        }
        return '';
    });
    // If no members or just one and it's the "unknown player"
    if (sortedMembersList.length === 0 || (sortedMembersList.length === 1 && sortedMembersList[0].id === 0)) {
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
    return (
        <Grid container spacing={1} className="players__grid">
            {captainTemplate}
            {buffer}
        </Grid>
    );
};

membersListDisplay.propTypes = {
    memberType: PropTypes.string,
    team: PropTypes.string,
    jerseyColour: PropTypes.string,
    referenceColour: PropTypes.string,
    membersList: PropTypes.array,
    captainId: PropTypes.number,
    openPopup: PropTypes.func
};

function LineUp({
    popupVisibility,
    team,
    jerseyColour,
    referenceColour,
    playersList,
    captainId,
    officialsList,
    closeHandler,
    openPopup
}) {
    return (
        <Dialog
            open={popupVisibility}
            onClose={closeHandler}
            aria-labelledby="dialog-title-lineUp"
            fullWidth
            maxWidth="md"
        >
            <DialogTitle id="dialog-title-lineUp">{messages.title}</DialogTitle>
            <DialogContent>
                <h3>{messages.listOfPlayers}</h3>
                {membersListDisplay({
                    memberType: PERSONS_TYPES.players,
                    membersList: playersList,
                    captainId,
                    team,
                    openPopup,
                    jerseyColour,
                    referenceColour
                })}
                <h3>{messages.listOfOfficials}</h3>
                {membersListDisplay({
                    memberType: PERSONS_TYPES.officials,
                    membersList: officialsList,
                    captainId,
                    team,
                    openPopup,
                    jerseyColour,
                    referenceColour
                })}
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={closeHandler}>
                    {messages.cancel}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

LineUp.propTypes = {
    popupVisibility: PropTypes.bool,
    team: PropTypes.string,
    jerseyColour: PropTypes.string,
    referenceColour: PropTypes.string,
    playersList: PropTypes.array,
    captainId: PropTypes.number,
    officialsList: PropTypes.array,
    closeHandler: PropTypes.func,
    openPopup: PropTypes.func
};

export default LineUp;