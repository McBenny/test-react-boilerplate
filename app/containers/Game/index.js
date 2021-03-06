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
import { createStructuredSelector } from 'reselect';

import {
    Container,
    Grid,
    List,
    Button,
    IconButton,
    ListItem,
    ListItemText,
    AppBar,
    Toolbar,
    useMediaQuery
} from '@material-ui/core';
import CropPortraitOutlinedIcon from '@material-ui/icons/CropPortraitOutlined';
import FullscreenExitOutlinedIcon from '@material-ui/icons/FullscreenExitOutlined';
import FullscreenOutlinedIcon from '@material-ui/icons/FullscreenOutlined';
import HomeOutlined from '@material-ui/icons/HomeOutlined';
import LooksTwoOutlinedIcon from '@material-ui/icons/LooksTwoOutlined';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import SportsSoccerOutlinedIcon from '@material-ui/icons/SportsSoccerOutlined';
import TitleOutlinedIcon from '@material-ui/icons/TitleOutlined';

import Settings from '../Settings';
import Players from '../../components/Players';
import PlayPause from '../../components/Play-pause';
import Timeout from '../../components/Timeout';
import Countdown from '../../components/Countdown';
import LineUp from '../../components/Line-up';
import GameLog from '../../components/Game-log';

import { BREAKPOINTS, SESSION_KEY, URLS } from '../App/constants';
import { GENDERS, MAX_NUMBER, TEAMS_LIST } from '../Settings/constants';
import {
    ADD_BLUE_CARD,
    ADD_EVENT,
    ADD_GOAL,
    ADD_RED_CARD,
    ADD_SUSPENSION,
    ADD_TIMEOUT,
    ADD_YELLOW_CARD,
    EVENT_TYPES,
    FOULS,
    PERIODS,
    POPUPS,
    TIME_DURATIONS
} from './constants';
import { useInjectReducer } from '../../utils/injectReducer';
import LocalStorage from '../../utils/local-storage';
import { isEven, compareValues, formatDate } from '../../utils/utilities';

