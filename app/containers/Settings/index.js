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
import { v4 as uuidv4 } from 'uuid';

import { useInjectReducer } from '../../utils/injectReducer';
import {
    addEmptyMember,
    changeCompetition,
    changeGender,
    changeMember,
    changeRound,
    changeTeamName,
    initSettings
} from './actions';
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
import { EMPTY_MEMBER, GENDERS, MAX_NUMBER, OFFICIALS_REFERENCES, UUID_PREFIX } from './constants';
import Modal, { cancelButton } from '../../components/modal';

const key = 'settings';

export function Settings({
    gameId,
    competition,
    round,
    gender,
    teams,
    onChangeCompetition,
    onChangeRound,
    onChangeGender,
    onChangeTeamName,
    onAddEmptyMember,
    onChangeMember,
    onSaveSettings,
    onOpenSettings,
    settingsData,
    closeHandler
}) {
    useInjectReducer({ key, reducer });
    const popup = 'settings';

    const handleChangeCompetition = e => {
        onChangeCompetition({ competition: e.target.value });
    };

    const handleChangeRound = e => {
        onChangeRound({ round: e.target.value });
    };

    const handleChangeGender = e => {
        onChangeGender({ gender: e.target.value });
    };

    const handleChangeTeamName = (e, team) => {
        onChangeTeamName({ team, teamName: e.target.value });
    };

    const saveInitialisation = e => {
        e.preventDefault();
        const teamACleaned = teams.A.players.filter(member => member.reference !== 0);
        const teamBCleaned = teams.B.players.filter(member => member.reference !== 0);
        teams.A.players.splice(0, teams.A.players.length, ...teamACleaned);
        teams.B.players.splice(0, teams.B.players.length, ...teamBCleaned);
        onSaveSettings({
            ...settingsData,
            gameId: gameId === '' ? `${UUID_PREFIX}${uuidv4()}` : gameId,
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
                    reference: type === 'players' ? 0 : OFFICIALS_REFERENCES[id - 1]
                })
            }
            title={messages[type === 'player' ? 'addPlayer' : 'addOfficial']}
        >
            +
        </button>
    );

    const memberLineTemplate = (team, member, type, index, membersLength) => {
        let label;
        let pattern;
        let patternTitle;
        if (type === 'players') {
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
                    disabled={type === 'officials'}
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
                {index < MAX_NUMBER[type] - 1 && index === membersLength - 1 && addMemberButton(team, type, index + 2)}
            </li>
        );
    };

    const playersList = team => {
        if (teams[team].players.length > 0) {
            const membersNotUnknown = teams[team].players.filter(member => member.id !== 0);
            const membersLength = membersNotUnknown.length;
            const buffer = membersNotUnknown.map((member, index) => {
                if (member.id !== 0) {
                    return memberLineTemplate(team, member, 'players', index, membersLength);
                }
                return '';
            });
            return <ul>{buffer}</ul>;
        }
        return null;
    };

    const officialsList = team => {
        if (teams[team].officials.length > 0) {
            const membersNotUnknown = teams[team].officials.filter(member => member.id !== 0);
            const membersLength = membersNotUnknown.length;
            const buffer = membersNotUnknown.map((member, index) => {
                if (member.id !== 0) {
                    return memberLineTemplate(team, member, 'officials', index, membersLength);
                }
                return '';
            });
            return <ul>{buffer}</ul>;
        }
        return null;
    };

    /**
     * If a team has no players or has only one player and it's id is 0 (unknown player),
     * an empty player is created to allow for an input line
     */
    useEffect(() => {
        onOpenSettings(settingsData);
        ['A', 'B'].map(team => {
            if (
                teams[team].players.length === 0 ||
                (teams[team].players.length === 1 && teams[team].players[0].id === 0)
            ) {
                onAddEmptyMember({ ...EMPTY_MEMBER.players, id: 1, team, memberType: 'players' });
            }
            if (
                teams[team].officials.length === 0 ||
                (teams[team].officials.length === 1 && teams[team].officials[0].id === 0)
            ) {
                onAddEmptyMember({ ...EMPTY_MEMBER.officials, id: 1, team, memberType: 'officials' });
            }
            return true;
        });
    }, []);

    return (
        <Modal title={messages.header} closeHandler={closeHandler} popup={popup}>
            <form action="" onSubmit={saveInitialisation}>
                <h3>{messages.competition}</h3>
                <p>
                    <label htmlFor="competition">{messages.competitionName}*:</label>{' '}
                    <input
                        type="text"
                        id="competition"
                        onChange={e => handleChangeCompetition(e)}
                        value={competition}
                        required
                    />
                </p>
                <p>
                    <label htmlFor="round">{messages.round}:</label>{' '}
                    <input type="text" id="round" onChange={e => handleChangeRound(e)} value={round} />
                </p>
                <p>
                    <label htmlFor="gender">{messages.gender}*:</label>{' '}
                    <select id="gender" onChange={e => handleChangeGender(e)} value={gender} required>
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
                {playersList('A')}
                <h4>{messages.listOfOfficials}</h4>
                {officialsList('A')}
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
                {playersList('B')}
                <h4>{messages.listOfOfficials}</h4>
                {officialsList('B')}
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
    onChangeCompetition: PropTypes.func,
    onChangeRound: PropTypes.func,
    onChangeGender: PropTypes.func,
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
        onChangeCompetition: data => dispatch(changeCompetition(data)),
        onChangeRound: data => dispatch(changeRound(data)),
        onChangeGender: data => dispatch(changeGender(data)),
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
