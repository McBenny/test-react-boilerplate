/*
 * Settings screen
 *
 * This is a "pop-up" displaying settings on top of the main screen
 *
 */

import React, { Fragment, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from '../../utils/injectReducer';
import { changeTeamName, addEmptyMember, changeMember, initSettings } from './actions';
import { makeSelectTeams } from './selectors';
import reducer from './reducer';
import { messages } from './messages';
import { saveSettings } from '../Game/actions';
import { EMPTY_MEMBER, OFFICIALS_REFERENCES, MAX_NUMBER } from './constants';

const key = 'settings';

export function Settings({
    teams,
    onChangeTeamName,
    onAddEmptyMember,
    onChangeMember,
    onSaveSettings,
    onOpenSettings,
    setScreenVisibility,
    settingsData
}) {
    useInjectReducer({ key, reducer });

    const saveInitialisation = e => {
        e.preventDefault();
        const teamACleaned = teams.A.players.filter(member => member.reference !== 0);
        const teamBCleaned = teams.B.players.filter(member => member.reference !== 0);
        teams.A.players.splice(0, teams.A.players.length, ...teamACleaned);
        teams.B.players.splice(0, teams.B.players.length, ...teamBCleaned);
        onSaveSettings({
            ...settingsData,
            teams
        });
        setScreenVisibility(false);
    };

    // TODO: make this a common function
    const closePopIn = () => {
        setScreenVisibility(false);
    };

    const handleChangeTeamName = (e, team) => {
        onChangeTeamName({ team, teamName: e.target.value });
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
     * If a team has no players or has only one players and it's id is 0 (unknown players),
     * an empty players is created to allow for an input line
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
        <Fragment>
            <h2>{messages.header}</h2>
            <form action="" onSubmit={saveInitialisation}>
                <h3>{messages.teamA}</h3>
                <p>
                    <label htmlFor="teamAName">{messages.teamA}:</label>{' '}
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
                    <label htmlFor="teamBName">{messages.teamB}:</label>{' '}
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
                <button type="button" onClick={closePopIn}>
                    {messages.close}
                </button>{' '}
                <button type="submit">{messages.save}</button>
            </form>
        </Fragment>
    );
}

Settings.propTypes = {
    teams: PropTypes.object,
    onChangeTeamName: PropTypes.func,
    onAddEmptyMember: PropTypes.func,
    onChangeMember: PropTypes.func,
    onSaveSettings: PropTypes.func,
    onOpenSettings: PropTypes.func,
    setScreenVisibility: PropTypes.func,
    settingsData: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    teams: makeSelectTeams()
});

export function mapDispatchToProps(dispatch) {
    return {
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
