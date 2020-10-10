/*
 * Settings screen
 *
 * This is a "pop-up" displaying settings on top of the main screen
 *
 */

import React, { Fragment, memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    List,
    ListItem,
    MenuItem,
    InputLabel,
    TextField,
    Select,
    FormControlLabel,
    Checkbox,
    Button,
    IconButton
} from '@material-ui/core';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Sketch from 'react-color/lib/Sketch';

import {
    CHANGE_COMPETITION,
    CHANGE_GENDER,
    CHANGE_ROUND,
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
import { compareValues, generateId } from '../../utils/utilities';

import { saveSettings } from '../Game/actions';
import {
    addEmptyMember,
    changeSetting,
    changeTeamName,
    changeColour,
    changeMember,
    changeTeamCaptain,
    swapTeams,
    initSettings
} from './actions';
import {
    makeSelectCompetition,
    makeSelectGameId,
    makeSelectGender,
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
        const teamAPlayersCleaned = teams.A.players.filter(member => member.reference !== 0 || member.id === 0);
        const teamAOfficialsCleaned = teams.A.officials.filter(member => member.name !== '');
        teams.A.players.splice(0, teams.A.players.length, ...teamAPlayersCleaned);
        teams.A.officials.splice(0, teams.A.officials.length, ...teamAOfficialsCleaned);

        const teamBPlayersCleaned = teams.B.players.filter(member => member.reference !== 0 || member.id === 0);
        const teamBOfficialsCleaned = teams.B.officials.filter(member => member.name !== '');
        teams.B.players.splice(0, teams.B.players.length, ...teamBPlayersCleaned);
        teams.B.officials.splice(0, teams.B.officials.length, ...teamBOfficialsCleaned);

        const newGameId = generateId();
        onSaveSettings({
            ...settingsData,
            gameId: gameId === '' ? newGameId : gameId,
            competition,
            round,
            gender,
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

    const addMemberButton = (team, type, id) => (
        <IconButton
            aria-label={messages.addPlayer}
            onClick={() =>
                onAddEmptyMember({
                    ...EMPTY_MEMBER[type],
                    id,
                    team,
                    memberType: type,
                    reference: type === MEMBERS_TYPES.players ? 0 : OFFICIALS_REFERENCES[id - 1]
                })
            }
            title={messages[type === MEMBERS_TYPES.players ? 'addPlayer' : 'addOfficial']}
        >
            <PersonAddOutlinedIcon />
        </IconButton>
    );

    /**
     * Displays 2 input fields to add/read a member's data
     * @param team    Must be TEAMS_LIST.HOME or TEAMS_LIST.AWAY
     * @param type    the constant of the type of members to list
     * @param member  the actual member
     * @returns {JSX.Element}
     */
    const memberLineTemplate = (team, member, type) => {
        let labelName;
        let labelNumber;
        let labelQualification;
        let pattern;
        let patternTitle;
        if (type === MEMBERS_TYPES.players) {
            labelNumber = 'playerNumber';
            labelName = 'playerName';
            labelQualification = 'playerQualification';
            pattern = '[0-9][0-9]*|[a-zA-Z]{1,3}';
            patternTitle = 'numberPattern';
        } else {
            labelNumber = 'officialReference';
            labelName = 'officialName';
            pattern = '[A-D]';
            patternTitle = 'referencePattern';
        }
        return (
            <ListItem key={`${type}${team}${member.id}`}>
                <TextField
                    id={`${type}Reference${team}${member.id}`}
                    label={messages[labelNumber]}
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
                        maxLength: 3
                    }}
                    title={messages[patternTitle]}
                    required
                    disabled={type === MEMBERS_TYPES.officials}
                    className="settings__text-input settings__text-input--reference"
                />
                <TextField
                    id={`${type}Name${team}${member.id}`}
                    label={messages[labelName]}
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
                />
                {type === MEMBERS_TYPES.players ? (
                    <FormControlLabel
                        control={
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
                                color="primary"
                                value={MEMBERS_QUALIFICATIONS.players.goalie}
                                title={messages[`${labelQualification}HelpText`]}
                            />
                        }
                        label={messages[labelQualification]}
                    />
                ) : (
                    ''
                )}
            </ListItem>
        );
    };

    /**
     * Displays the formatted members list with/without an "add" button
     * @param team          Must be TEAMS_LIST.HOME or TEAMS_LIST.AWAY
     * @param memberType    the constant of the type of members to list
     * @returns {JSX.Element}
     */
    const displayMembersList = (team, memberType) => {
        const membersList = teams[team][memberType];
        const membersLength = membersList.length;
        let buffer;
        let maxId = 0;
        if (membersLength > 0) {
            maxId = membersList.reduce((max, member) => (member.id > max ? member.id : max), membersList[0].id);
            buffer = membersList.map(member => {
                // Clear out the "unidentified" player
                if (member.id !== 0) {
                    return memberLineTemplate(team, member, memberType);
                }
                return '';
            });
        }
        return (
            <React.Fragment>
                {buffer !== '' ? (
                    <List component="nav" aria-labelledby={`listof-${memberType}-${team}`}>
                        {buffer}
                    </List>
                ) : (
                    ''
                )}
                {membersLength < MAX_NUMBER[memberType] && addMemberButton(team, memberType, maxId + 1)}
            </React.Fragment>
        );
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
        const cleanMembersList = membersList.filter(member => member.reference !== 0);
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
        const teamPlayersSorted = teamPlayers.sort(compareValues('reference', true, true));
        return teamPlayersSorted.map(player => (
            <MenuItem key={`${team}player${player.id}`} value={player.id}>
                <span className="settings__reference">{player.reference}</span>
                {player.name}
            </MenuItem>
        ));
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
        <fieldset>
            <h3>{messages[`team${team}`]}</h3>
            <TextField
                id={`team${team}Name`}
                label={messages[`team${team}`]}
                value={teams[team].name}
                onChange={e => handleChangeTeamName(e, team)}
                required
            />
            {displayColourFeature(TEAM_PARTS.jersey, team)}
            {displayColourFeature(TEAM_PARTS.reference, team)}
            <h4 id={`listof-${MEMBERS_TYPES.players}-${team}`}>
                {messages.listOfPlayers}
                {displayMembersCount(team, MEMBERS_TYPES.players)}
            </h4>
            {displayMembersList(team, MEMBERS_TYPES.players)}
            <InputLabel shrink id={`captain${team}Label`}>
                {messages.captain}
            </InputLabel>
            <Select
                id={`captain${team}`}
                labelId={`captain${team}Label`}
                value={teams[team].captain || ''}
                displayEmpty
                onChange={e => handleChangeTeamCaptain(e, team)}
            >
                <MenuItem value="">{messages.selectCaptain}</MenuItem>
                {captainList(team)}
            </Select>
            <h4 id={`listof-${MEMBERS_TYPES.officials}-${team}`}>
                {messages.listOfOfficials}
                {displayMembersCount(team, MEMBERS_TYPES.officials)}
            </h4>
            {displayMembersList(team, MEMBERS_TYPES.officials)}
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
        <Dialog open={popupVisibility} onClose={closeHandler} aria-labelledby="dialog-title-settings">
            <DialogTitle id="dialog-title-settings">{messages.header}</DialogTitle>
            <DialogContent>
                <form noValidate>
                    <fieldset>
                        <h3>{messages.competition}</h3>
                        <div>
                            <TextField
                                id="competition"
                                label={messages.competitionName}
                                value={competition}
                                onChange={e => handleChangeSetting(e, CHANGE_COMPETITION)}
                                required
                            />
                            <TextField
                                id="round"
                                label={messages.round}
                                value={round}
                                onChange={e => handleChangeSetting(e, CHANGE_ROUND)}
                            />
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
                            >
                                <MenuItem value="">{messages.selectGender}</MenuItem>
                                {gendersList()}
                            </Select>
                        </div>
                        <TextField
                            id="referee1"
                            label={messages.referee1}
                            value={referee1}
                            onChange={e => handleChangeSetting(e, CHANGE_REFEREE_1)}
                        />
                        <TextField
                            id="referee2"
                            label={messages.referee2}
                            value={referee2}
                            onChange={e => handleChangeSetting(e, CHANGE_REFEREE_2)}
                        />
                        <TextField
                            id="scoreKeeper"
                            label={messages.scoreKeeper}
                            value={scoreKeeper}
                            onChange={e => handleChangeSetting(e, CHANGE_SCORE_KEEPER)}
                        />
                        <TextField
                            id="timeKeeper"
                            label={messages.timeKeeper}
                            value={timeKeeper}
                            onChange={e => handleChangeSetting(e, CHANGE_TIME_KEEPER)}
                        />
                    </fieldset>
                    {displaySettingsPerTeam(TEAMS_LIST.HOME)}
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
                    {displaySettingsPerTeam(TEAMS_LIST.AWAY)}
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
