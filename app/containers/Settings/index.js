/*
 * Settings screen
 *
 * This is a "pop-up" displaying settings on top of the main screen
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import Sketch from 'react-color/lib/Sketch';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';

import { useInjectReducer } from '../../utils/injectReducer';
import { compareValues, generateId } from '../../utils/utilities';

import {
    addEmptyMember,
    changeSetting,
    changeTeamName,
    changeColour,
    changeMember,
    changeTeamCaptain,
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
import { saveSettings } from '../Game/actions';
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
    PERSONS_TYPES,
    TEAM_PARTS
} from './constants';

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
    onSaveSettings,
    onOpenSettings,
    settingsData,
    closeHandler
}) {
    useInjectReducer({ key, reducer });
    const handleChangeSetting = (e, setting) => {
        onChangeSetting({ type: setting, data: e.target.value });
    };

    const handleChangeTeamName = (e, team) => {
        onChangeTeamName({ team, teamName: e.target.value });
    };

    const [teamAJerseyStatus, setTeamAJerseyStatus] = useState(false);
    const [teamANumberStatus, setTeamANumberStatus] = useState(false);
    const [teamBJerseyStatus, setTeamBJerseyStatus] = useState(false);
    const [teamBNumberStatus, setTeamBNumberStatus] = useState(false);
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
                    reference: type === PERSONS_TYPES.players ? 0 : OFFICIALS_REFERENCES[id - 1]
                })
            }
            title={messages[type === PERSONS_TYPES.players ? 'addPlayer' : 'addOfficial']}
        >
            <PersonAddOutlinedIcon />
        </IconButton>
    );

    const memberLineTemplate = (team, member, type) => {
        let labelName;
        let labelNumber;
        let pattern;
        let patternTitle;
        if (type === PERSONS_TYPES.players) {
            labelNumber = 'playerNumber';
            labelName = 'playerName';
            pattern = '[0-9][0-9]*';
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
                            name: member.name
                        })
                    }
                    pattern={pattern}
                    title={messages[patternTitle]}
                    required
                    disabled={type === PERSONS_TYPES.officials}
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
                            name: e.target.value
                        })
                    }
                />
            </ListItem>
        );
    };

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
     *
     * @param team          a letter (A or B) representing the team you want to consider
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

    const captainList = team => {
        const teamPlayers = teams[team].players;
        const teamPlayersSorted = teamPlayers.sort(compareValues('reference'));
        return teamPlayersSorted.map(player => (
            <MenuItem key={`${team}player${player.id}`} value={player.id}>
                {`${player.reference} ${player.name}`}
            </MenuItem>
        ));
    };

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
                    <h3>{messages.teamA}</h3>
                    <TextField
                        id="teamAName"
                        label={messages.teamA}
                        value={teams.A.name}
                        onChange={e => handleChangeTeamName(e, 'A')}
                        required
                    />
                    <Button
                        onClick={() => setTeamAJerseyStatus(!teamAJerseyStatus)}
                        variant="contained"
                        style={{ backgroundColor: teams.A.jersey }}
                        title={messages.jerseyColour}
                    >
                        {messages.jerseyColour}
                    </Button>
                    {teamAJerseyStatus ? (
                        <div className="colour-picker__popover">
                            <div
                                className="colour-picker__cover"
                                onClick={() => setTeamAJerseyStatus(!teamAJerseyStatus)}
                                onKeyDown={() => setTeamAJerseyStatus(!teamAJerseyStatus)}
                                role="button"
                                tabIndex="0"
                            />
                            <Sketch
                                color={teams.A.jersey}
                                onChangeComplete={colour => handleChangeColour(colour.hex, 'A', TEAM_PARTS.jersey)}
                                presetColors={presetColours}
                                disableAlpha
                            />
                        </div>
                    ) : (
                        ''
                    )}
                    <Button
                        onClick={() => setTeamANumberStatus(!teamANumberStatus)}
                        variant="contained"
                        style={{ backgroundColor: teams.A.reference }}
                        title={messages.numberColour}
                    >
                        {messages.numberColour}
                    </Button>
                    {teamANumberStatus ? (
                        <div className="colour-picker__popover">
                            <div
                                className="colour-picker__cover"
                                onClick={() => setTeamANumberStatus(!teamANumberStatus)}
                                onKeyDown={() => setTeamANumberStatus(!teamANumberStatus)}
                                role="button"
                                tabIndex="0"
                            />
                            <Sketch
                                color={teams.A.reference}
                                onChangeComplete={colour => handleChangeColour(colour.hex, 'A', TEAM_PARTS.reference)}
                                presetColors={presetColours}
                                disableAlpha
                            />
                        </div>
                    ) : (
                        ''
                    )}
                    <h4 id={`listof-${PERSONS_TYPES.players}-A`}>
                        {messages.listOfPlayers}
                        {displayMembersCount('A', PERSONS_TYPES.players)}
                    </h4>
                    {displayMembersList('A', PERSONS_TYPES.players)}
                    <InputLabel shrink id="captainALabel">
                        {messages.captain}
                    </InputLabel>
                    <Select
                        id="captainA"
                        labelId="captainALabel"
                        value={teams.A.captain || ''}
                        displayEmpty
                        onChange={e => handleChangeTeamCaptain(e, 'A')}
                    >
                        <MenuItem value="">{messages.selectCaptain}</MenuItem>
                        {captainList('A')}
                    </Select>
                    <h4 id={`listof-${PERSONS_TYPES.officials}-A`}>
                        {messages.listOfOfficials}
                        {displayMembersCount('A', PERSONS_TYPES.officials)}
                    </h4>
                    {displayMembersList('A', PERSONS_TYPES.officials)}
                    <h3>{messages.teamB}</h3>
                    <TextField
                        id="teamBName"
                        label={messages.teamB}
                        value={teams.B.name}
                        onChange={e => handleChangeTeamName(e, 'B')}
                        required
                    />
                    <Button
                        onClick={() => setTeamBJerseyStatus(!teamBJerseyStatus)}
                        variant="contained"
                        style={{ backgroundColor: teams.B.jersey }}
                        title={messages.jerseyColour}
                    >
                        {messages.jerseyColour}
                    </Button>
                    {teamBJerseyStatus ? (
                        <div className="colour-picker__popover">
                            <div
                                className="colour-picker__cover"
                                onClick={() => setTeamBJerseyStatus(!teamBJerseyStatus)}
                                onKeyDown={() => setTeamBJerseyStatus(!teamBJerseyStatus)}
                                role="button"
                                tabIndex="0"
                            />
                            <Sketch
                                color={teams.B.jersey}
                                onChangeComplete={colour => handleChangeColour(colour.hex, 'B', TEAM_PARTS.jersey)}
                                presetColors={presetColours}
                                disableAlpha
                            />
                        </div>
                    ) : (
                        ''
                    )}
                    <Button
                        onClick={() => setTeamBNumberStatus(!teamBNumberStatus)}
                        variant="contained"
                        style={{ backgroundColor: teams.B.reference }}
                        title={messages.numberColour}
                    >
                        {messages.numberColour}
                    </Button>
                    {teamBNumberStatus ? (
                        <div className="colour-picker__popover">
                            <div
                                className="colour-picker__cover"
                                onClick={() => setTeamBNumberStatus(!teamBNumberStatus)}
                                onKeyDown={() => setTeamBNumberStatus(!teamBNumberStatus)}
                                role="button"
                                tabIndex="0"
                            />
                            <Sketch
                                color={teams.B.reference}
                                onChangeComplete={colour => handleChangeColour(colour.hex, 'B', TEAM_PARTS.reference)}
                                presetColors={presetColours}
                                disableAlpha
                            />
                        </div>
                    ) : (
                        ''
                    )}
                    <h4 id={`listof-${PERSONS_TYPES.players}-B`}>
                        {messages.listOfPlayers}
                        {displayMembersCount('B', PERSONS_TYPES.players)}
                    </h4>
                    {displayMembersList('B', PERSONS_TYPES.players)}
                    <InputLabel shrink id="captainBLabel">
                        {messages.captain}
                    </InputLabel>
                    <Select
                        id="captainB"
                        labelId="captainBLabel"
                        value={teams.B.captain || ''}
                        displayEmpty
                        onChange={e => handleChangeTeamCaptain(e, 'B')}
                    >
                        <MenuItem value="">{messages.selectCaptain}</MenuItem>
                        {captainList('B')}
                    </Select>
                    <h4 id={`listof-${PERSONS_TYPES.officials}-B`}>
                        {messages.listOfOfficials}
                        {displayMembersCount('B', PERSONS_TYPES.officials)}
                    </h4>
                    {displayMembersList('B', PERSONS_TYPES.officials)}
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
    onSaveSettings: PropTypes.func,
    onOpenSettings: PropTypes.func,
    settingsData: PropTypes.object,
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
