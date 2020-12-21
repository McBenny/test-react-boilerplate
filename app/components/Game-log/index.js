import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import nextId from 'react-id-generator';

import { List, ListItem, Button } from '@material-ui/core';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import Filter2OutlinedIcon from '@material-ui/icons/Filter2Outlined';
import Filter7OutlinedIcon from '@material-ui/icons/Filter7Outlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SpeakerNotesOffOutlinedIcon from '@material-ui/icons/SpeakerNotesOffOutlined';
import SpeakerNotesOutlinedIcon from '@material-ui/icons/SpeakerNotesOutlined';
import SportsSoccerOutlinedIcon from '@material-ui/icons/SportsSoccerOutlined';
import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined';
import UndoIcon from '@material-ui/icons/Undo';

import { printResponsiveLabels } from '../../utils/utilities';

import { TEAMS_LIST } from '../../containers/Settings/constants';
import { EVENT_TYPES, POPUPS } from '../../containers/Game/constants';

import { messages } from './messages';

import Undo from '../Undo';

import './styles.scss';
import { URLS } from '../../containers/App/constants';

const GameLog = ({ popupVisibility, gameEvents, settingsData, setATimeOut, openHandler, closeHandler }) => {
    const [isFullLogVisible, setIsFullLogVisible] = useState(false);

    const goToScoreSheetHandler = () => {
        window.open(URLS.scoreSheet, '_blank');
    };

    const getMemberData = event => {
        if (event.memberType !== 'Event period' && event.eventType !== 'timeOut') {
            return settingsData.teams[event.team][event.memberType].filter(member => member.id === event.id);
        }
        return null;
    };

    const displayScore = ({ isGoal, scoringTeam, scoreA, scoreB }) => {
        if (isGoal) {
            return (
                <div className="game-log__score">
                    <span
                        className={`game-log__goals${scoringTeam === TEAMS_LIST.HOME ? ' game-log__goals--added' : ''}`}
                    >
                        {scoreA}
                    </span>
                    -
                    <span
                        className={`game-log__goals${scoringTeam === TEAMS_LIST.AWAY ? ' game-log__goals--added' : ''}`}
                    >
                        {scoreB}
                    </span>
                </div>
            );
        }
        return (
            <div className="game-log__score">
                <span className="game-log__goals">{scoreA}</span>-<span className="game-log__goals">{scoreB}</span>
            </div>
        );
    };

    const [undoData, setUndoData] = useState(null);
    const UndoButton = ({ event, icon, message }) => (
        <Button
            variant="contained"
            size="small"
            onClick={() => setUndoData({ ...event, icon, message })}
            className="game-log__button"
            startIcon={<UndoIcon />}
        >
            {messages.undo}
        </Button>
    );

    UndoButton.propTypes = {
        event: PropTypes.object.isRequired,
        icon: PropTypes.any,
        message: PropTypes.string.isRequired
    };

    // Opens Undo popup
    useEffect(() => {
        if (undoData !== null) {
            openHandler(POPUPS.undo);
        }
    }, [undoData]);

    // Erases undo data when popup is closed
    useEffect(() => {
        if (popupVisibility.undo === false) {
            setUndoData(null);
        }
    }, [popupVisibility.undo]);

    displayScore.propTypes = {
        isGoal: PropTypes.bool,
        scoringTeam: PropTypes.string,
        scoreA: PropTypes.number,
        scoreB: PropTypes.number
    };

    /**
     * If paused and next event is a timeout OR resumed and previous event is a Timeout,
     * then clean the entry.
     */
    const cleanEventsList = events =>
        events.filter(
            (event, index) =>
                (event.eventType !== EVENT_TYPES.gamePaused && event.eventType !== EVENT_TYPES.gameResumed) ||
                (event.eventType === EVENT_TYPES.gamePaused &&
                    (!events[index + 1] || events[index + 1].eventType !== EVENT_TYPES.timeout)) ||
                (event.eventType === EVENT_TYPES.gameResumed && events[index - 1].eventType !== EVENT_TYPES.timeout)
        );
    const cleanedEvents = cleanEventsList(gameEvents);

    const createBuffer = (events, isLastAction) => {
        if (events.length > 0) {
            const listOfEvents = isLastAction ? [events[events.length - 1]] : events;
            return listOfEvents.map((gameEvent, index) => {
                const htmlId = nextId();
                let template;

                const memberData = getMemberData(gameEvent);
                const formattedScore = displayScore({
                    isGoal: gameEvent.eventType === EVENT_TYPES.goal && !gameEvent.missed,
                    scoringTeam: gameEvent.team,
                    scoreA: gameEvent.score.teamA,
                    scoreB: gameEvent.score.teamB
                });

                switch (gameEvent.eventType) {
                    case EVENT_TYPES.gameStart:
                    case EVENT_TYPES.gameEnd: {
                        const icon =
                            gameEvent.eventType === EVENT_TYPES.gameStart ? (
                                <PlayCircleOutlineIcon />
                            ) : (
                                <HighlightOffOutlinedIcon />
                            );
                        const message1 = messages[gameEvent.eventType];
                        template = (
                            <div className="game-log__event">
                                <div>
                                    {icon} <strong>{message1}</strong>
                                </div>
                                {formattedScore}
                                {index === events.length - 1 && (
                                    <UndoButton event={gameEvent} icon={icon} message={message1} />
                                )}
                            </div>
                        );
                        break;
                    }

                    case EVENT_TYPES.periodEnd:
                    case EVENT_TYPES.periodStart: {
                        const icon =
                            gameEvent.eventType === EVENT_TYPES.periodStart ? (
                                <PlayCircleOutlineIcon />
                            ) : (
                                <PauseCircleOutlineIcon />
                            );
                        const message1 = messages[gameEvent.eventType];
                        const message2 = messages[`period${gameEvent.id}`];
                        template = (
                            <div className="game-log__event">
                                <div>
                                    <strong>
                                        {icon} {message1} {message2}
                                    </strong>
                                </div>
                                {formattedScore}
                                {index === events.length - 1 && (
                                    <UndoButton event={gameEvent} icon={icon} message={`${message1} ${message2}`} />
                                )}
                            </div>
                        );
                        break;
                    }

                    case EVENT_TYPES.gamePaused:
                    case EVENT_TYPES.gameResumed: {
                        const icon =
                            gameEvent.eventType === EVENT_TYPES.gameResumed ? (
                                <PlayCircleOutlineIcon />
                            ) : (
                                <PauseCircleOutlineIcon />
                            );
                        const message1 = messages[gameEvent.eventType];
                        template = (
                            <div className="game-log__event">
                                <div>
                                    {icon} <strong>{message1}</strong>
                                </div>
                                {index === events.length - 1 && (
                                    <UndoButton event={gameEvent} icon={icon} message={message1} />
                                )}
                            </div>
                        );
                        break;
                    }

                    case EVENT_TYPES.timeout: {
                        const icon = <TimerOutlinedIcon />;
                        const message1 = messages[`${gameEvent.eventType}For`];
                        const message2 = settingsData.teams[gameEvent.team].name;
                        template = (
                            <div className="game-log__event">
                                <div>
                                    {icon} {`${message1} ${message2}`}
                                </div>
                                {formattedScore}
                                {index === events.length - 1 && (
                                    <UndoButton event={gameEvent} icon={icon} message={`${message1} ${message2}`} />
                                )}
                            </div>
                        );
                        break;
                    }

                    case EVENT_TYPES.yellowCard:
                    case EVENT_TYPES.redCard:
                    case EVENT_TYPES.blueCard:
                    case EVENT_TYPES.suspension: {
                        const icon =
                            gameEvent.eventType === EVENT_TYPES.suspension ? (
                                <Filter2OutlinedIcon />
                            ) : (
                                <InsertDriveFileOutlinedIcon />
                            );
                        const message1 = `${messages[`${gameEvent.eventType}For`]} ${memberData[0].name} [`;
                        const message2 = memberData[0].reference;
                        const message3 = `] (${settingsData.teams[gameEvent.team].name})`;
                        template = (
                            <div className={`game-log__event game-log__event--${gameEvent.eventType.toLowerCase()}`}>
                                <div>
                                    {icon} {message1}
                                    <strong>{message2}</strong>
                                    {message3}
                                </div>
                                {formattedScore}
                                {index === events.length - 1 && (
                                    <UndoButton
                                        event={gameEvent}
                                        icon={icon}
                                        message={`${message1}${message2}${message3}`}
                                    />
                                )}
                            </div>
                        );
                        break;
                    }

                    case EVENT_TYPES.goal: {
                        const icon1 = !gameEvent.missed ? <SportsSoccerOutlinedIcon /> : <></>;
                        const icon2 = gameEvent.penalty ? (
                            <>
                                {gameEvent.missed ? <CancelOutlinedIcon /> : <></>} <Filter7OutlinedIcon />
                            </>
                        ) : (
                            <></>
                        );
                        // eslint-disable-next-line no-nested-ternary
                        const message1 = gameEvent.penalty
                            ? gameEvent.missed
                                ? messages.missedPenaltyFor
                                : messages.penaltyFor
                            : messages.goalFor;
                        const message2 = `${settingsData.teams[gameEvent.team].name} (${memberData[0].name} [`;
                        const message3 = memberData[0].reference;
                        const message4 = `])`;
                        template = (
                            <div className="game-log__event">
                                <div>
                                    {icon1} {icon2} {message1} {message2}
                                    <strong>{message3}</strong>
                                    {message4}
                                </div>
                                {formattedScore}
                                {index === events.length - 1 && (
                                    <UndoButton
                                        event={gameEvent}
                                        icon={!gameEvent.missed ? icon1 : icon2}
                                        message={`${message1} ${message2}${message3}${message4}`}
                                    />
                                )}
                            </div>
                        );
                        break;
                    }

                    default:
                }
                return (
                    <ListItem
                        key={htmlId}
                        disableGutters
                        className={`game-log__item game-log__item--${gameEvent.eventType}`}
                        divider={gameEvent.eventType === EVENT_TYPES.periodEnd}
                    >
                        {template}
                    </ListItem>
                );
            });
        }
        return '';
    };

    return gameEvents.length > 0 ? (
        <Fragment>
            <h2>{messages.title}</h2>
            <h3>{messages.lastAction}:</h3>
            <List component="ol" className="game-log" start={gameEvents.length}>
                {createBuffer(cleanedEvents, true)}
                <ListItem key="log-displayFullLog" disableGutters className="game-log__item game-log__item--invisible">
                    <Button
                        variant="contained"
                        onClick={() => setIsFullLogVisible(!isFullLogVisible)}
                        startIcon={isFullLogVisible ? <SpeakerNotesOffOutlinedIcon /> : <SpeakerNotesOutlinedIcon />}
                    >
                        {isFullLogVisible
                            ? printResponsiveLabels(messages.hideFullLog)
                            : printResponsiveLabels(messages.displayFullLog)}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => goToScoreSheetHandler()}
                        startIcon={<AssignmentOutlinedIcon />}
                        style={{ float: 'right' }}
                    >
                        {printResponsiveLabels(messages.displayScoreSheet)}
                    </Button>
                </ListItem>
            </List>
            {isFullLogVisible ? (
                <Fragment>
                    <h3>{messages.fullLog}:</h3>
                    <List component="ol" className="game-log">
                        {createBuffer(cleanedEvents, false)}
                    </List>
                </Fragment>
            ) : (
                ''
            )}
            <Undo
                popupVisibility={popupVisibility.undo}
                event={undoData}
                setATimeOut={setATimeOut}
                closeHandler={closeHandler}
            />
        </Fragment>
    ) : (
        ''
    );
};

GameLog.defaultProps = {
    popupVisibility: false
};

GameLog.propTypes = {
    popupVisibility: PropTypes.object,
    gameEvents: PropTypes.array.isRequired,
    settingsData: PropTypes.object,
    setATimeOut: PropTypes.func.isRequired,
    openHandler: PropTypes.func.isRequired,
    closeHandler: PropTypes.func.isRequired
};

export default GameLog;
