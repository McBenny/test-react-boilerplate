/*
 * Game screen
 *
 * This is the main screen, at the '/game' route
 *
 */

import React, { Fragment, useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import nextId from 'react-id-generator';

import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import {
    makeSelectDate,
    makeSelectSettings,
    makeSelectGameStarted,
    makeSelectGamePaused,
    makeSelectGameEvents,
    makeSelectDataTeamA,
    makeSelectDataTeamB
} from './selectors';
import reducer from './reducer';
import { addEvent, addAction, handleGameStatus } from './actions';
import { messages } from './messages';

import Settings from '../Settings';
import Players from '../../components/Players';

import {
    ADD_BLUE_CARD,
    ADD_EVENT,
    ADD_GOAL,
    ADD_RED_CARD,
    ADD_SUSPENSION,
    ADD_TIMEOUT,
    ADD_YELLOW_CARD,
    EVENT_TYPES
} from './constants';
import './styles.scss';

const key = 'game';

export function Game({
    settings,
    date,
    gameStarted,
    gamePaused,
    gameEvents,
    onHandleGameStatus,
    onAddAction,
    dataTeamA,
    dataTeamB
}) {
    useInjectReducer({ key, reducer });

    const [settingsScreenVisibility, setSettingsScreenVisibility] = useState(false);
    const openSettings = () => {
        setSettingsScreenVisibility(true);
    };

    const initialPlayersData = { eventType: '', playersListType: '', playersTeam: '', playersList: {} };
    const [playersScreenVisibility, setPlayersScreenVisibility] = useState(false);
    const [playersData, setPlayersData] = useState(initialPlayersData);
    const openPlayers = ({ team, type, eventType }) => {
        setPlayersData({
            eventType,
            playersListType: type,
            playersTeam: team,
            playersList: settings.teams[team].players
        });
    };
    useEffect(() => {
        if (playersData !== initialPlayersData) {
            setPlayersScreenVisibility(true);
        }
    }, [playersData]);

    const handleStartButton = () => {
        let eventName;
        if (gameStarted) {
            eventName = gamePaused ? EVENT_TYPES.periodStart : EVENT_TYPES.periodEnd;
        } else {
            eventName = EVENT_TYPES.gameStart;
        }
        onHandleGameStatus({
            gameStarted: true,
            gamePaused: !gamePaused,
            eventType: eventName
        });
    };

    const handleTimeoutButton = team => {
        onAddAction({
            type: ADD_TIMEOUT,
            eventType: EVENT_TYPES.timeout,
            team
        });
    };

    const displayStartButtonMessage = () => {
        if (gameStarted) {
            return gamePaused ? messages.startButton.resume : messages.startButton.pause;
        }
        return messages.startButton.start;
    };

    const addActionPerTeam = ({ eventType, type, team, playerNumber }) => {
        onAddAction({ eventType, type, team, playerNumber });
    };

    const gameEventsLog = () => {
        const log = gameEvents.map(gameEvent => {
            const htmlId = nextId();
            return (
                <li key={htmlId}>
                    <b>Event:</b> {gameEvent.eventType}, <b>Team:</b> {gameEvent.team}, <b>Player:</b>{' '}
                    {gameEvent.playerNumber}
                </li>
            );
        });
        return <ul>{log}</ul>;
    };

    return (
        <Fragment>
            <h1 className="title title--1">{messages.header}</h1>
            <ul>
                <li>{date}</li>
                <li>
                    <button type="button" onClick={openSettings}>
                        {messages.settings.open}
                    </button>
                </li>
                <li>
                    <button type="button" onClick={handleStartButton}>
                        {displayStartButtonMessage()}
                    </button>
                </li>
                <li>
                    Score: {dataTeamA.score} - {dataTeamB.score}
                </li>
            </ul>

            <h2>
                {messages.teamA}: {settings.teams.A.name}
            </h2>
            <ul>
                <li>
                    Timeouts: {dataTeamA.timeouts}
                    <button
                        type="button"
                        disabled={!gameStarted || gamePaused || dataTeamA.timeouts >= 3}
                        onClick={() => handleTimeoutButton('A')}
                    >
                        {messages.addTimeout}
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        disabled={!gameStarted || gamePaused}
                        onClick={() => openPlayers({ eventType: EVENT_TYPES.goal, team: 'A', type: ADD_GOAL })}
                    >
                        {messages.addGoal}
                    </button>
                </li>
                <li>
                    Yellow cards: {dataTeamA.yellowCards}
                    <button
                        type="button"
                        disabled={!gameStarted || gamePaused}
                        onClick={() =>
                            openPlayers({ eventType: EVENT_TYPES.yellowCard, team: 'A', type: ADD_YELLOW_CARD })
                        }
                    >
                        {messages.addYellowCard}
                    </button>
                </li>
                <li>
                    2 minutes: {dataTeamA.suspensions}
                    <button
                        type="button"
                        disabled={!gameStarted || gamePaused}
                        onClick={() =>
                            openPlayers({ eventType: EVENT_TYPES.suspension, team: 'A', type: ADD_SUSPENSION })
                        }
                    >
                        {messages.addSuspension}
                    </button>
                </li>
                <li>
                    Red cards: {dataTeamA.redCards}
                    <button
                        type="button"
                        disabled={!gameStarted || gamePaused}
                        onClick={() => openPlayers({ eventType: EVENT_TYPES.redCard, team: 'A', type: ADD_RED_CARD })}
                    >
                        {messages.addRedCard}
                    </button>
                </li>
                <li>
                    Blue cards: {dataTeamA.blueCards}
                    <button
                        type="button"
                        disabled={!gameStarted || gamePaused}
                        onClick={() => openPlayers({ eventType: EVENT_TYPES.blueCard, team: 'A', type: ADD_BLUE_CARD })}
                    >
                        {messages.addBlueCard}
                    </button>
                </li>
            </ul>

            <h2>
                {messages.teamB}: {settings.teams.B.name}
            </h2>
            <ul>
                <li>
                    Timeouts: {dataTeamB.timeouts}
                    <button
                        type="button"
                        disabled={!gameStarted || gamePaused || dataTeamB.timeouts >= 3}
                        onClick={() => handleTimeoutButton('B')}
                    >
                        {messages.addTimeout}
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        disabled={!gameStarted || gamePaused}
                        onClick={() => openPlayers({ eventType: EVENT_TYPES.goal, team: 'B', type: ADD_GOAL })}
                    >
                        {messages.addGoal}
                    </button>
                </li>
                <li>
                    Yellow cards: {dataTeamB.yellowCards}
                    <button
                        type="button"
                        disabled={!gameStarted || gamePaused}
                        onClick={() =>
                            openPlayers({ eventType: EVENT_TYPES.yellowCard, team: 'B', type: ADD_YELLOW_CARD })
                        }
                    >
                        {messages.addYellowCard}
                    </button>
                </li>
                <li>
                    2 minutes: {dataTeamB.suspensions}
                    <button
                        type="button"
                        disabled={!gameStarted || gamePaused}
                        onClick={() =>
                            openPlayers({ eventType: EVENT_TYPES.suspension, team: 'B', type: ADD_SUSPENSION })
                        }
                    >
                        {messages.addSuspension}
                    </button>
                </li>
                <li>
                    Red cards: {dataTeamB.redCards}
                    <button
                        type="button"
                        disabled={!gameStarted || gamePaused}
                        onClick={() => openPlayers({ eventType: EVENT_TYPES.redCard, team: 'B', type: ADD_RED_CARD })}
                    >
                        {messages.addRedCard}
                    </button>
                </li>
                <li>
                    Blue cards: {dataTeamB.blueCards}
                    <button
                        type="button"
                        disabled={!gameStarted || gamePaused}
                        onClick={() => openPlayers({ eventType: EVENT_TYPES.blueCard, team: 'B', type: ADD_BLUE_CARD })}
                    >
                        {messages.addBlueCard}
                    </button>
                </li>
            </ul>
            <h2>Game log:</h2>
            {gameEventsLog()}
            {settingsScreenVisibility ? (
                <Settings setScreenVisibility={setSettingsScreenVisibility} settingsData={settings} />
            ) : (
                ''
            )}
            {playersScreenVisibility ? (
                <Players
                    setScreenVisibility={setPlayersScreenVisibility}
                    eventType={playersData.eventType}
                    playersListType={playersData.playersListType}
                    team={playersData.playersTeam}
                    playersList={playersData.playersList}
                    actionHandler={addActionPerTeam}
                />
            ) : (
                ''
            )}
        </Fragment>
    );
}

Game.propTypes = {
    settings: PropTypes.object,
    date: PropTypes.string,
    gameStarted: PropTypes.bool,
    gamePaused: PropTypes.bool,
    gameEvents: PropTypes.array,
    onHandleGameStatus: PropTypes.func,
    onAddAction: PropTypes.func,
    dataTeamA: PropTypes.object,
    dataTeamB: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    settings: makeSelectSettings(),
    date: makeSelectDate(),
    gameStarted: makeSelectGameStarted(),
    gamePaused: makeSelectGamePaused(),
    gameEvents: makeSelectGameEvents(),
    dataTeamA: makeSelectDataTeamA(),
    dataTeamB: makeSelectDataTeamB()
});

export function mapDispatchToProps(dispatch) {
    return {
        onHandleGameStatus: data => {
            dispatch(handleGameStatus(data));
            dispatch(addEvent(data));
        },
        onAddAction: data => {
            dispatch(addAction(data));
            dispatch(addAction({ ...data, type: ADD_EVENT }));
        }
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(
    withConnect,
    memo
)(Game);
