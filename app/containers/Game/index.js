/*
 * Game screen
 *
 * This is the main screen, at the '/game' route
 *
 */

import React, { Fragment, useState, memo } from 'react';
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
import { addEvent, addGoal, addYellowCard, handleGameStatus } from './actions';

import Settings from '../Settings';
import { EVENT_TYPES } from './constants';
import './styles.scss';

const key = 'game';

export function Game({
    settings,
    date,
    gameStarted,
    gamePaused,
    gameEvents,
    onHandleGameStatus,
    onAddGoal,
    onAddYellowCard,
    dataTeamA,
    dataTeamB
}) {
    useInjectReducer({ key, reducer });

    const messages = {
        header: 'Game screen',
        settings: {
            open: 'Open settings...'
        },
        startButton: {
            start: 'Start game',
            pause: 'Pause game',
            resume: 'Resume game'
        },
        teamA: 'Home team',
        teamB: 'Visitor team'
    };

    const [settingsScreenVisibility, setSettingsScreenVisibility] = useState(false);
    const openSettings = () => {
        setSettingsScreenVisibility(true);
    };

    const handleStartButton = () => {
        let eventName = '';
        if (gameStarted) {
            eventName = gamePaused ? EVENT_TYPES.periodStart : EVENT_TYPES.periodEnd;
        } else {
            eventName = EVENT_TYPES.gameStart;
        }
        onHandleGameStatus({
            gameStarted: true,
            gamePaused: !gamePaused,
            eventType: eventName,
            team: null,
            playerNumber: null
        });
    };

    const displayStartButtonMessage = () => {
        if (gameStarted) {
            return gamePaused ? messages.startButton.resume : messages.startButton.pause;
        }
        return messages.startButton.start;
    };

    const addGoalPerTeam = (team, playerNumber) => {
        onAddGoal({
            eventType: EVENT_TYPES.goal,
            team,
            playerNumber
        });
    };

    const addYellowCardPerTeam = (team, playerNumber) => {
        onAddYellowCard({
            eventType: EVENT_TYPES.yellowCard,
            team,
            playerNumber
        });
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
                {messages.teamA}: {settings.teamAName}
            </h2>
            <ul>
                <li>
                    <button
                        type="button"
                        disabled={!gameStarted || gamePaused}
                        onClick={() => {
                            addGoalPerTeam('A', 0);
                        }}
                    >
                        Add goal
                    </button>
                </li>
                <li>
                    Yellow cards: {dataTeamA.yellowCards}
                    <button
                        type="button"
                        disabled={!gameStarted || gamePaused}
                        onClick={() => {
                            addYellowCardPerTeam('A', 0);
                        }}
                    >
                        Add 1
                    </button>
                </li>
            </ul>

            <h2>
                {messages.teamB}: {settings.teamBName}
            </h2>
            <ul>
                <li>
                    <button
                        type="button"
                        disabled={!gameStarted || gamePaused}
                        onClick={() => {
                            addGoalPerTeam('B', 0);
                        }}
                    >
                        Add goal
                    </button>
                </li>
                <li>
                    Yellow cards: {dataTeamB.yellowCards}
                    <button
                        type="button"
                        disabled={!gameStarted || gamePaused}
                        onClick={() => {
                            addYellowCardPerTeam('B', 0);
                        }}
                    >
                        Add 1
                    </button>
                </li>
            </ul>
            {gameEvents.eventType}
            {gameEventsLog()}
            {settingsScreenVisibility ? (
                <Settings setSettingsScreenVisibility={setSettingsScreenVisibility} settingsData={settings} />
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
    onAddGoal: PropTypes.func,
    onAddYellowCard: PropTypes.func,
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
        onAddGoal: data => {
            dispatch(addGoal(data));
            dispatch(addEvent(data));
        },
        onAddYellowCard: data => {
            dispatch(addYellowCard(data));
            dispatch(addEvent(data));
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
