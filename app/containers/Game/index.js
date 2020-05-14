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

import { useInjectReducer } from '../../utils/injectReducer';
import LocalStorage from '../../utils/local-storage';
import {
    makeSelectDate,
    makeSelectSettings,
    makeSelectGameStarted,
    makeSelectGamePaused,
    makeSelectGameEvents,
    makeSelectPeriod,
    makeSelectScore,
    makeSelectDataTeamA,
    makeSelectDataTeamB
} from './selectors';
import reducer from './reducer';
import { addEvent, addAction, handleGameStatus, storeScore } from './actions';
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
    EVENT_TYPES,
    POPUPS
} from './constants';
import './styles.scss';
import { MAX_NUMBER } from '../Settings/constants';
import PlayPause from '../../components/Play-pause';
import { isEven } from '../../utils/utilities';

const key = 'game';

export function Game({
    settings,
    date,
    gameStarted,
    gamePaused,
    gameEvents,
    currentPeriod,
    currentScore,
    onHandleGameStatus,
    onAddAction,
    onStoreScore,
    dataTeamA,
    dataTeamB
}) {
    useInjectReducer({ key, reducer });

    const gameId = sessionStorage.getItem('gameId');

    const saveGameInStorage = () => {
        if (gameId === null) {
            window.location = '/';
        }
        LocalStorage.set(gameId, {
            settings,
            gameId,
            date,
            gameStarted,
            gamePaused,
            currentPeriod,
            currentScore,
            dataTeamA,
            dataTeamB,
            gameEvents
        });
    };
    useEffect(saveGameInStorage, [gameId, gameStarted, gameEvents, settings]);

    // Popups management
    const [popupVisibility, setPopupVisibility] = useState({ players: false, playPause: false, settings: false });
    const openPopup = popup => {
        setPopupVisibility({ ...popupVisibility, [popup]: true });
    };
    const closePopup = popup => {
        setPopupVisibility({ ...popupVisibility, [popup]: false });
    };

    const initialPlayersData = {
        eventType: '',
        playersListType: '',
        playersTeam: '',
        playersList: [],
        officialsList: []
    };
    const [playersData, setPlayersData] = useState(initialPlayersData);
    const openPlayers = ({ team, type, eventType }) => {
        setPlayersData({
            eventType,
            playersListType: type,
            playersTeam: team,
            playersList: settings.teams[team].players,
            officialsList: settings.teams[team].officials
        });
    };
    useEffect(() => {
        if (playersData !== initialPlayersData) {
            openPopup(POPUPS.players);
        }
    }, [playersData]);

    const score = { teamA: dataTeamA.goals, teamB: dataTeamB.goals };
    const handleStartButton = ({ gameStatus = true, gamePauseStatus, eventType, period, id }) => {
        onHandleGameStatus({
            gameStarted: gameStatus,
            gamePaused: !gamePauseStatus,
            currentPeriod: period,
            memberType: 'Event period',
            eventType,
            score,
            id
        });
        if ((eventType === EVENT_TYPES.periodEnd || eventType === EVENT_TYPES.gameEnd) && !isEven(id)) {
            onStoreScore({ id, currentScore: `${score.teamA}-${score.teamB}` });
        }
    };
    const displayStartButtonMessage = () => {
        if (gameStarted) {
            return gamePaused ? messages.startButton.resume : messages.startButton.pause;
        }
        return messages.startButton.start;
    };

    const handleTimeoutButton = team => {
        onAddAction({
            type: ADD_TIMEOUT,
            eventType: EVENT_TYPES.timeout,
            team,
            score
        });
    };

    const addActionPerTeam = ({ eventType, type, team, id, memberType }) => {
        let updatedScore = score;
        if (eventType === EVENT_TYPES.goal) {
            updatedScore = {
                teamA: team === 'A' ? score.teamA + 1 : score.teamA,
                teamB: team === 'B' ? score.teamB + 1 : score.teamB
            };
        }
        onAddAction({ eventType, type, team, id, memberType, score: updatedScore });
    };

    /**
     * This function generates a list of players registered for a specific team and a specific foul (HTML).
     * @param team {string} A or B
     * @param foul {string} a key out of EVENT_TYPES
     * @returns {string|*}
     */
    const foulPlayersLog = (team, foul) => {
        const log = gameEvents.filter(event => event.team === team && event.eventType === EVENT_TYPES[foul]);
        if (log.length > 0) {
            const buffer = log.map(event => {
                const eventMember = settings.teams[team][event.memberType].filter(member => member.id === event.id);
                return (
                    <li key={`${foul}${team}${event.memberType}${eventMember[0].id}`}>
                        {eventMember[0].reference} {eventMember[0].name}
                    </li>
                );
            });
            return <ul>{buffer}</ul>;
        }
        return '';
    };

    /**
     * This function generates the list of events of the game (HTML).
     * @returns {*}
     */
    const gameEventsLog = () => {
        const buffer = gameEvents.map(gameEvent => {
            const htmlId = nextId();
            return (
                <li key={htmlId}>
                    <strong>Event:</strong> {gameEvent.eventType}, <strong>{gameEvent.team ? 'Team:' : ''}</strong>{' '}
                    {gameEvent.team}, <strong>{gameEvent.memberType ? `${gameEvent.memberType}:` : ''}</strong>{' '}
                    {gameEvent.id}, <strong>Score:</strong> {gameEvent.score.teamA}-{gameEvent.score.teamB}
                </li>
            );
        });
        return <ul>{buffer}</ul>;
    };

    return (
        <Fragment>
            <h1 className="title title--1">{messages.header}</h1>
            <ul>
                <li>{date}</li>
                <li>
                    <button type="button" onClick={() => openPopup(POPUPS.settings)}>
                        {messages.settings.open}
                    </button>
                </li>
                <li>
                    Period: {currentPeriod}{' '}
                    <button
                        type="button"
                        onClick={() => openPopup(POPUPS.playPause)}
                        disabled={!gameStarted && (currentPeriod === 4 || currentPeriod === 8)}
                    >
                        {displayStartButtonMessage()}
                    </button>
                    {popupVisibility.playPause ? (
                        <PlayPause
                            gameStarted={gameStarted}
                            gamePaused={gamePaused}
                            period={currentPeriod}
                            startHandler={handleStartButton}
                            closeHandler={closePopup}
                        />
                    ) : (
                        ''
                    )}
                </li>
                <li>
                    {currentScore.half1 ? (
                        <React.Fragment>
                            Score half-time 1: {currentScore.half1}
                            <br />
                        </React.Fragment>
                    ) : (
                        ''
                    )}
                    {currentScore.half3 ? (
                        <React.Fragment>
                            Score half-time 2: {currentScore.half3}
                            <br />
                        </React.Fragment>
                    ) : (
                        ''
                    )}
                    {currentScore.half5 ? (
                        <React.Fragment>
                            Score Extra-time half-time 1: {currentScore.half5}
                            <br />
                        </React.Fragment>
                    ) : (
                        ''
                    )}
                    {currentScore.half7 ? (
                        <React.Fragment>
                            Score Extra-time half-time 2: {currentScore.half7}
                            <br />
                        </React.Fragment>
                    ) : (
                        ''
                    )}
                </li>
                <li>
                    Score: {dataTeamA.goals} - {dataTeamB.goals}
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
                        disabled={!gameStarted || gamePaused || dataTeamA.timeouts >= MAX_NUMBER.timeouts}
                        onClick={() => handleTimeoutButton('A')}
                        title={dataTeamA.timeouts >= MAX_NUMBER.timeouts ? messages.maxTimeoutsReached : ''}
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
                    {foulPlayersLog('A', 'yellowCard')}
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
                    {foulPlayersLog('A', 'suspension')}
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
                    {foulPlayersLog('A', 'redCard')}
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
                    {foulPlayersLog('A', 'blueCard')}
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
                        disabled={!gameStarted || gamePaused || dataTeamB.timeouts >= MAX_NUMBER.timeouts}
                        onClick={() => handleTimeoutButton('B')}
                        title={dataTeamB.timeouts >= MAX_NUMBER.timeouts ? messages.maxTimeoutsReached : ''}
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
                    {foulPlayersLog('B', 'yellowCard')}
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
                    {foulPlayersLog('B', 'suspension')}
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
                    {foulPlayersLog('B', 'redCard')}
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
                    {foulPlayersLog('B', 'blueCard')}
                </li>
            </ul>
            <h2>Game log:</h2>
            {gameEventsLog()}
            {popupVisibility.settings ? <Settings settingsData={settings} closeHandler={closePopup} /> : ''}
            {popupVisibility.players ? (
                <Players
                    eventType={playersData.eventType}
                    playersListType={playersData.playersListType}
                    team={playersData.playersTeam}
                    playersList={playersData.playersList}
                    officialsList={playersData.officialsList}
                    actionHandler={addActionPerTeam}
                    closeHandler={closePopup}
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
    currentPeriod: PropTypes.number,
    currentScore: PropTypes.object,
    onHandleGameStatus: PropTypes.func,
    onAddAction: PropTypes.func,
    onStoreScore: PropTypes.func,
    dataTeamA: PropTypes.object,
    dataTeamB: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    settings: makeSelectSettings(),
    date: makeSelectDate(),
    gameStarted: makeSelectGameStarted(),
    gamePaused: makeSelectGamePaused(),
    gameEvents: makeSelectGameEvents(),
    currentPeriod: makeSelectPeriod(),
    currentScore: makeSelectScore(),
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
        },
        onStoreScore: data => {
            dispatch(storeScore(data));
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
