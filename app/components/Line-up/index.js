import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@material-ui/core';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import { POPUPS } from '../../containers/Game/constants';
import { MEMBERS_QUALIFICATIONS, MEMBERS_TYPES } from '../../containers/Settings/constants';
import { naturalSorting, printResponsiveLabels } from '../../utils/utilities';

import { messages } from './messages';
import './styles.scss';

const SORTING = {
    reference: 'reference',
    name: 'name',
    goals: 'goals',
    yellowCards: 'yellowCards',
    suspensions: 'suspensions',
    redCards: 'redCards',
    blueCards: 'blueCards'
};

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
                <span className="laptop-mode member__name">
                    {member.name}{' '}
                    {captainId !== 0 && captainId === member.id && memberType === MEMBERS_TYPES.players
                        ? `(${messages.captainInitial})`
                        : ''}{' '}
                    {member.qualification && member.qualification === MEMBERS_QUALIFICATIONS.players.goalie
                        ? `(${messages.goalieInitial})`
                        : ''}
                </span>
            </Button>
            <div>
                {member.goals > 0 ? (
                    <Fragment>
                        {messages.goals}: {member.goals}
                        {member.penalty > 0 ? (
                            <Fragment>
                                {' '}
                                (<span title={messages.penaltiesHelpText}>{messages.penaltyInitial}</span>:{' '}
                                {member.penalty})
                            </Fragment>
                        ) : (
                            ''
                        )}
                        <br />
                    </Fragment>
                ) : (
                    ''
                )}
                {member.yellowCards > 0 && (
                    <>
                        {printResponsiveLabels(messages.yellowCards)}: {member.yellowCards}
                    </>
                )}
                {member.yellowCards > 0 && <br />}
                {member.suspensions > 0 && (
                    <>
                        {printResponsiveLabels(messages.suspension)}: {member.suspensions}
                    </>
                )}
                {member.suspensions > 0 && <br />}
                {member.redCards > 0 && (
                    <>
                        {printResponsiveLabels(messages.redCards)}: {member.redCards}
                    </>
                )}
                {member.redCards > 0 && <br />}
                {member.blueCards > 0 && (
                    <>
                        {printResponsiveLabels(messages.blueCards)}: {member.blueCards}
                    </>
                )}
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

const membersListDisplay = ({
    memberType,
    membersList,
    sorting,
    sortingOrder,
    captainId,
    team,
    openPopup,
    jerseyColour,
    referenceColour
}) => {
    const sortedMembersList = naturalSorting(
        membersList,
        memberType === MEMBERS_TYPES.players ? sorting : SORTING.reference,
        sortingOrder
    );
    let captainTemplate = '';
    if (captainId !== 0) {
        const captain = memberType === MEMBERS_TYPES.players && membersList.filter(player => player.id === captainId);
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
        // If (it's an identified player, it shouldn't be the captain) OR (it's the unidentified player, then he should
        // have goals registered) OR it's an official
        if (
            (member.id !== 0 && member.id !== captainId) ||
            (member.id === 0 && member.goals > 0) ||
            memberType === MEMBERS_TYPES.officials
        ) {
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
    // If no members or just one and it's the "unknown player" and he has no goals
    if (
        sortedMembersList.length === 0 ||
        (sortedMembersList.length === 1 && sortedMembersList[0].id === 0 && sortedMembersList[0].goals === 0)
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
    sorting: PropTypes.string,
    sortingOrder: PropTypes.string,
    captainId: PropTypes.number,
    openPopup: PropTypes.func
};

function radioButtonTemplate(value) {
    return (
        <FormControlLabel
            key={`line-up-sorting-${value}`}
            value={SORTING[value]}
            control={<Radio disableRipple color="default" />}
            label={printResponsiveLabels(messages[`sorting_${value}`])}
        />
    );
}
function createRadioList() {
    const sortingKeys = Object.keys(SORTING);
    return sortingKeys.map(key => radioButtonTemplate(key));
}

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
    const cleanPlayersList = playersList.filter(player => player.id !== 0);
    const [activeSorting, setActiveSorting] = useState(SORTING.reference);
    const closeAndReset = () => {
        setActiveSorting(SORTING.reference);
        closeHandler();
    };

    return (
        <Dialog
            open={popupVisibility}
            onClose={closeAndReset}
            aria-labelledby="dialog-title-lineUp"
            fullWidth
            maxWidth="md"
        >
            <DialogTitle id="dialog-title-lineUp" disableTypography>
                <h2 className="title title--action">{messages.title}</h2>
            </DialogTitle>
            <DialogContent>
                <h3 className="title title--45">
                    {messages.listOfPlayers} ({cleanPlayersList.length})
                </h3>
                {playersList.length > 0 ? (
                    <RadioGroup
                        aria-labelledby="sorting"
                        name="sorting"
                        value={activeSorting}
                        onChange={e => setActiveSorting(e.target.value)}
                        className="line-up__sorting-group"
                    >
                        <h4 id="sorting" className="title title--radio-group">
                            {messages.sorting}
                        </h4>
                        {createRadioList()}
                    </RadioGroup>
                ) : (
                    <></>
                )}
                {membersListDisplay({
                    memberType: MEMBERS_TYPES.players,
                    membersList: playersList,
                    sorting: activeSorting,
                    sortingOrder:
                        activeSorting === SORTING.reference || activeSorting === SORTING.name ? 'ASC' : 'DESC',
                    captainId,
                    team,
                    openPopup,
                    jerseyColour,
                    referenceColour
                })}
                <h3 className="title title--45">
                    {messages.listOfOfficials} ({officialsList.length > 0 ? officialsList.length : messages.none})
                </h3>
                {membersListDisplay({
                    memberType: MEMBERS_TYPES.officials,
                    membersList: officialsList,
                    captainId,
                    team,
                    openPopup,
                    jerseyColour,
                    referenceColour
                })}
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={closeAndReset}>
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
