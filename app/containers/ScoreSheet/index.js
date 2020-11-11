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

// import { URLS } from '../App/constants';
import { useInjectReducer } from '../../utils/injectReducer';
import { capitalize, formatDate } from '../../utils/utilities';

import reducer from '../Game/reducer';
import { makeSelectDate, makeSelectGameEvents, makeSelectSettings } from '../Game/selectors';

import { messages } from './messages';
import { messages as lineUpMessages } from '../../components/Line-up/messages';
import { messages as settingsMessages } from '../Settings/messages';
import './styles.scss';
import {
    EMPTY_MEMBER_DATA,
    MAX_NUMBER,
    MEMBERS_TYPES,
    MEMBERS_QUALIFICATIONS,
    TEAMS_LIST
} from '../Settings/constants';

const key = 'game';

export function ScoreSheet({ settings, date, gameEvents }) {
    useInjectReducer({ key, reducer });
    console.log('gameEvents', gameEvents);

    const formattedDate = formatDate(date);

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
                                member.id !== 0 && member.id === captainId ? ' table__cell--captain' : ''
                            }`}
                        >
                            {member.name}
                            {member.qualification === MEMBERS_QUALIFICATIONS.players.goalie
                                ? ` (${lineUpMessages.goalieInitial})`
                                : ''}
                            {member.id !== 0 && member.id === captainId ? ` (${lineUpMessages.captainInitial})` : ''}
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
    return (
        <Fragment>
            <main>
                <table className="table table--structure">
                    <thead>
                        <tr>
                            <th colSpan="4" className="table__cell table__cell--structure table__cell--header-1">
                                <h1 className="title">
                                    <span>{messages.title}</span>
                                    <span className="title title--aside">{messages.scoreSheet}</span>
                                </h1>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="table__row table__row--structure">
                            <td className="table__cell table__cell--structure">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th className="table__cell table__cell--header">
                                                {settingsMessages.teamA}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--single">
                                                {settings.teams.A.name}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td className="table__cell table__cell--structure">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th className="table__cell table__cell--header">
                                                {settingsMessages.teamB}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--single">
                                                {settings.teams.B.name}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td className="table__cell table__cell--structure">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th colSpan="3" className="table__cell table__cell--header">
                                                {messages.halfTimeResult}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half">-</td>
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half">-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td className="table__cell table__cell--structure">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th className="table__cell table__cell--header">{messages.place}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--single">.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr className="table__row table__row--structure">
                            <td className="table__cell table__cell--structure">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th className="table__cell table__cell--header">
                                                {settingsMessages.jerseyColour}
                                            </th>
                                            <th colSpan="3" className="table__cell table__cell--header">
                                                {messages.timeouts}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td
                                                className="table__cell table__cell--data table__cell--single"
                                                style={{
                                                    backgroundColor: settings.teams.A.jersey,
                                                    fontWeight: 600,
                                                    color: settings.teams.A.reference
                                                }}
                                            >
                                                ###
                                            </td>
                                            <td className="table__cell table__cell--data table__cell--single">-</td>
                                            <td className="table__cell table__cell--data table__cell--single">-</td>
                                            <td className="table__cell table__cell--data table__cell--single">-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td className="table__cell table__cell--structure">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th className="table__cell table__cell--header">
                                                {settingsMessages.jerseyColour}
                                            </th>
                                            <th colSpan="3" className="table__cell table__cell--header">
                                                {messages.timeouts}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td
                                                className="table__cell table__cell--data table__cell--single"
                                                style={{
                                                    backgroundColor: settings.teams.B.jersey,
                                                    fontWeight: 600,
                                                    color: settings.teams.B.reference
                                                }}
                                            >
                                                ###
                                            </td>
                                            <td className="table__cell table__cell--data table__cell--single">-</td>
                                            <td className="table__cell table__cell--data table__cell--single">-</td>
                                            <td className="table__cell table__cell--data table__cell--single">-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td className="table__cell table__cell--structure">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th colSpan="3" className="table__cell table__cell--header">
                                                {messages.fullTimeResult}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half">-</td>
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half">-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td className="table__cell table__cell--structure">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th className="table__cell table__cell--header">{messages.venue}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--single">.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr className="table__row table__row--structure">
                            <td colSpan="2" rowSpan="2" className="table__cell table__cell--structure">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th className="table__cell table__cell--header" />
                                            <th className="table__cell table__cell--header">{messages.officials}</th>
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
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th colSpan="3" className="table__cell table__cell--header">
                                                {messages.extraTimeResult}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half">-</td>
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half">-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td className="table__cell table__cell--structure">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th className="table__cell table__cell--header">{messages.date}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--single">
                                                {formattedDate}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr className="table__row table__row--structure">
                            <td className="table__cell table__cell--structure table__cell--bottom">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th colSpan="3" className="table__cell table__cell--header">
                                                {messages.afterPenaltiesResult}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half">-</td>
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half">-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td className="table__cell table__cell--structure table__cell--bottom">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th className="table__cell table__cell--header">{messages.time}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--single">.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr className="table__row table__row--structure">
                            <td colSpan="2" className="table__cell table__cell--structure">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th
                                                className="table__cell table__cell--header"
                                                title={settingsMessages.playersReference}
                                            >
                                                {messages.shortNumber}
                                            </th>
                                            <th className="table__cell table__cell--header">
                                                {settingsMessages.teamA}
                                                {messages.players}
                                            </th>
                                            <th className="table__cell table__cell--header">{lineUpMessages.goals}</th>
                                            <th
                                                className="table__cell table__cell--header"
                                                title={capitalize(lineUpMessages.sorting_yellowCards)}
                                            >
                                                Y
                                            </th>
                                            <th
                                                className="table__cell table__cell--header"
                                                title={capitalize(lineUpMessages.sorting_suspensions)}
                                            >
                                                2
                                            </th>
                                            <th
                                                className="table__cell table__cell--header"
                                                title={capitalize(lineUpMessages.sorting_redCards)}
                                            >
                                                R
                                            </th>
                                            <th
                                                className="table__cell table__cell--header"
                                                title={capitalize(lineUpMessages.sorting_blueCards)}
                                            >
                                                B
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>{listMembers(TEAMS_LIST.HOME, MEMBERS_TYPES.players)}</tbody>
                                </table>
                            </td>
                            <td rowSpan="4" className="table__cell table__cell--structure">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th
                                                className="table__cell table__cell--header"
                                                title={`${settingsMessages.teamA}: ${
                                                    settings.teams[TEAMS_LIST.HOME].name
                                                }`}
                                            >
                                                {messages.initialTeamA}
                                            </th>
                                            <th colSpan="3" className="table__cell table__cell--header">
                                                {messages.score}
                                            </th>
                                            <th
                                                className="table__cell table__cell--header"
                                                title={`${settingsMessages.teamB}: ${
                                                    settings.teams[TEAMS_LIST.AWAY].name
                                                }`}
                                            >
                                                {messages.initialTeamB}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td rowSpan="4" className="table__cell table__cell--structure">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th
                                                className="table__cell table__cell--header"
                                                title={`${settingsMessages.teamA}: ${
                                                    settings.teams[TEAMS_LIST.HOME].name
                                                }`}
                                            >
                                                {messages.initialTeamA}
                                            </th>
                                            <th colSpan="3" className="table__cell table__cell--header">
                                                {messages.score}
                                            </th>
                                            <th
                                                className="table__cell table__cell--header"
                                                title={`${settingsMessages.teamB}: ${
                                                    settings.teams[TEAMS_LIST.AWAY].name
                                                }`}
                                            >
                                                {messages.initialTeamB}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr className="table__row table__row--structure">
                            <td colSpan="2" className="table__cell table__cell--structure">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th
                                                className="table__cell table__cell--header"
                                                title={settingsMessages.officialsReference}
                                            >
                                                {messages.shortNumber}
                                            </th>
                                            <th className="table__cell table__cell--header">
                                                {settingsMessages.teamA} {messages.officials}
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
                                            <th
                                                className="table__cell table__cell--header"
                                                title={capitalize(lineUpMessages.sorting_redCards)}
                                            >
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
                                    <tbody>{listMembers(TEAMS_LIST.HOME, MEMBERS_TYPES.officials)}</tbody>
                                </table>
                            </td>
                        </tr>
                        <tr className="table__row table__row--structure">
                            <td colSpan="2" className="table__cell table__cell--structure">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th
                                                className="table__cell table__cell--header"
                                                title={settingsMessages.playersReference}
                                            >
                                                {messages.shortNumber}
                                            </th>
                                            <th className="table__cell table__cell--header">
                                                {settingsMessages.teamB} {messages.players}
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
                                            <th
                                                className="table__cell table__cell--header"
                                                title={capitalize(lineUpMessages.sorting_redCards)}
                                            >
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
                                    <tbody>{listMembers(TEAMS_LIST.AWAY, MEMBERS_TYPES.players)}</tbody>
                                </table>
                            </td>
                        </tr>
                        <tr className="table__row table__row--structure">
                            <td colSpan="2" className="table__cell table__cell--structure">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th
                                                className="table__cell table__cell--header"
                                                title={settingsMessages.officialsReference}
                                            >
                                                {messages.shortNumber}
                                            </th>
                                            <th className="table__cell table__cell--header">
                                                {settingsMessages.teamB} {messages.officials}
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
                                            <th
                                                className="table__cell table__cell--header"
                                                title={capitalize(lineUpMessages.sorting_redCards)}
                                            >
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
                                    <tbody>{listMembers(TEAMS_LIST.AWAY, MEMBERS_TYPES.officials)}</tbody>
                                </table>
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
    date: PropTypes.string,
    gameEvents: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
    settings: makeSelectSettings(),
    date: makeSelectDate(),
    gameEvents: makeSelectGameEvents()
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(ScoreSheet);
