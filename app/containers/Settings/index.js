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

import { useInjectReducer } from 'utils/injectReducer';
import { changeTeamName, changePlayer, cancelChangeSettings } from './actions';
import { makeSelectTeams } from './selectors';
import reducer from './reducer';
import { messages } from './messages';
import { saveSettings } from '../Game/actions';

const key = 'settings';

export function Settings({
    teams,
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

    const playersList = team => {
        const buffer = teams[team].players.map(player => {
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
                        />
                    </li>
                );
            }
            return '';
        });
        return <ul>{buffer}</ul>;
    };

    return (
        <Fragment>
            <h2>{messages.header}</h2>
            <form action="" onSubmit={saveInitialisation}>
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
    teams: PropTypes.object,
    onChangeTeamName: PropTypes.func,
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