import {
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
import './styles.scss';

const key = 'game';

export function Game({
    settings,
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

    const gameId = sessionStorage.getItem(SESSION_KEY);

    const saveGameInStorage = () => {
        if (gameId === null) {
            window.location = URLS.index;
        }
        LocalStorage.set(gameId, {
            settings,
            gameId,
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
    const isLaptop = useMediaQuery(`(min-width: ${BREAKPOINTS.laptop + 1}px)`);

    // Fullscreen management
    const [fullScreen, setFullScreen] = useState({ status: false, element: '' });
    const handleFullScreen = () => {
        const { element, status } = fullScreen;
        if (element === document.documentElement) {
            if (element.requestFullscreen && document.exitFullscreen) {
                return status ? element.requestFullscreen() : document.exitFullscreen();
            }
            if (element.mozRequestFullScreen) {
                return status ? element.mozRequestFullScreen() : element.mozExitFullScreen();
            }
            if (element.webkitRequestFullscreen) {
                return status ? element.webkitRequestFullscreen() : element.webkitExitFullscreen();
            }
        }
        return () => {};
    };
    useEffect(() => {
        handleFullScreen();
    }, [fullScreen]);

    // Popups management
    const popupsInitialState = {
        lineUp: false,
        players: false,
        playPause: false,
        settings: false,
        undo: false
    };
    const [popupVisibility, setPopupVisibility] = useState(popupsInitialState);
    const openPopup = popup => {
        setPopupVisibility({ ...popupsInitialState, [popup]: true });
    };
    const closePopup = () => {
        setPopupVisibility({ ...popupsInitialState });
    };

    const initialPlayersData = {
        eventType: '',
        playersListType: '',
        playersTeam: '',
        playersList: [],
        officialsList: [],
        suspensions: {}
    };
    const [playersData, setPlayersData] = useState(initialPlayersData);
    const openPlayers = ({ team, type, eventType }) => {
        setPlayersData({
            eventType,
            playersListType: type,
            playersTeam: team,
            jerseyColour: settings.teams[team].jersey,
            referenceColour: settings.teams[team].reference,
            playersList: settings.teams[team].players,
            captainId: settings.teams[team].captain,
            officialsList: settings.teams[team].officials,
            suspensions: timeOut
        });
    };
    useEffect(() => {
        if (playersData !== initialPlayersData) {
            openPopup(POPUPS.players);
        }
    }, [playersData]);

    const [lineUpData, setLineUpData] = useState(initialPlayersData);
    const openLineUp = ({ team }) => {
        setLineUpData({
            playersTeam: team,
            jerseyColour: settings.teams[team].jersey,
            referenceColour: settings.teams[team].reference,
            playersList: settings.teams[team].players,
            captainId: settings.teams[team].captain,
            officialsList: settings.teams[team].officials
        });
    };
    useEffect(() => {
        if (lineUpData !== initialPlayersData) {
            openPopup(POPUPS.lineUp);
        }
    }, [lineUpData]);

    const returnHomeHandler = () => {
        window.location.href = URLS.index;
    };

    const formattedDate = formatDate(settings.date);
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

    const displayCompetitionDetails = () => {
        let message = '';
        if (settings.competition !== '') {
            message += `${settings.competition} `;
        }
        if (settings.gender !== '') {
            message += ` [${GENDERS[settings.gender]}] `;
        }
        if (settings.round !== '') {
            message += ` (${messages.round}: ${settings.round})`;
        }
        return (
            <Fragment>
                <h1 className="title title--1">{message !== '' ? message : messages.title}</h1>
            </Fragment>
        );
    };

    const TYPE_MESSAGE = 'TYPE_MESSAGE';
    const displayStartButtonData = type => {
        if (gameStarted) {
            if (type === TYPE_MESSAGE) {
                return gamePaused ? messages.startButton.resume : messages.startButton.pause;
            }
            return gamePaused ? (
                <PlayCircleOutlineIcon fontSize={isLaptop ? 'default' : 'large'} />
            ) : (
                <PauseCircleOutlineIcon fontSize={isLaptop ? 'default' : 'large'} />
            );
        }
        if (type === TYPE_MESSAGE) {
            return currentPeriod === 0 ? messages.startButton.start : messages.startButton.gameOver;
        }
        return <PlayCircleOutlineIcon fontSize={isLaptop ? 'default' : 'large'} />;
    };

    const initialTimeOuts = { A: false, B: false };
    const [timeOut, setATimeOut] = useState(initialTimeOuts);

    const handleTimeoutButton = team => {
        // Activates the counter for timeouts
        setATimeOut({ ...timeOut, [team]: true });
        // Pauses the game
        handleStartButton({
            gamePauseStatus: gamePaused,
            eventType: EVENT_TYPES.gamePaused,
            id: currentPeriod,
            period: currentPeriod
        });

        // Adds the timeout to the count of timeouts
        onAddAction({
            type: ADD_TIMEOUT,
            eventType: EVENT_TYPES.timeout,
            team,
            score
        });
    };

    const addActionPerTeam = ({
        eventType,
        second2Minutes = false,
        penalty = false,
        missed = false,
        type,
        team,
        id,
        memberType
    }) => {
        let updatedScore = score;
        if (eventType === EVENT_TYPES.goal) {
            if (missed) {
                updatedScore = {
                    teamA: score.teamA,
                    teamB: score.teamB
                };
            } else {
                updatedScore = {
                    teamA: team === TEAMS_LIST.HOME ? score.teamA + 1 : score.teamA,
                    teamB: team === TEAMS_LIST.AWAY ? score.teamB + 1 : score.teamB
                };
            }
        } else if (eventType === EVENT_TYPES.suspension) {
            setATimeOut({
                ...timeOut,
                [`${FOULS.suspension}${team}${memberType}${id}`]: true,
                [`${FOULS.suspension}${team}${memberType}${id}Double`]: second2Minutes
            });
        }
        onAddAction({ eventType, second2Minutes, penalty, missed, type, team, id, memberType, score: updatedScore });
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
            // Duplicate lines when "second2Minutes"
            const additionalLog = log.filter(line => line.second2Minutes);
            const completeLog = log.concat(additionalLog);

            // Creates a list of made-up uids from the ids coupled with member type
            const uids = completeLog.map(member => `${member.id}-${member.memberType}`);

            // Creates an object of UNIQUE previous uids as keys with their respective count as values
            const foulsCount = uids.reduce((map, val) => {
                // eslint-disable-next-line no-param-reassign
                map[val] = (map[val] || 0) + 1;
                return map;
            }, {});

            // Creates an array of the unique uids
            const filteredUids = Object.keys(foulsCount);

            // Creates an array of members with their data according to the list of unique uids, adds the counts
            const faultyMembers = filteredUids.map(uid => {
                const [memberId, memberType] = uid.split('-');
                const memberData = settings.teams[team][memberType].filter(
                    member => member.id === parseInt(memberId, 10)
                );
                return {
                    ...memberData[0],
                    memberType,
                    count: foulsCount[uid]
                };
            });
            const faultyMembersSorted = faultyMembers.sort(compareValues('reference', true, true));
            const buffer = faultyMembersSorted.map(faultyMember => (
                <ListItem
                    key={`${foul}${team}${faultyMember.memberType}${faultyMember.id}`}
                    className="game__member-list-item"
                >
                    <ListItemText>
                        {/* eslint-disable indent */}
                        {foul === FOULS.suspension &&
                        timeOut[`${foul}${team}${faultyMember.memberType}${faultyMember.id}`] === true ? (
                            <Countdown
                                duration={
                                    TIME_DURATIONS.suspension *
                                    (timeOut[`${foul}${team}${faultyMember.memberType}${faultyMember.id}Double`]
                                        ? 2
                                        : 1)
                                }
                                isOnHold={gamePaused}
                                event={EVENT_TYPES.suspension}
                                callback={() =>
                                    setATimeOut({
                                        ...timeOut,
                                        [`${foul}${team}${faultyMember.memberType}${faultyMember.id}`]: false,
                                        [`${foul}${team}${faultyMember.memberType}${faultyMember.id}Double`]: false
                                    })
                                }
                            />
                        ) : (
                            ''
                        )}
                        {/* eslint-enable indent */}[
                        <span className="game__member-reference">{faultyMember.reference}</span>]{' '}
                        <span className="laptop-mode">{faultyMember.name}</span>{' '}
                        {faultyMember.count > 1 ? `(${faultyMember.count})` : ''}
                    </ListItemText>
                </ListItem>
            ));
            return <List className="game__member-list">{buffer}</List>;
        }
        return '';
    };

    return (
        <Fragment>
            <main>
                <AppBar position="static" className="game__appbar">
                    <Toolbar variant="dense" className="game__toolbar">
                        <div>{formattedDate}</div>
                        <IconButton
                            color="inherit"
                            onClick={() => {
                                setFullScreen({
                                    status: !fullScreen.status,
                                    element: document.documentElement
                                });
                            }}
                            arial-label={messages.fullscreen}
                            title={messages.fullscreen}
                            edge="end"
                        >
                            {fullScreen.status ? (
                                <FullscreenExitOutlinedIcon fontSize={isLaptop ? 'default' : 'large'} />
                            ) : (
                                <FullscreenOutlinedIcon fontSize={isLaptop ? 'default' : 'large'} />
                            )}
                        </IconButton>
                        <IconButton
                            color="inherit"
                            onClick={() => openPopup(POPUPS.settings)}
                            arial-label={messages.settings.open}
                            edge="end"
                        >
                            <SettingsOutlinedIcon fontSize={isLaptop ? 'default' : 'large'} />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            onClick={() => returnHomeHandler()}
                            aria-label={messages.returnHome}
                            edge="end"
                        >
                            <HomeOutlined fontSize={isLaptop ? 'default' : 'large'} />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={false} className="game__console">
                    <Container>
                        {displayCompetitionDetails()}
                        <div className="game__grid game__grid--score">
                            <div className="game__grid-item game__grid-item--timeout">
                                {timeOut.A ? (
                                    <Timeout>
                                        <Countdown
                                            duration={TIME_DURATIONS.timeout}
                                            callback={() => setATimeOut({ ...timeOut, A: false })}
                                        />
                                    </Timeout>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div className="game__grid-item game__grid-item--team" />
                            <div className="game__grid-item game__grid-item--team">
                                <Button
                                    variant="contained"
                                    onClick={() => openPopup(POPUPS.playPause)}
                                    disabled={!gameStarted && (currentPeriod === 4 || currentPeriod === 8)}
                                    startIcon={displayStartButtonData()}
                                    className="game__button game__button--start-stop"
                                    size={isLaptop ? 'medium' : 'large'}
                                >
                                    {isLaptop && displayStartButtonData(TYPE_MESSAGE)}
                                </Button>
                                {popupVisibility.playPause ? (
                                    <PlayPause
                                        popupVisibility={popupVisibility.playPause}
                                        gameStarted={gameStarted}
                                        gamePaused={gamePaused}
                                        period={currentPeriod}
                                        startHandler={handleStartButton}
                                        closeHandler={closePopup}
                                    />
                                ) : (
                                    ''
                                )}
                            </div>
                            <div className="game__grid-item game__grid-item--team" />
                            <div className="game__grid-item game__grid-item--timeout">
                                {timeOut.B ? (
                                    <Timeout>
                                        <Countdown
                                            duration={TIME_DURATIONS.timeout}
                                            callback={() => setATimeOut({ ...timeOut, B: false })}
                                        />
                                    </Timeout>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>

                        <div className="game__grid game__grid--score">
                            <div className="game__grid-item game__grid-item--timeout">
                                <Button
                                    variant="contained"
                                    onClick={() => handleTimeoutButton(TEAMS_LIST.HOME)}
                                    disabled={!gameStarted || gamePaused || dataTeamA.timeouts >= MAX_NUMBER.timeouts}
                                    className="game__button game__button--card game__button--timeout"
                                    title={
                                        dataTeamA.timeouts >= MAX_NUMBER.timeouts
                                            ? messages.maxTimeoutsReached
                                            : messages.addTimeout
                                    }
                                    startIcon={<TitleOutlinedIcon />}
                                >
                                    <span className="button__label button__label--timeout">{dataTeamA.timeouts}</span>
                                </Button>
                            </div>
                            <div className="game__grid-item game__grid-item--team game__grid-item--team-A">
                                <Button
                                    onClick={() =>
                                        openPlayers({
                                            eventType: EVENT_TYPES.goal,
                                            team: TEAMS_LIST.HOME,
                                            type: ADD_GOAL
                                        })
                                    }
                                    disabled={!gameStarted || gamePaused}
                                    className="game__button game__button--team"
                                    size="large"
                                    endIcon={<SportsSoccerOutlinedIcon />}
                                >
                                    {settings.teams.A.name}
                                </Button>
                            </div>
                            <div className="game__grid-item game__grid-item--score">
                                <div className="game__score game__score--half-time">{PERIODS[currentPeriod]}</div>
                                <div className="game__score">
                                    {dataTeamA.goals} - {dataTeamB.goals}
                                    {gamePaused && gameStarted && (
                                        <div className="game__pause">
                                            <Button
                                                variant="contained"
                                                onClick={() => openPopup(POPUPS.playPause)}
                                                disableElevation
                                                className="game__button game__button--pause"
                                            >
                                                {messages.onHold}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                <div className="game__score game__score--half-time">
                                    {currentScore.half1 ? (
                                        <React.Fragment>
                                            {currentScore.half1} (HT1)
                                            <br />
                                        </React.Fragment>
                                    ) : (
                                        ''
                                    )}
                                    {currentScore.half3 ? (
                                        <React.Fragment>
                                            {currentScore.half3} (HT2)
                                            <br />
                                        </React.Fragment>
                                    ) : (
                                        ''
                                    )}
                                    {currentScore.half5 ? (
                                        <React.Fragment>
                                            {currentScore.half5} (H1 ext. time)
                                            <br />
                                        </React.Fragment>
                                    ) : (
                                        ''
                                    )}
                                    {currentScore.half7 ? (
                                        <React.Fragment>{currentScore.half7} (H2 ext. time)</React.Fragment>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </div>
                            <div className="game__grid-item game__grid-item--team">
                                <Button
                                    onClick={() =>
                                        openPlayers({
                                            eventType: EVENT_TYPES.goal,
                                            team: TEAMS_LIST.AWAY,
                                            type: ADD_GOAL
                                        })
                                    }
                                    disabled={!gameStarted || gamePaused}
                                    className="game__button game__button--team"
                                    size="large"
                                    startIcon={<SportsSoccerOutlinedIcon />}
                                >
                                    {settings.teams.B.name}
                                </Button>
                            </div>
                            <div className="game__grid-item game__grid-item--timeout">
                                <Button
                                    variant="contained"
                                    onClick={() => handleTimeoutButton(TEAMS_LIST.AWAY)}
                                    disabled={!gameStarted || gamePaused || dataTeamB.timeouts >= MAX_NUMBER.timeouts}
                                    className="game__button game__button--card game__button--timeout"
                                    title={
                                        dataTeamB.timeouts >= MAX_NUMBER.timeouts
                                            ? messages.maxTimeoutsReached
                                            : messages.addTimeout
                                    }
                                    startIcon={<TitleOutlinedIcon />}
                                >
                                    <span className="button__label button__label--timeout">{dataTeamB.timeouts}</span>
                                </Button>
                            </div>
                        </div>

                        <div className="game__grid game__grid--data">
                            <div className="game__grid-item game__grid-item--fouls">
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        openPlayers({
                                            eventType: EVENT_TYPES.blueCard,
                                            team: TEAMS_LIST.HOME,
                                            type: ADD_BLUE_CARD
                                        })
                                    }
                                    disabled={!gameStarted || currentPeriod === 4 || currentPeriod === 8}
                                    startIcon={<CropPortraitOutlinedIcon />}
                                    className="game__button game__button--card game__button--blue-card"
                                    title={messages.addBlueCard}
                                >
                                    {messages.addBlueCardShort}
                                </Button>
                                <p>({dataTeamA.blueCards})</p>
                                {foulPlayersLog(TEAMS_LIST.HOME, FOULS.blueCard)}
                            </div>
                            <div className="game__grid-item game__grid-item--fouls">
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        openPlayers({
                                            eventType: EVENT_TYPES.redCard,
                                            team: TEAMS_LIST.HOME,
                                            type: ADD_RED_CARD
                                        })
                                    }
                                    disabled={!gameStarted || currentPeriod === 4 || currentPeriod === 8}
                                    startIcon={<CropPortraitOutlinedIcon />}
                                    className="game__button game__button--card game__button--red-card"
                                    title={messages.addRedCard}
                                >
                                    {messages.addRedCardShort}
                                </Button>
                                <p>({dataTeamA.redCards})</p>
                                {foulPlayersLog(TEAMS_LIST.HOME, FOULS.redCard)}
                            </div>
                            <div className="game__grid-item game__grid-item--fouls">
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        openPlayers({
                                            eventType: EVENT_TYPES.suspension,
                                            team: TEAMS_LIST.HOME,
                                            type: ADD_SUSPENSION
                                        })
                                    }
                                    disabled={!gameStarted || currentPeriod === 4 || currentPeriod === 8}
                                    startIcon={<LooksTwoOutlinedIcon />}
                                    className="game__button game__button--card game__button--suspension"
                                    title={messages.addSuspension}
                                >
                                    {messages.addSuspensionShort}
                                </Button>
                                <p>({dataTeamA.suspensions})</p>
                                {foulPlayersLog(TEAMS_LIST.HOME, FOULS.suspension)}
                            </div>
                            <div className="game__grid-item game__grid-item--fouls">
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        openPlayers({
                                            eventType: EVENT_TYPES.yellowCard,
                                            team: TEAMS_LIST.HOME,
                                            type: ADD_YELLOW_CARD
                                        })
                                    }
                                    disabled={
                                        !gameStarted ||
                                        currentPeriod === 4 ||
                                        currentPeriod === 8 ||
                                        dataTeamA.yellowCards >=
                                            MAX_NUMBER.yellowCardsPlayersPerTeam +
                                                MAX_NUMBER.yellowCardsOfficialsPerTeam
                                    }
                                    startIcon={<CropPortraitOutlinedIcon />}
                                    className="game__button game__button--card game__button--yellow-card"
                                    title={
                                        dataTeamA.yellowCards >=
                                        MAX_NUMBER.yellowCardsPlayersPerTeam + MAX_NUMBER.yellowCardsOfficialsPerTeam
                                            ? messages.noMoreYellowCards
                                            : messages.addYellowCard
                                    }
                                >
                                    {messages.addYellowCardShort}
                                </Button>
                                <p>({dataTeamA.yellowCards})</p>
                                {foulPlayersLog(TEAMS_LIST.HOME, FOULS.yellowCard)}
                            </div>

                            <div className="game__grid-item game__grid-item--fouls">
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        openPlayers({
                                            eventType: EVENT_TYPES.yellowCard,
                                            team: TEAMS_LIST.AWAY,
                                            type: ADD_YELLOW_CARD
                                        })
                                    }
                                    disabled={
                                        !gameStarted ||
                                        currentPeriod === 4 ||
                                        currentPeriod === 8 ||
                                        dataTeamB.yellowCards >=
                                            MAX_NUMBER.yellowCardsPlayersPerTeam +
                                                MAX_NUMBER.yellowCardsOfficialsPerTeam
                                    }
                                    startIcon={<CropPortraitOutlinedIcon />}
                                    className="game__button game__button--card game__button--yellow-card"
                                    title={
                                        dataTeamB.yellowCards >=
                                        MAX_NUMBER.yellowCardsPlayersPerTeam + MAX_NUMBER.yellowCardsOfficialsPerTeam
                                            ? messages.noMoreYellowCards
                                            : messages.addYellowCard
                                    }
                                >
                                    {messages.addYellowCardShort}
                                </Button>
                                <p>({dataTeamB.yellowCards})</p>
                                {foulPlayersLog(TEAMS_LIST.AWAY, FOULS.yellowCard)}
                            </div>
                            <div className="game__grid-item game__grid-item--fouls">
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        openPlayers({
                                            eventType: EVENT_TYPES.suspension,
                                            team: TEAMS_LIST.AWAY,
                                            type: ADD_SUSPENSION
                                        })
                                    }
                                    disabled={!gameStarted || currentPeriod === 4 || currentPeriod === 8}
                                    startIcon={<LooksTwoOutlinedIcon />}
                                    className="game__button game__button--card game__button--suspension"
                                    title={messages.addSuspension}
                                >
                                    {messages.addSuspensionShort}
                                </Button>
                                <p>({dataTeamB.suspensions})</p>
                                {foulPlayersLog(TEAMS_LIST.AWAY, FOULS.suspension)}
                            </div>
                            <div className="game__grid-item game__grid-item--fouls">
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        openPlayers({
                                            eventType: EVENT_TYPES.redCard,
                                            team: TEAMS_LIST.AWAY,
                                            type: ADD_RED_CARD
                                        })
                                    }
                                    disabled={!gameStarted || currentPeriod === 4 || currentPeriod === 8}
                                    startIcon={<CropPortraitOutlinedIcon />}
                                    className="game__button game__button--card game__button--red-card"
                                    title={messages.addRedCard}
                                >
                                    {messages.addRedCardShort}
                                </Button>
                                <p>({dataTeamB.redCards})</p>
                                {foulPlayersLog(TEAMS_LIST.AWAY, FOULS.redCard)}
                            </div>
                            <div className="game__grid-item game__grid-item--fouls">
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        openPlayers({
                                            eventType: EVENT_TYPES.blueCard,
                                            team: TEAMS_LIST.AWAY,
                                            type: ADD_BLUE_CARD
                                        })
                                    }
                                    disabled={!gameStarted || currentPeriod === 4 || currentPeriod === 8}
                                    startIcon={<CropPortraitOutlinedIcon />}
                                    className="game__button game__button--card game__button--blue-card"
                                    title={messages.addBlueCard}
                                >
                                    {messages.addBlueCardShort}
                                </Button>
                                <p>({dataTeamB.blueCards})</p>
                                {foulPlayersLog(TEAMS_LIST.AWAY, FOULS.blueCard)}
                            </div>
                        </div>
                        <Grid container justify="center" alignItems="flex-start" spacing={3}>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    onClick={() => openLineUp({ team: TEAMS_LIST.HOME })}
                                    startIcon={<PeopleOutlineIcon />}
                                >
                                    {messages.showLineUp}
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    onClick={() => openLineUp({ team: TEAMS_LIST.AWAY })}
                                    startIcon={<PeopleOutlineIcon />}
                                >
                                    {messages.showLineUp}
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Container>
                <div className="game__log">
                    <GameLog
                        popupVisibility={popupVisibility}
                        isLaptop={isLaptop}
                        gameEvents={gameEvents}
                        settingsData={settings}
                        setATimeOut={setATimeOut}
                        openHandler={openPopup}
                        closeHandler={closePopup}
                    />
                </div>
                <Settings
                    settingsData={settings}
                    gameStarted={gameStarted}
                    popupVisibility={popupVisibility.settings}
                    closeHandler={closePopup}
                />
                <Players
                    popupVisibility={popupVisibility.players}
                    eventType={playersData.eventType}
                    playersListType={playersData.playersListType}
                    team={playersData.playersTeam}
                    jerseyColour={playersData.jerseyColour}
                    referenceColour={playersData.referenceColour}
                    playersList={playersData.playersList}
                    captainId={playersData.captainId}
                    officialsList={playersData.officialsList}
                    suspensions={playersData.suspensions}
                    actionHandler={addActionPerTeam}
                    closeHandler={closePopup}
                    openPopup={openPopup}
                />
                <LineUp
                    popupVisibility={popupVisibility.lineUp}
                    team={lineUpData.playersTeam}
                    jerseyColour={lineUpData.jerseyColour}
                    referenceColour={lineUpData.referenceColour}
                    playersList={lineUpData.playersList}
                    captainId={lineUpData.captainId}
                    officialsList={lineUpData.officialsList}
                    closeHandler={closePopup}
                    openPopup={openPopup}
                />
            </main>
        </Fragment>
    );
}

Game.propTypes = {
    settings: PropTypes.object,
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
