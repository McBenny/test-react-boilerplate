import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import nextId from 'react-id-generator';

import { List, ListItem, Button } from '@material-ui/core';
import SpeakerNotesOutlinedIcon from '@material-ui/icons/SpeakerNotesOutlined';
import SpeakerNotesOffOutlinedIcon from '@material-ui/icons/SpeakerNotesOffOutlined';

import { TEAMS_LIST } from '../../containers/Settings/constants';
import { EVENT_TYPES } from '../../containers/Game/constants';

import { messages } from './messages';
import './styles.scss';

const GameLog = ({ gameEvents, settingsData }) => {
    const [isFullLogVisible, setIsFullLogVisible] = useState(false);

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

    displayScore.propTypes = {
        isGoal: PropTypes.bool,
        scoringTeam: PropTypes.string,
        scoreA: PropTypes.number,
        scoreB: PropTypes.number
    };

    const createBuffer = (events, isLastAction) => {
        if (events.length > 0) {
            const listOfEvents = isLastAction ? [events[events.length - 1]] : events;
            return listOfEvents.map(gameEvent => {
                const htmlId = nextId();
                let template;

                const memberData = getMemberData(gameEvent);
                const formattedScore = displayScore({
                    isGoal: gameEvent.eventType === EVENT_TYPES.goal,
                    scoringTeam: gameEvent.team,
                    scoreA: gameEvent.score.teamA,
                    scoreB: gameEvent.score.teamB
                });

                switch (gameEvent.eventType) {
                    case EVENT_TYPES.gameStart:
                    case EVENT_TYPES.gameEnd:
                        template = (
                            <div className="game-log__event">
                                <div>
                                    <strong>{messages[gameEvent.eventType]}</strong>
                                </div>
                                {formattedScore}
                            </div>
                        );
                        break;

                    case EVENT_TYPES.periodEnd:
                    case EVENT_TYPES.periodStart:
                        template = (
                            <div className="game-log__event">
                                <div>
                                    <strong>
                                        {messages[gameEvent.eventType]} {messages[`period${gameEvent.id}`]}
                                    </strong>
                                </div>
                                {formattedScore}
                            </div>
                        );
                        break;

                    case EVENT_TYPES.gamePaused:
                    case EVENT_TYPES.gameResumed:
                        template = (
                            <div className="game-log__event">
                                <div>
                                    <strong>{messages[gameEvent.eventType]}</strong>
                                </div>
                            </div>
                        );
                        break;

                    case EVENT_TYPES.timeout:
                        template = (
                            <div className="game-log__event">
                                <div>
                                    {messages[`${gameEvent.eventType}For`]} {settingsData.teams[gameEvent.team].name}
                                </div>
                                {formattedScore}
                            </div>
                        );
                        break;

                    case EVENT_TYPES.yellowCard:
                    case EVENT_TYPES.redCard:
                    case EVENT_TYPES.blueCard:
                    case EVENT_TYPES.suspension:
                        template = (
                            <div className={`game-log__event game-log__event--${gameEvent.eventType.toLowerCase()}`}>
                                <div>
                                    {messages[`${gameEvent.eventType}For`]} {memberData[0].name} [
                                    <strong>{memberData[0].reference}</strong>] (
                                    {settingsData.teams[gameEvent.team].name})
                                </div>
                                {formattedScore}
                            </div>
                        );
                        break;

                    case EVENT_TYPES.goal: {
                        template = (
                            <div className="game-log__event">
                                <div>
                                    {gameEvent.penalty ? messages.penaltyFor : messages.goalFor}{' '}
                                    {settingsData.teams[gameEvent.team].name} ({memberData[0].name} [
                                    <strong>{memberData[0].reference}</strong>])
                                </div>
                                {formattedScore}
                            </div>
                        );
                        break;
                    }

                    default:
                        template = (
                            <Fragment>
                                <strong>Event:</strong> {gameEvent.eventType}
                                {gameEvent.penalty ? ' (penalty)' : ''},{' '}
                                <strong>{gameEvent.team ? 'Team:' : ''}</strong> {gameEvent.team},{' '}
                                <strong>{gameEvent.memberType ? `${gameEvent.memberType}:` : ''}</strong> {gameEvent.id}
                                {gameEvent.id}, <strong>Score:</strong> {gameEvent.score.teamA}-{gameEvent.score.teamB}
                            </Fragment>
                        );
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
                {createBuffer(gameEvents, true)}
                <ListItem key="log-displayFullLog" disableGutters className="game-log__item game-log__item--invisible">
                    <Button
                        variant="contained"
                        onClick={() => setIsFullLogVisible(!isFullLogVisible)}
                        startIcon={isFullLogVisible ? <SpeakerNotesOffOutlinedIcon /> : <SpeakerNotesOutlinedIcon />}
                    >
                        {isFullLogVisible ? messages.hideFullLog : messages.displayFullLog}
                    </Button>
                </ListItem>
            </List>
            {isFullLogVisible ? (
                <Fragment>
                    <h3>{messages.fullLog}:</h3>
                    <List component="ol" className="game-log">
                        {createBuffer(gameEvents, false)}
                    </List>
                </Fragment>
            ) : (
                ''
            )}
        </Fragment>
    ) : (
        ''
    );
};

GameLog.propTypes = {
    gameEvents: PropTypes.array,
    settingsData: PropTypes.object
};

export default GameLog;
