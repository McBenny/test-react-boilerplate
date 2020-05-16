/*
 * Settings screen
 *
 * This is a "pop-up" displaying settings on top of the main screen
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from '../../utils/injectReducer';
import { generateId } from '../../utils/utilities';

import { addEmptyMember, changeSetting, changeTeamName, changeMember, initSettings } from './actions';
import {
    makeSelectCompetition,
    makeSelectGameId,
    makeSelectGender,
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
    EMPTY_MEMBER,
    GENDERS,
    MAX_NUMBER,
    OFFICIALS_REFERENCES,
    PERSONS_TYPES
} from './constants';
import Modal, { cancelButton } from '../../components/modal';
import { POPUPS } from '../Game/constants';

const key = 'settings';

export function Settings({
    gameId,
    competition,
    round,
    gender,
    teams,
    onChangeSetting,
    onChangeTeamName,
    onAddEmptyMember,
    onChangeMember,
    onSaveSettings,
    onOpenSettings,
    settingsData,
    closeHandler
}) {
    useInjectReducer({ key, reducer });
    const popup = POPUPS.settings;

    const handleChangeSetting = (e, setting) => {
        onChangeSetting({ type: setting, data: e.target.value });
    };

    const handleChangeTeamName = (e, team) => {
        onChangeTeamName({ team, teamName: e.target.value });
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
            teams
        });
        closeHandler(popup);
    };

    const gendersList = () => {
        const gendersKeys = Object.keys(GENDERS);
        return gendersKeys.map(genderKey => (
            <option key={`genders${genderKey}`} value={genderKey}>
                {GENDERS[genderKey]}
            </option>
        ));
    };

    const addMemberButton = (team, type, id) => (
        <button
            type="button"
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
            +
        </button>
    );

    const memberLineTemplate = (team, member, type) => {
        let label;
        let pattern;
        let patternTitle;
        if (type === PERSONS_TYPES.players) {
            label = 'playerNumberAndName';
            pattern = '[0-9][0-9]*';
            patternTitle = 'numberPattern';
        } else {
            label = 'officialReferenceAndName';
            pattern = '[A-D]';
            patternTitle = 'referencePattern';
        }
        return (
            <li key={`${type}${team}${member.id}`}>
                <label htmlFor={`${type}Reference${team}${member.id}`}>{messages[label]}:</label>
                <input
                    type="text"
                    id={`${type}Reference${team}${member.id}`}
                    onChange={e =>
                        onChangeMember({
                            team,
                            memberType: type,
                            id: member.id,
                            reference: e.target.value,
                            name: member.name
                        })
                    }
                    value={member.reference}
                    pattern={pattern}
                    title={messages[patternTitle]}
                    required
                    disabled={type === PERSONS_TYPES.officials}
                />{' '}
                <input
                    type="text"
                    id={`${type}Name${team}${member.id}`}
                    onChange={e =>
                        onChangeMember({
                            team,
                            memberType: type,
                            id: member.id,
                            reference: member.reference,
                            name: e.target.value
                        })
                    }
                    value={member.name}
                />{' '}
            </li>
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
                if (member.id !== 0) {
                    return memberLineTemplate(team, member, memberType);
                }
                return '';
            });
        }
        return (
            <React.Fragment>
                {buffer !== '' ? <ul>{buffer}</ul> : ''}
                {membersLength < MAX_NUMBER[memberType] && addMemberButton(team, memberType, maxId + 1)}
            </React.Fragment>
        );
    };

    /**
     * If a team has no players or has only one player and it's id is 0 (unknown player),
     * an empty player is created to allow for an input line
     */
    useEffect(() => {
        onOpenSettings(settingsData);
    }, ['']);

    return (
        <Modal title={messages.header} closeHandler={closeHandler} popup={popup}>
            <form action="" onSubmit={saveInitialisation}>
                <h3>{messages.competition}</h3>
                <p>
                    <label htmlFor="competition">{messages.competitionName}*:</label>{' '}
                    <input
                        type="text"
                        id="competition"
                        onChange={e => handleChangeSetting(e, CHANGE_COMPETITION)}
                        value={competition}
                        required
                    />
                </p>
                <p>
                    <label htmlFor="round">{messages.round}:</label>{' '}
                    <input type="text" id="round" onChange={e => handleChangeSetting(e, CHANGE_ROUND)} value={round} />
                </p>
                <p>
                    <label htmlFor="gender">{messages.gender}*:</label>{' '}
                    <select id="gender" onChange={e => handleChangeSetting(e, CHANGE_GENDER)} value={gender} required>
                        <option value="">{messages.selectGender}</option>
                        {gendersList()}
                    </select>
                </p>
                <h3>{messages.teamA}</h3>
                <p>
                    <label htmlFor="teamAName">{messages.teamA}*:</label>{' '}
                    <input
                        type="text"
                        id="teamAName"
                        onChange={e => handleChangeTeamName(e, 'A')}
                        value={teams.A.name}
                        required
                    />
                </p>
                <h4>{messages.listOfPlayers}</h4>
                {displayMembersList('A', PERSONS_TYPES.players)}
                <h4>{messages.listOfOfficials}</h4>
                {displayMembersList('A', PERSONS_TYPES.officials)}
                <h3>{messages.teamB}</h3>
                <p>
                    <label htmlFor="teamBName">{messages.teamB}*:</label>{' '}
                    <input
                        type="text"
                        id="teamBName"
                        onChange={e => handleChangeTeamName(e, 'B')}
                        value={teams.B.name}
                        required
                    />
                </p>
                <h4>{messages.listOfPlayers}</h4>
                {displayMembersList('B', PERSONS_TYPES.players)}
                <h4>{messages.listOfOfficials}</h4>
                {displayMembersList('B', PERSONS_TYPES.officials)}
                <button type="submit">{messages.save}</button>
                {cancelButton(closeHandler, popup)}
            </form>
        </Modal>
    );
}

Settings.propTypes = {
    gameId: PropTypes.string,
    competition: PropTypes.string,
    round: PropTypes.string,
    gender: PropTypes.string,
    teams: PropTypes.object,
    onChangeSetting: PropTypes.func,
    onChangeTeamName: PropTypes.func,
    onAddEmptyMember: PropTypes.func,
    onChangeMember: PropTypes.func,
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
    teams: makeSelectTeams()
});

export function mapDispatchToProps(dispatch) {
    return {
        onChangeSetting: data => dispatch(changeSetting(data)),
        onChangeTeamName: data => dispatch(changeTeamName(data)),
        onAddEmptyMember: data => dispatch(addEmptyMember(data)),
        onChangeMember: data => dispatch(changeMember(data)),
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
