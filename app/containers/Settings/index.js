/*
 * Settings screen
 *
 * This is a "pop-up" displaying settings on top of the main screen
 *
 */

import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';
import nextId from 'react-id-generator';

import { useInjectReducer } from 'utils/injectReducer';
import { changeTeamAName, changeTeamBName, changePlayer, cancelChangeSettings } from './actions';
import { makeSelectPlayer, makeSelectTeamAName, makeSelectTeamBName } from './selectors';
import reducer from './reducer';
import { saveSettings } from '../Game/actions';

const key = 'settings';

export function Settings({
    teamAName,
    teamBName,
    players,
    onChangeTeamAName,
    onChangeTeamBName,
    onChangePlayer,
    onSaveSettings,
    onCloseSettings,
    setScreenVisibility,
    settingsData
}) {
    useInjectReducer({ key, reducer });

    const messages = {
        header: 'Settings',
        close: 'Close settings',
        save: 'Save settings',
        teamA: 'Home team',
        teamB: 'Visitor team',
        addPlayer: 'Add a player',
        playerNumberAndName: 'Player number and name'
    };

    const saveInitialisation = e => {
        e.preventDefault();
        onSaveSettings({
            teamAName,
            teamBName,
            players
        });
        setScreenVisibility(false);
    };

    // TODO: make this a common function
    const closePopIn = () => {
        onCloseSettings(settingsData);
        setScreenVisibility(false);
    };

    const UPDATE_NUMBER = 'UPDATE_NUMBER';
    const UPDATE_NAME = 'UPDATE_NAME';

    const changePlayerPrep = (e, data) => {
        onChangePlayer({
            ...data,
            playerNumber: data.update === UPDATE_NUMBER ? e.target.value : data.playerNumber,
            playerName: data.update === UPDATE_NAME ? e.target.value : data.playerName
        });
    };

    const playersList = team => {
        const numberOfPlayers = 16;
        const buffer = [];
        for (let i = 1; i <= numberOfPlayers; i += 1) {
            const playerRef = players[`team${team}`][`player${i}`];
            if (playerRef) {
                const htmlId = nextId();
                const playerData = {
                    team,
                    playerIndex: i,
                    playerNumber: playerRef.playerNumber,
                    playerName: playerRef.playerName
                };
                buffer.push(
                    <li key={htmlId}>
                        <label htmlFor={`playerNumber${htmlId}`}>{messages.playerNumberAndName}:</label>{' '}
                        <input
                            type="text"
                            id={`playerNumber${htmlId}`}
                            onChange={e =>
                                changePlayerPrep(e, {
                                    team,
                                    playerIndex: i,
                                    update: UPDATE_NUMBER,
                                    playerName: playerData.playerName
                                })
                            }
                            value={playerRef.playerNumber}
                            required
                        />{' '}
                        <input
                            type="text"
                            id={`playerName${htmlId}`}
                            onChange={e =>
                                onChangePlayer({
                                    team,
                                    playerIndex: i,
                                    playerName: e.target.value
                                })
                            }
                            value={playerRef.playerName}
                        />{' '}
                        <button type="button">+</button>
                    </li>
                );
            }
        }
        return <ul>{buffer}</ul>;
    };
    return (
        <Fragment>
            <h2>{messages.header}</h2>
            <form action="" onSubmit={saveInitialisation}>
                <p>
                    <label htmlFor="teamAName">{messages.teamA}:</label>{' '}
                    <input type="text" id="teamAName" onChange={onChangeTeamAName} value={teamAName} required />
                </p>
                <p>
                    <label htmlFor="teamBName">{messages.teamB}:</label>{' '}
                    <input type="text" id="teamBName" onChange={onChangeTeamBName} value={teamBName} required />
                </p>
                <h3>{messages.addPlayer}</h3>
                {playersList('A')}
                <button type="button" onClick={closePopIn}>
                    {messages.close}
                </button>{' '}
                <button type="submit">{messages.save}</button>
            </form>
        </Fragment>
    );
}

Settings.propTypes = {
    teamAName: PropTypes.string,
    teamBName: PropTypes.string,
    players: PropTypes.object,
    onChangeTeamAName: PropTypes.func,
    onChangeTeamBName: PropTypes.func,
    onChangePlayer: PropTypes.func,
    onSaveSettings: PropTypes.func,
    onCloseSettings: PropTypes.func,
    setScreenVisibility: PropTypes.func,
    settingsData: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    teamAName: makeSelectTeamAName(),
    teamBName: makeSelectTeamBName(),
    players: makeSelectPlayer()
});

export function mapDispatchToProps(dispatch) {
    return {
        onChangeTeamAName: evt => dispatch(changeTeamAName(evt.target.value)),
        onChangeTeamBName: evt => dispatch(changeTeamBName(evt.target.value)),
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
