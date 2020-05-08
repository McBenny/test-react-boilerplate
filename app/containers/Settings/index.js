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

import { useInjectReducer } from 'utils/injectReducer';
import { changeTeamName, changePlayer, cancelChangeSettings, addEmptyPlayer } from './actions';
import { makeSelectTeams } from './selectors';
import reducer from './reducer';
import { messages } from './messages';
import { saveSettings } from '../Game/actions';
import { EMPTY_PLAYER, MAX_NUMBER } from './constants';

const key = 'settings';

export function Settings({
    teams,
    onAddEmptyPlayer,
    onChangeTeamName,
    onChangePlayer,
    onSaveSettings,
    onCloseSettings,
    setScreenVisibility,
    settingsData
}) {
    useInjectReducer({ key, reducer });

    const saveInitialisation = e => {
        e.preventDefault();
        const teamACleaned = teams.A.players.filter(player => player.playerNumber !== 0);
        const teamBCleaned = teams.B.players.filter(player => player.playerNumber !== 0);
        teams.A.players.splice(0, teams.A.players.length, ...teamACleaned);
        teams.B.players.splice(0, teams.B.players.length, ...teamBCleaned);
        onSaveSettings({
            teams
        });
        setScreenVisibility(false);
    };

    // TODO: make this a common function
    const closePopIn = () => {
        onCloseSettings(settingsData);
        setScreenVisibility(false);
    };

    const handleChangeTeamName = (e, team) => {
        onChangeTeamName({ team, teamName: e.target.value });
    };

    const addPlayerButton = (team, id) => (
        <button type="button" onClick={() => onAddEmptyPlayer({ ...EMPTY_PLAYER, id, team })}>
            +
        </button>
    );

    const playersList = team => {
        if (teams[team].players.length > 0) {
            const playersNotUnknown = teams[team].players.filter(player => player.id !== 0);
            const playersLength = playersNotUnknown.length;
            const buffer = playersNotUnknown.map((player, index) => {
                if (player.id !== 0) {
                    return (
                        <li key={`player${player.id}`}>
                            <label htmlFor={`playerNumber${player.id}`}>{messages.playerNumberAndName}:</label>
                            <input
                                type="text"
                                id={`playerNumber${player.id}`}
                                onChange={e =>
                                    onChangePlayer({
                                        team,
                                        id: player.id,
                                        playerNumber: e.target.value,
                                        playerName: player.playerName
                                    })
                                }
                                value={player.playerNumber}
                                pattern="[0-9][0-9]*"
                                title={messages.numberPattern}
                                required
                            />{' '}
                            <input
                                type="text"
                                id={`playerName${player.id}`}
                                onChange={e =>
                                    onChangePlayer({
                                        team,
                                        id: player.id,
                                        playerNumber: player.playerNumber,
                                        playerName: e.target.value
                                    })
                                }
                                value={player.playerName}
                            />{' '}
                            {index < MAX_NUMBER.players - 1 &&
                                index === playersLength - 1 &&
                                addPlayerButton(team, index + 2)}
                        </li>
                    );
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
        ['A', 'B'].map(team => {
            if (
                teams[team].players.length === 0 ||
                (teams[team].players.length === 1 && teams[team].players[0].id === 0)
            ) {
                onAddEmptyPlayer({ ...EMPTY_PLAYER, id: 1, team });
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
                {playersList('A')}
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
                {playersList('B')}
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
    onAddEmptyPlayer: PropTypes.func,
    onChangePlayer: PropTypes.func,
    onSaveSettings: PropTypes.func,
    onCloseSettings: PropTypes.func,
    setScreenVisibility: PropTypes.func,
    settingsData: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    teams: makeSelectTeams()
});

export function mapDispatchToProps(dispatch) {
    return {
        onChangeTeamName: data => dispatch(changeTeamName(data)),
        onAddEmptyPlayer: data => dispatch(addEmptyPlayer(data)),
        onChangePlayer: data => dispatch(changePlayer(data)),
        onSaveSettings: data => dispatch(saveSettings(data)),
        onCloseSettings: data => dispatch(cancelChangeSettings(data))
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
