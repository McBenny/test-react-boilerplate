/*
 * Settings screen
 *
 * This is a "pop-up" displaying settings on top of the main screen
 *
 */

import React, { Fragment, memo, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    MenuItem,
    InputLabel,
    TextField,
    Select,
    Checkbox,
    Button,
    IconButton,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from '@material-ui/core';
import PersonAddDisabledOutlinedIcon from '@material-ui/icons/PersonAddDisabledOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Sketch from 'react-color/lib/Sketch';

import {
    CHANGE_COMPETITION,
    CHANGE_GENDER,
    CHANGE_ROUND,
    CHANGE_PLACE,
    CHANGE_VENUE,
    CHANGE_DATE,
    CHANGE_TIME,
    CHANGE_REFEREE_1,
    CHANGE_REFEREE_2,
    CHANGE_SCORE_KEEPER,
    CHANGE_TIME_KEEPER,
    EMPTY_MEMBER,
    GENDERS,
    MAX_NUMBER,
    OFFICIALS_REFERENCES,
    MEMBERS_TYPES,
    TEAM_PARTS,
    MEMBERS_QUALIFICATIONS,
    TEAMS_LIST,
    SWAP_TEAMS
} from './constants';
import { useInjectReducer } from '../../utils/injectReducer';
import { generateId, naturalSorting, printResponsiveLabels } from '../../utils/utilities';

import { saveSettings } from '../Game/actions';
import {
    addEmptyMember,
    changeSetting,
    changeTeamName,
    changeColour,
    changeMember,
    removeMember,
    changeTeamCaptain,
    swapTeams,
    initSettings
} from './actions';
import {
    makeSelectCompetition,
    makeSelectGameId,
    makeSelectGender,
    makeSelectPlace,
    makeSelectVenue,
    makeSelectDate,
    makeSelectTime,
    makeSelectReferee1,
    makeSelectReferee2,
    makeSelectScoreKeeper,
    makeSelectTimeKeeper,
    makeSelectRound,
    makeSelectTeams
} from './selectors';
import reducer from './reducer';

import { messages } from './messages';
import './styles.scss';

const key = 'settings';

export function Settings({
    popupVisibility,
    gameId,
    competition,
    round,
    gender,
    place,
    venue,
    date,
    time,
    referee1,
    referee2,
    scoreKeeper,
    timeKeeper,
    teams,
    onChangeSetting,
    onChangeTeamName,
    onChangeColour,
    onAddEmptyMember,
    onChangeMember,
    onRemoveMember,
    onChangeTeamCaptain,
    onSwapTeams,
    onSaveSettings,
    onOpenSettings,
    settingsData,
    gameStarted,
    closeHandler
}) {
    useInjectReducer({ key, reducer });
    const handleChangeSetting = (e, setting) => {
        onChangeSetting({ type: setting, data: e.target.value });
    };

    const handleChangeTeamName = (e, team) => {
        onChangeTeamName({ team, teamName: e.target.value });
    };

    const handleSwapTeams = () => {
        onSwapTeams(teams);
    };

    const initialColoursState = {
        jerseyA: false,
        referenceA: false,
        jerseyB: false,
        referenceB: false
    };

    const [teamColoursStatuses, setTeamColoursStatuses] = useState(initialColoursState);
    const handleChangeColour = (colourCode, team, part) => {
        onChangeColour({ team, part, colour: colourCode });
    };
    const presetColours = ['#198c3b', '#fcc625', '#000000', '#3C8195', '#ffffff', '#023062', '#CE8E07'];

    const handleChangeTeamCaptain = (e, team) => {
        onChangeTeamCaptain({ team, captain: parseInt(e.target.value, 10) });
    };

    const saveInitialisation = e => {
        e.preventDefault();
        // Keep players if:
        //   - their reference is not empty,
        //   - or, even if their reference is empty, keep those who have goals or yellow cards or suspensions or red cards registered
        // Remove players if their reference if empty AND they have no goals, yellow cards, suspension or red cards registered.
        const teamAPlayersCleaned = teams.A.players.filter(
            member =>
                member.reference !== '' ||
                member.id === 0 ||
                member.goals !== 0 ||
                member.yellowCards !== 0 ||
                member.suspensions !== 0 ||
                member.redCards !== 0
        );
        const teamAOfficialsCleaned = teams.A.officials.filter(member => member.name.trim() !== '');
        teams.A.players.splice(0, teams.A.players.length, ...teamAPlayersCleaned);
        teams.A.officials.splice(0, teams.A.officials.length, ...teamAOfficialsCleaned);

        const teamBPlayersCleaned = teams.B.players.filter(
            member =>
                member.reference !== '' ||
                member.id === 0 ||
                member.goals !== 0 ||
                member.yellowCards !== 0 ||
                member.suspensions !== 0 ||
                member.redCards !== 0
        );
        const teamBOfficialsCleaned = teams.B.officials.filter(member => member.name.trim() !== '');
        teams.B.players.splice(0, teams.B.players.length, ...teamBPlayersCleaned);
        teams.B.officials.splice(0, teams.B.officials.length, ...teamBOfficialsCleaned);

        const newGameId = generateId();
        onSaveSettings({
            ...settingsData,
            gameId: gameId === '' ? newGameId : gameId,
            competition,
            round,
            gender,
            place,
            venue,
            date,
            time,
            referee1,
            referee2,
            scoreKeeper,
            timeKeeper,
            teams
        });
        closeHandler();
    };

    const gendersList = () => {
        const gendersKeys = Object.keys(GENDERS);
        return gendersKeys.map(genderKey => (
            <MenuItem key={`genders${genderKey}`} value={genderKey}>
                {GENDERS[genderKey]}
            </MenuItem>
        ));
    };

    const addMemberButton = (team, type) => {
        const membersList = teams[team][type];
        const membersLength = membersList.length;
        let maxId = 0;
        if (membersLength > 0) {
            maxId = membersList.reduce((max, member) => (member.id > max ? member.id : max), membersList[0].id);
        }
        return membersLength < MAX_NUMBER[type] ? (
            <Button
                onClick={() => {
                    onAddEmptyMember({
                        ...EMPTY_MEMBER[type],
                        id: maxId + 1,
                        team,
                        memberType: type,
                        reference: type === MEMBERS_TYPES.players ? '100' : OFFICIALS_REFERENCES[maxId]
                    });
                }}
                title={messages[type === MEMBERS_TYPES.players ? 'addPlayer' : 'addOfficial']}
                variant="contained"
                startIcon={<PersonAddOutlinedIcon />}
                className="settings__button settings__button--add-member"
            >
                {printResponsiveLabels(messages[type === MEMBERS_TYPES.players ? 'addPlayer' : 'addOfficial'])}
            </Button>
        ) : (
            ''
        );
    };

    /**
     * Displays 2 input fields to add/read a member's data
     * @param team    Must be TEAMS_LIST.HOME or TEAMS_LIST.AWAY
     * @param type    the constant of the type of members to list
     * @param member  the actual member
     * @returns {JSX.Element}
     */
    const currentLine = useRef(null);
    const memberLineTemplate = (team, member, type) => {
        let labelName;
        let labelNumber;
        let labelQualification;
        let pattern;
        let patternTitle;
        if (type === MEMBERS_TYPES.players) {
            labelNumber = 'playerNumber';
            labelName = 'playerName';
            labelQualification = 'playersQualification';
            pattern = '[0-9][0-9]*|[a-zA-Z]{1,3}';
            patternTitle = 'numberPattern';
        } else {
            labelNumber = 'officialReference';
            labelName = 'officialName';
            pattern = '[A-D]';
            patternTitle = 'referencePattern';
        }
        return (
            <TableRow key={`${type}${team}${member.id}`} ref={currentLine} className="settings__player-line">
                <TableCell className="MuiTableCell-first">
                    <TextField
                        id={`${type}Reference${team}${member.id}`}
                        value={member.reference}
                        onChange={e =>
                            onChangeMember({
                                team,
                                memberType: type,
                                id: member.id,
                                reference: e.target.value,
                                name: member.name,
                                qualification: member.qualification
                            })
                        }
                        pattern={pattern}
                        inputProps={{
                            maxLength: 3,
                            'aria-label': messages[labelNumber]
                        }}
                        title={messages[patternTitle]}
                        required
                        disabled={type === MEMBERS_TYPES.officials}
                        size="small"
                        margin="dense"
                        variant="outlined"
                        className="settings__text-input settings__text-input--reference"
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        id={`${type}Name${team}${member.id}`}
                        value={member.name}
                        onChange={e =>
                            onChangeMember({
                                team,
                                memberType: type,
                                id: member.id,
                                reference: member.reference,
                                name: e.target.value,
                                qualification: member.qualification
                            })
                        }
                        inputProps={{
                            'aria-label': messages[labelName]
                        }}
                        size="small"
                        margin="dense"
                        variant="outlined"
                    />
                </TableCell>
                {type === MEMBERS_TYPES.players ? (
                    <TableCell padding="checkbox" align="center">
                        <Checkbox
                            checked={member.qualification === MEMBERS_QUALIFICATIONS.players.goalie}
                            onChange={e =>
                                onChangeMember({
                                    team,
                                    memberType: type,
                                    id: member.id,
                                    reference: member.reference,
                                    name: member.name,
                                    qualification: e.target.checked
                                })
                            }
                            name={`${type}Qualification${team}${member.id}`}
                            value={MEMBERS_QUALIFICATIONS.players.goalie}
                            title={messages[`${labelQualification}HelpText`]}
                            inputProps={{ 'aria-label': messages[labelQualification] }}
                            color="default"
                        />
                    </TableCell>
                ) : (
                    <></>
                )}
                <TableCell align="center">
                    {/* eslint-disable indent */}
                    {member.goals === 0 &&
                    member.yellowCards === 0 &&
                    member.redCards === 0 &&
                    member.suspensions === 0 ? (
                        <IconButton
                            onClick={() =>
                                onRemoveMember({
                                    team,
                                    memberType: type,
                                    id: member.id
                                })
                            }
                            size="medium"
                            arial-label={messages[`${type}Remove`]}
                        >
                            <PersonAddDisabledOutlinedIcon />
                        </IconButton>
                    ) : (
                        <></>
                    )}
                    {/* eslint-enable indent */}
                </TableCell>
            </TableRow>
        );
    };

    /**
     * Displays the formatted members list with/without an "add" button
     * @param team          Must be TEAMS_LIST.HOME or TEAMS_LIST.AWAY
     * @param memberType    the constant of the type of members to list
     * @returns {JSX.Element}
     */
    const displayMembersList = (team, memberType) => {
        const membersList = naturalSorting(teams[team][memberType], 'reference');
        const membersLength = membersList.length;
        let buffer = [];
        if (membersLength > 0) {
            const cleanMembersList = membersList.filter(member => member.id !== 0);
            buffer = cleanMembersList.map(member => {
                // Clear out the "unidentified" player
                if (member.id !== 0) {
                    return memberLineTemplate(team, member, memberType);
                }
                return false;
            });
        }
        if (buffer.length > 0) {
            return (
                <TableContainer className="settings__table">
                    <Table padding="none" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>{printResponsiveLabels(messages[`${memberType}Reference`])}</TableCell>
                                <TableCell>{printResponsiveLabels(messages[`${memberType}Name`])}</TableCell>
                                {memberType === MEMBERS_TYPES.players ? (
                                    <TableCell className="settings__table-header settings__table-header--checkbox">
                                        {printResponsiveLabels(messages.playersQualificationHelpText)}
                                    </TableCell>
                                ) : (
                                    <></>
                                )}
                                <TableCell className="settings__table-header">
                                    {printResponsiveLabels(messages[`${memberType}Remove`])}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{buffer}</TableBody>
                    </Table>
                </TableContainer>
            );
        }
        return <></>;
    };

    /**
     * Returns a formatted string with the number of members (type) from specified team
     * @param team          Must be TEAMS_LIST.HOME or TEAMS_LIST.AWAY
     * @param memberType    the constant of the type of members to count
     * @returns {string|string}
     */
    const displayMembersCount = (team, memberType) => {
        const membersList = teams[team][memberType];
        // Clear out the "unidentified" player
        const cleanMembersList = membersList.filter(member => member.reference !== '');
        const membersNumber = cleanMembersList.length;
        return membersNumber > 0 ? ` (${membersNumber})` : '';
    };

    /**
     * This is to display a list of players to choose from as a Captain
     * @param team      Must be TEAMS_LIST.HOME or TEAMS_LIST.AWAY
     * @returns {*}
     */
    const captainList = team => {
        const teamPlayers = teams[team].players;
        const teamPlayersSorted = naturalSorting(teamPlayers, 'reference');
        return teamPlayersSorted.map(player => {
            if (player.id !== 0) {
                return (
                    <MenuItem key={`${team}player${player.id}`} value={player.id}>
                        <span className="settings__reference">{player.reference}</span>
                        {player.name}
                    </MenuItem>
                );
            }
            return '';
        });
    };

    /**
     * This is to display a colour button that opens a colour picker
     * @param type      Must be TEAM_PARTS.jersey or TEAM_PARTS.reference
     * @param team      Must be TEAMS_LIST.HOME or TEAMS_LIST.AWAY
     * @returns {JSX.Element}
     */
    const displayColourFeature = (type, team) => (
        <Fragment>
            <Button
                onClick={() =>
                    setTeamColoursStatuses({
                        ...teamColoursStatuses,
                        [`${type}${team}`]: !teamColoursStatuses[`${type}${team}`]
                    })
                }
                variant="contained"
                size="small"
                className="settings__button settings__button--colour"
                style={{ backgroundColor: teams[team][type] }}
                title={messages[`${type}Colour`]}
            >
                {messages[`${type}Colour`]}
            </Button>
            {teamColoursStatuses[`${type}${team}`] ? (
                <div className="colour-picker__popover">
                    <div
                        className="colour-picker__cover"
                        onClick={() =>
                            setTeamColoursStatuses({
                                ...teamColoursStatuses,
                                [`${type}${team}`]: !teamColoursStatuses[`${type}${team}`]
                            })
                        }
                        onKeyDown={() =>
                            setTeamColoursStatuses({
                                ...teamColoursStatuses,
                                [`${type}${team}`]: !teamColoursStatuses[`${type}${team}`]
                            })
                        }
                        role="button"
                        tabIndex="0"
                    />
                    <Sketch
                        color={teams[team][type]}
                        onChangeComplete={colour => handleChangeColour(colour.hex, team, TEAM_PARTS[type])}
                        presetColors={presetColours}
                        disableAlpha
                    />
                </div>
            ) : (
                ''
            )}
        </Fragment>
    );

    /**
     * Displays the list of settings per team
     * @param team      Must be TEAMS_LIST.HOME or TEAMS_LIST.AWAY
     * @returns {JSX.Element}
     */
    const displaySettingsPerTeam = team => (
        <fieldset className="settings__section">
            <h3 className="title title--3">
                {messages[`team${team}`][1]}: <span className="title title--35">{teams[team].name}</span>
            </h3>
            <div className="settings__grid settings__grid--half">
                <TextField
                    id={`team${team}Name`}
                    label={messages[`team${team}`][1]}
                    value={teams[team].name}
                    onChange={e => handleChangeTeamName(e, team)}
                    required
                    margin="dense"
                    variant="outlined"
                />
                <div className="settings__grid settings__grid--half">
                    {displayColourFeature(TEAM_PARTS.jersey, team)}
                    {displayColourFeature(TEAM_PARTS.reference, team)}
                </div>
            </div>
            <h4 id={`listof-${MEMBERS_TYPES.players}-${team}`} className="title title--4">
                {messages.listOfPlayers}
                <span className="sr-only">
                    {messages.team} {team}
                </span>
                {displayMembersCount(team, MEMBERS_TYPES.players)}
            </h4>
            {displayMembersList(team, MEMBERS_TYPES.players)}
            <div className="settings__grid settings__grid--half">
                {addMemberButton(team, MEMBERS_TYPES.players)}
                {/* eslint-disable indent */}
                {teams[team][MEMBERS_TYPES.players].length > 1 ? (
                    <div>
                        <InputLabel shrink id={`captain${team}Label`}>
                            {messages.captain}
                        </InputLabel>
                        <Select
                            id={`captain${team}`}
                            labelId={`captain${team}Label`}
                            value={teams[team].captain || ''}
                            displayEmpty
                            onChange={e => handleChangeTeamCaptain(e, team)}
                            size="small"
                            margin="dense"
                            variant="outlined"
                            className="settings__select"
                        >
                            <MenuItem value="">{messages.selectCaptain}</MenuItem>
                            {captainList(team)}
                        </Select>
                    </div>
                ) : (
                    <></>
                )}
                {/* eslint-enable indent */}
            </div>
            <h4 id={`listof-${MEMBERS_TYPES.officials}-${team}`} className="title title--4">
                {messages.listOfOfficials}
                <span className="sr-only">
                    {messages.team} {team}
                </span>
                {displayMembersCount(team, MEMBERS_TYPES.officials)}
            </h4>
            {displayMembersList(team, MEMBERS_TYPES.officials)}
            <div className="settings__grid settings__grid--half">{addMemberButton(team, MEMBERS_TYPES.officials)}</div>
        </fieldset>
    );

    /**
     * If a team has no players or has only one player and it's id is 0 (unknown player),
     * an empty player is created to allow for an input line
     */
    useEffect(() => {
        if (popupVisibility) {
            onOpenSettings(settingsData);
        }
    }, [popupVisibility]);

    return (
        <Dialog
            open={popupVisibility}
            onClose={closeHandler}
            aria-labelledby="dialog-title-settings"
            fullWidth
            maxWidth="md"
        >
            <DialogTitle id="dialog-title-settings">{messages.header}</DialogTitle>
            <DialogContent>
                <form noValidate>
                    <fieldset className="settings__section">
                        <h3 className="title title--3">{messages.gameDetails}</h3>
                        <div className="settings__grid">
                            <TextField
                                id="competition"
                                label={messages.competitionName}
                                value={competition}
                                onChange={e => handleChangeSetting(e, CHANGE_COMPETITION)}
                                required
                                margin="dense"
                                variant="outlined"
                            />
                            <TextField
                                id="round"
                                label={messages.round}
                                value={round}
                                onChange={e => handleChangeSetting(e, CHANGE_ROUND)}
                                margin="dense"
                                variant="outlined"
                            />
                            <div className="settings__gender">
                                <InputLabel shrink id="genderLabel">
                                    {messages.gender}
                                </InputLabel>
                                <Select
                                    id="gender"
                                    labelId="genderLabel"
                                    value={gender}
                                    displayEmpty
                                    onChange={e => handleChangeSetting(e, CHANGE_GENDER)}
                                    required
                                    size="small"
                                    margin="dense"
                                    variant="outlined"
                                    className="settings__select"
                                >
                                    <MenuItem value="">{messages.selectGender}</MenuItem>
                                    {gendersList()}
                                </Select>
                            </div>
                        </div>
                        <div className="settings__grid">
                            <TextField
                                id="place"
                                label={messages.place}
                                value={place}
                                onChange={e => handleChangeSetting(e, CHANGE_PLACE)}
                                margin="dense"
                                variant="outlined"
                            />
                            <TextField
                                id="venue"
                                label={messages.venue}
                                value={venue}
                                onChange={e => handleChangeSetting(e, CHANGE_VENUE)}
                                margin="dense"
                                variant="outlined"
                            />
                            <TextField
                                id="date"
                                label={messages.date}
                                type="date"
                                value={date}
                                onChange={e => handleChangeSetting(e, CHANGE_DATE)}
                                margin="dense"
                                variant="outlined"
                            />
                            <TextField
                                id="time"
                                label={messages.time}
                                type="time"
                                value={time}
                                InputProps={{
                                    step: 300
                                }}
                                onChange={e => handleChangeSetting(e, CHANGE_TIME)}
                                margin="dense"
                                variant="outlined"
                            />
                        </div>
                        <div className="settings__grid">
                            <TextField
                                id="referee1"
                                label={messages.referee1}
                                value={referee1}
                                onChange={e => handleChangeSetting(e, CHANGE_REFEREE_1)}
                                margin="dense"
                                variant="outlined"
                            />
                            <TextField
                                id="referee2"
                                label={messages.referee2}
                                value={referee2}
                                onChange={e => handleChangeSetting(e, CHANGE_REFEREE_2)}
                                margin="dense"
                                variant="outlined"
                            />
                            <TextField
                                id="scoreKeeper"
                                label={messages.scoreKeeper}
                                value={scoreKeeper}
                                onChange={e => handleChangeSetting(e, CHANGE_SCORE_KEEPER)}
                                margin="dense"
                                variant="outlined"
                            />
                            <TextField
                                id="timeKeeper"
                                label={messages.timeKeeper}
                                value={timeKeeper}
                                onChange={e => handleChangeSetting(e, CHANGE_TIME_KEEPER)}
                                margin="dense"
                                variant="outlined"
                            />
                        </div>
                    </fieldset>
                    <div className="settings__grid settings__grid--half">
                        {displaySettingsPerTeam(TEAMS_LIST.HOME)}
                        {displaySettingsPerTeam(TEAMS_LIST.AWAY)}
                    </div>
                    {!gameStarted ? (
                        <p>
                            {messages.swapTeamLabel}{' '}
                            <Button onClick={e => handleSwapTeams(e, SWAP_TEAMS)} variant="contained">
                                {messages.swapTeams}
                            </Button>
                            <br />
                            <span className="text__note">{messages.swapTeamNote}</span>
                        </p>
                    ) : (
                        ''
                    )}
                </form>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={closeHandler}>
                    {messages.cancel}
                </Button>
                <Button variant="contained" color="primary" onClick={saveInitialisation}>
                    {messages.save}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

Settings.propTypes = {
    popupVisibility: PropTypes.bool,
    gameId: PropTypes.string,
    competition: PropTypes.string,
    round: PropTypes.string,
    gender: PropTypes.string,
    place: PropTypes.string,
    venue: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    referee1: PropTypes.string,
    referee2: PropTypes.string,
    scoreKeeper: PropTypes.string,
    timeKeeper: PropTypes.string,
    teams: PropTypes.object,
    onChangeSetting: PropTypes.func,
    onChangeTeamName: PropTypes.func,
    onChangeColour: PropTypes.func,
    onAddEmptyMember: PropTypes.func,
    onChangeMember: PropTypes.func,
    onRemoveMember: PropTypes.func,
    onChangeTeamCaptain: PropTypes.func,
    onSwapTeams: PropTypes.func,
    onSaveSettings: PropTypes.func,
    onOpenSettings: PropTypes.func,
    settingsData: PropTypes.object,
    gameStarted: PropTypes.bool,
    closeHandler: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
    gameId: makeSelectGameId(),
    competition: makeSelectCompetition(),
    round: makeSelectRound(),
    gender: makeSelectGender(),
    place: makeSelectPlace(),
    venue: makeSelectVenue(),
    date: makeSelectDate(),
    time: makeSelectTime(),
    referee1: makeSelectReferee1(),
    referee2: makeSelectReferee2(),
    scoreKeeper: makeSelectScoreKeeper(),
    timeKeeper: makeSelectTimeKeeper(),
    teams: makeSelectTeams()
});

export function mapDispatchToProps(dispatch) {
    return {
        onChangeSetting: data => dispatch(changeSetting(data)),
        onChangeTeamName: data => dispatch(changeTeamName(data)),
        onChangeColour: data => dispatch(changeColour(data)),
        onAddEmptyMember: data => dispatch(addEmptyMember(data)),
        onChangeMember: data => dispatch(changeMember(data)),
        onRemoveMember: data => dispatch(removeMember(data)),
        onChangeTeamCaptain: data => dispatch(changeTeamCaptain(data)),
        onSwapTeams: data => dispatch(swapTeams(data)),
        onSaveSettings: data => dispatch(saveSettings(data)),
        onOpenSettings: data => dispatch(initSettings(data))
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(
    withConnect,
    memo
)(Settings);
