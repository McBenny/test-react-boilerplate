/*
 * Score sheet
 *
 * This a reproduction of the paper score sheets, at the '/score-sheet' route
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { v4 as uuidv4 } from 'uuid';

import { useInjectReducer } from '../../utils/injectReducer';
import { capitalize, formatDate } from '../../utils/utilities';

import reducer from '../Game/reducer';
import {
    makeSelectGameEvents,
    makeSelectScore,
    makeSelectDataTeamA,
    makeSelectDataTeamB,
    makeSelectSettings
} from '../Game/selectors';

import { messages } from './messages';
import { messages as lineUpMessages } from '../../components/Line-up/messages';
import { messages as settingsMessages } from '../Settings/messages';
import './styles.scss';
import {
    EMPTY_MEMBER_DATA,
    MAX_NUMBER,
    MEMBERS_TYPES,
    MEMBERS_QUALIFICATIONS,
    TEAMS_LIST,
    GENDERS
} from '../Settings/constants';
import { EVENT_TYPES, PERIODS } from '../Game/constants';

const key = 'game';

export function ScoreSheet({ settings, currentScore, dataTeamA, dataTeamB, gameEvents }) {
    useInjectReducer({ key, reducer });

    const formattedDate = formatDate(settings.date);

    const displayTeamInfo = team => {
        if (team) {
            return (
                <table className="table table--data" summary={settingsMessages[`team${team}`]}>
                    <thead>
                        <tr>
                            <th className="table__cell table__cell--header">{settingsMessages[`team${team}`]}</th>
                            <th className="table__cell table__cell--header">{settingsMessages.jerseyColour}</th>
                            <th colSpan="3" className="table__cell table__cell--header">
                                {messages.timeouts}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="table__cell table__cell--data table__cell--single">
                                {settings.teams[team].name}
                            </td>
                            <td
                                className="table__cell table__cell--data table__cell--single"
                                style={{
                                    backgroundColor: settings.teams[team].jersey,
                                    fontWeight: 600,
                                    color: settings.teams[team].reference
                                }}
                            >
                                ###
                            </td>
                            <td className="table__cell table__cell--data table__cell--single">
                                {/* eslint-disable indent */}
                                {/* eslint-disable-next-line no-nested-ternary */}
                                {team === TEAMS_LIST.HOME
                                    ? dataTeamA.timeouts > 0
                                        ? 'X'
                                        : '-'
                                    : dataTeamB.timeouts > 0
                                    ? 'X'
                                    : '-'}
                                {/* eslint-enable indent */}
                            </td>
                            <td className="table__cell table__cell--data table__cell--single">
                                {/* eslint-disable indent */}
                                {/* eslint-disable-next-line no-nested-ternary */}
                                {team === TEAMS_LIST.HOME
                                    ? dataTeamA.timeouts > 1
                                        ? 'X'
                                        : '-'
                                    : dataTeamB.timeouts > 1
                                    ? 'X'
                                    : '-'}
                                {/* eslint-enable indent */}
                            </td>
                            <td className="table__cell table__cell--data table__cell--single">
                                {/* eslint-disable indent */}
                                {/* eslint-disable-next-line no-nested-ternary */}
                                {team === TEAMS_LIST.HOME
                                    ? dataTeamA.timeouts > 2
                                        ? 'X'
                                        : '-'
                                    : dataTeamB.timeouts > 2
                                    ? 'X'
                                    : '-'}
                                {/* eslint-enable indent */}
                            </td>
                        </tr>
                    </tbody>
                </table>
            );
        }
        return false;
    };

    const getScore = (score, team) => {
        const [scoreA, scoreB] = score.split('-');
        return team === TEAMS_LIST.HOME ? scoreA || '-' : scoreB || '-';
    };

    const displayResult = (title, data) => (
        <table className="table table--data" summary={title}>
            <thead>
                <tr>
                    <th colSpan="3" className="table__cell table__cell--header">
                        {title}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="table__cell table__cell--data table__cell--half">
                        {getScore(data, TEAMS_LIST.HOME)}
                    </td>
                    <td className="table__cell table__cell--data table__cell--colon">:</td>
                    <td className="table__cell table__cell--data table__cell--half">
                        {getScore(data, TEAMS_LIST.AWAY)}
                    </td>
                </tr>
            </tbody>
        </table>
    );

    const displaySingleInfo = (title, data) => (
        <table className="table table--data" summary={title}>
            <thead>
                <tr>
                    <th className="table__cell table__cell--header">{title}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="table__cell table__cell--data table__cell--single">{data}</td>
                </tr>
            </tbody>
        </table>
    );

    const listMembers = (team, memberType) => {
        const members = settings.teams[team][memberType];
        const captainId = settings.teams[team].captain;
        const maxMembers =
            memberType === MEMBERS_TYPES.players && members[0] && members[0].reference === ''
                ? MAX_NUMBER[memberType] + 1
                : MAX_NUMBER[memberType];
        for (let i = members.length; i < maxMembers; i += 1) {
            members.push(EMPTY_MEMBER_DATA);
        }
        return members.map(member => {
            if (member.id !== 0 || member.goals > 0) {
                return (
                    <tr key={uuidv4()}>
                        <td className="table__cell table__cell--data table__cell--line-head">{member.reference}</td>
                        <td
                            className={`table__cell table__cell--data${
                                memberType === MEMBERS_TYPES.players && member.id !== 0 && member.id === captainId
                                    ? ' table__cell--captain'
                                    : ''
                            }`}
                        >
                            {member.name}
                            {member.qualification === MEMBERS_QUALIFICATIONS.players.goalie
                                ? ` (${lineUpMessages.goalieInitial})`
                                : ''}
                            {memberType === MEMBERS_TYPES.players && member.id !== 0 && member.id === captainId
                                ? ` (${lineUpMessages.captainInitial})`
                                : ''}
                        </td>
                        <td className="table__cell table__cell--data table__cell--member">{member.goals || ''}</td>
                        <td className="table__cell table__cell--data table__cell--member">
                            {member.yellowCards ? 'X' : ''}
                        </td>
                        <td className="table__cell table__cell--data table__cell--member">
                            {member.suspensions || ''}
                        </td>
                        <td className="table__cell table__cell--data table__cell--member">
                            {member.redCards ? 'X' : ''}
                        </td>
                        <td className="table__cell table__cell--data table__cell--member">
                            {member.blueCards ? 'X' : ''}
                        </td>
                    </tr>
                );
            }
            return false;
        });
    };

    const displayPlayersList = (team, dataTeam) => (
        <table className="table table--data" summary={`${settingsMessages[`team${team}`]} ${messages.players}`}>
            <thead>
                <tr>
                    <th className="table__cell table__cell--header" title={settingsMessages.playersReference}>
                        {messages.shortNumber}
                    </th>
                    <th className="table__cell table__cell--header">
                        {settingsMessages[`team${team}`]} {messages.players}
                    </th>
                    <th className="table__cell table__cell--header">{lineUpMessages.goals}</th>
                    <th
                        className="table__cell table__cell--header"
                        title={capitalize(lineUpMessages.sorting_yellowCards)}
                    >
                        {messages.initialYellowCards}
                    </th>
                    <th
                        className="table__cell table__cell--header"
                        title={capitalize(lineUpMessages.sorting_suspensions)}
                    >
                        {messages.initialSuspensions}
                    </th>
                    <th className="table__cell table__cell--header" title={capitalize(lineUpMessages.sorting_redCards)}>
                        {messages.initialRedCards}
                    </th>
                    <th
                        className="table__cell table__cell--header"
                        title={capitalize(lineUpMessages.sorting_blueCards)}
                    >
                        {messages.initialBlueCards}
                    </th>
                </tr>
            </thead>
            <tbody>
                {listMembers(team, MEMBERS_TYPES.players)}
                <tr>
                    <td colSpan="2" className="table__cell table__cell--data table__cell--total-label">
                        {messages.total}
                    </td>
                    <td className="table__cell table__cell--data table__cell--total">{dataTeam.goals || ''}</td>
                    <td className="table__cell table__cell--data table__cell--total">{dataTeam.yellowCards || ''}</td>
                    <td className="table__cell table__cell--data table__cell--total">{dataTeam.suspensions || ''}</td>
                    <td className="table__cell table__cell--data table__cell--total">{dataTeam.redCards || ''}</td>
                    <td className="table__cell table__cell--data table__cell--total">{dataTeam.blueCards || ''}</td>
                </tr>
            </tbody>
        </table>
    );

    const displayOfficialsList = team => (
        <table className="table table--data" summary={`${settingsMessages.teamA} ${messages.officials}`}>
            <thead>
                <tr>
                    <th className="table__cell table__cell--header" title={settingsMessages.officialsReference}>
                        {messages.shortNumber}
                    </th>
                    <th className="table__cell table__cell--header">
                        {settingsMessages[`team${team}`]} {messages.officials}
                    </th>
                    <th className="table__cell table__cell--header">{messages.signature}</th>
                    <th
                        className="table__cell table__cell--header"
                        title={capitalize(lineUpMessages.sorting_yellowCards)}
                    >
                        {messages.initialYellowCards}
                    </th>
                    <th
                        className="table__cell table__cell--header"
                        title={capitalize(lineUpMessages.sorting_suspensions)}
                    >
                        {messages.initialSuspensions}
                    </th>
                    <th className="table__cell table__cell--header" title={capitalize(lineUpMessages.sorting_redCards)}>
                        {messages.initialRedCards}
                    </th>
                    <th
                        className="table__cell table__cell--header"
                        title={capitalize(lineUpMessages.sorting_blueCards)}
                    >
                        {messages.initialBlueCards}
                    </th>
                </tr>
            </thead>
            <tbody>{listMembers(team, MEMBERS_TYPES.officials)}</tbody>
        </table>
    );

    const listGoals = () => {
        const tempBuffer = gameEvents.map(event => {
            if (event.eventType === EVENT_TYPES.goal) {
                const player = settings.teams[event.team].players.filter(member => member.id === event.id);
                const penalty = event.penalty ? `(${messages.initialPenalty})` : '';
                const playerA = event.team === TEAMS_LIST.HOME ? `${penalty} ${player[0].reference || '?'}` : '';
                const playerB = event.team === TEAMS_LIST.AWAY ? `${player[0].reference || '?'} ${penalty}` : '';
                return (
                    <tr key={uuidv4()}>
                        <td
                            className={`table__cell table__cell--data table__cell--half${
                                event.team === TEAMS_LIST.HOME ? ' table__cell--acting-team' : ''
                            }${event.team === TEAMS_LIST.HOME && event.missed ? ' table__cell--missed' : ''}`}
                        >
                            {playerA}
                        </td>
                        <td
                            className={`table__cell table__cell--data table__cell--half${
                                event.team === TEAMS_LIST.HOME && !event.missed ? ' table__cell--acting-team' : ''
                            }`}
                        >
                            {event.score.teamA}
                        </td>
                        <td className="table__cell table__cell--data table__cell--colon">:</td>
                        <td
                            className={`table__cell table__cell--data table__cell--half${
                                event.team === TEAMS_LIST.AWAY && !event.missed ? ' table__cell--acting-team' : ''
                            }`}
                        >
                            {event.score.teamB}
                        </td>
                        <td
                            className={`table__cell table__cell--data table__cell--half${
                                event.team === TEAMS_LIST.AWAY ? ' table__cell--acting-team' : ''
                            }${event.team === TEAMS_LIST.HOME && event.missed ? ' table__cell--missed' : ''}`}
                        >
                            {playerB}
                        </td>
                    </tr>
                );
            }
            // Case: full game or end of second extra half time
            if (event.id === 4 || (event.id === 7 && event.eventType === EVENT_TYPES.periodEnd)) {
                return (
                    <tr key={uuidv4()}>
                        <td colSpan="5" className="table__cell table__cell--data table__cell--break">
                            {messages.endGame}
                        </td>
                    </tr>
                );
            }
            if (event.eventType === EVENT_TYPES.periodStart) {
                return (
                    <tr key={uuidv4()}>
                        <td colSpan="5" className="table__cell table__cell--data table__cell--break">
                            {PERIODS[event.id]}
                        </td>
                    </tr>
                );
            }
            return false;
        });
        // Cleaning meaningless events
        const buffer = tempBuffer.filter(item => item !== false);

        // Adding empty rows to align/finish the table
        for (let i = buffer.length; i < 94; i += 1) {
            buffer.push(
                <tr key={uuidv4()}>
                    <td className="table__cell table__cell--data" />
                    <td className="table__cell table__cell--data" />
                    <td className="table__cell table__cell--data table__cell--colon">:</td>
                    <td className="table__cell table__cell--data" />
                    <td className="table__cell table__cell--data" />
                </tr>
            );
        }
        const halfwayThrough = Math.ceil(buffer.length / 2);
        const firstHalf = buffer.slice(0, halfwayThrough);
        const secondHalf = buffer.slice(halfwayThrough, buffer.length);
        return {
            firstHalf,
            secondHalf
        };
    };
    const goalTables = listGoals();

    const displayGoalsList = part => (
        <table className="table table--data" summary={messages.goalsList}>
            <thead>
                <tr>
                    <th
                        className="table__cell table__cell--header"
                        title={`${settingsMessages.teamA}: ${settings.teams[TEAMS_LIST.HOME].name}`}
                    >
                        {messages.initialTeamA}
                    </th>
                    <th colSpan="3" className="table__cell table__cell--header">
                        {messages.score}
                    </th>
                    <th
                        className="table__cell table__cell--header"
                        title={`${settingsMessages.teamB}: ${settings.teams[TEAMS_LIST.AWAY].name}`}
                    >
                        {messages.initialTeamB}
                    </th>
                </tr>
            </thead>
            <tbody>{part}</tbody>
        </table>
    );

    return (
        <Fragment>
            <main>
                <h1 className="score-sheet__title">
                    <span>{settings.competition}</span>
                    <div className="score-sheet__title-details">
                        {settings.round !== '' ? (
                            <span>
                                {settingsMessages.round} {settings.round}
                            </span>
                        ) : (
                            ''
                        )}
                        {settings.gender !== '' ? <span>{GENDERS[settings.gender]}</span> : ''}
                    </div>
                </h1>
                <table className="table table--structure" role="presentation">
                    <tbody>
                        <tr className="table__row table__row--structure">
                            <td className="table__cell table__cell--structure table__cell--structure-1">
                                {displayTeamInfo(TEAMS_LIST.HOME)}
                            </td>
                            <td className="table__cell table__cell--structure">
                                {displayResult(messages.halfTimeResult, currentScore.half1)}
                            </td>
                            <td className="table__cell table__cell--structure">
                                {displaySingleInfo(messages.place, settings.place)}
                            </td>
                        </tr>
                        <tr className="table__row table__row--structure">
                            <td className="table__cell table__cell--structure">{displayTeamInfo(TEAMS_LIST.AWAY)}</td>
                            <td className="table__cell table__cell--structure">
                                {displayResult(messages.fullTimeResult, currentScore.half3)}
                            </td>
                            <td className="table__cell table__cell--structure">
                                {displaySingleInfo(messages.venue, settings.venue)}
                            </td>
                        </tr>
                        <tr className="table__row table__row--structure">
                            <td rowSpan="2" className="table__cell table__cell--structure">
                                <table className="table table--data" summary={messages.officials}>
                                    <thead>
                                        <tr>
                                            <th className="table__cell table__cell--header" />
                                            <th className="table__cell table__cell--header">{messages.Officials}</th>
                                            <th className="table__cell table__cell--header">{messages.signature}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="table__row table__row--data">
                                            <td
                                                className="table__cell table__cell--data table__cell--line-head"
                                                title={capitalize(settingsMessages.referee1)}
                                            >
                                                {messages.initialReferee1}
                                            </td>
                                            <td className="table__cell table__cell--data">{settings.referee1}</td>
                                            <td className="table__cell table__cell--data" />
                                        </tr>
                                        <tr>
                                            <td
                                                className="table__cell table__cell--data table__cell--line-head"
                                                title={capitalize(settingsMessages.referee2)}
                                            >
                                                {messages.initialReferee2}
                                            </td>
                                            <td className="table__cell table__cell--data">{settings.referee2}</td>
                                            <td className="table__cell table__cell--data" />
                                        </tr>
                                        <tr>
                                            <td
                                                className="table__cell table__cell--data table__cell--line-head"
                                                title={capitalize(settingsMessages.scoreKeeper)}
                                            >
                                                {messages.initialScoreKeeper}
                                            </td>
                                            <td className="table__cell table__cell--data">{settings.scoreKeeper}</td>
                                            <td className="table__cell table__cell--data" />
                                        </tr>
                                        <tr>
                                            <td
                                                className="table__cell table__cell--data table__cell--line-head"
                                                title={capitalize(settingsMessages.timeKeeper)}
                                            >
                                                {messages.initialTimeKeeper}
                                            </td>
                                            <td className="table__cell table__cell--data">{settings.timeKeeper}</td>
                                            <td className="table__cell table__cell--data" />
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td className="table__cell table__cell--structure">
                                {displayResult(messages.extraHalfTimeResult, currentScore.half5)}
                            </td>
                            <td className="table__cell table__cell--structure">
                                {displaySingleInfo(messages.date, formattedDate)}
                            </td>
                        </tr>
                        <tr className="table__row table__row--structure">
                            <td className="table__cell table__cell--structure table__cell--bottom">
                                {displayResult(messages.fullExtraTimeResult, currentScore.half7)}
                            </td>
                            <td className="table__cell table__cell--structure table__cell--bottom">
                                {displaySingleInfo(messages.time, settings.time)}
                            </td>
                        </tr>
                        <tr className="table__row table__row--structure">
                            <td className="table__cell table__cell--structure">
                                {displayPlayersList(TEAMS_LIST.HOME, dataTeamA)}
                            </td>
                            <td rowSpan="4" className="table__cell table__cell--structure">
                                {displayGoalsList(goalTables.firstHalf)}
                            </td>
                            <td rowSpan="4" className="table__cell table__cell--structure">
                                {displayGoalsList(goalTables.secondHalf)}
                            </td>
                        </tr>
                        <tr className="table__row table__row--structure">
                            <td className="table__cell table__cell--structure">
                                {displayOfficialsList(TEAMS_LIST.HOME)}
                            </td>
                        </tr>
                        <tr className="table__row table__row--structure">
                            <td className="table__cell table__cell--structure">
                                {displayPlayersList(TEAMS_LIST.AWAY, dataTeamB)}
                            </td>
                        </tr>
                        <tr className="table__row table__row--structure">
                            <td className="table__cell table__cell--structure">
                                {displayOfficialsList(TEAMS_LIST.AWAY)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </main>
        </Fragment>
    );
}

ScoreSheet.propTypes = {
    settings: PropTypes.object,
    currentScore: PropTypes.object,
    dataTeamA: PropTypes.object,
    dataTeamB: PropTypes.object,
    gameEvents: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
    settings: makeSelectSettings(),
    currentScore: makeSelectScore(),
    dataTeamA: makeSelectDataTeamA(),
    dataTeamB: makeSelectDataTeamB(),
    gameEvents: makeSelectGameEvents()
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(ScoreSheet);
