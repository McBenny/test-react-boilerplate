/*
 * Score sheet
 *
 * This a reproduction of the paper score sheets, at the '/score-sheet' route
 *
 */

import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';

// import { URLS } from '../App/constants';

import { messages } from './messages';
import './styles.scss';

export function ScoreSheet() {
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
                        {/**/}
                        {/* Line 1 */}
                        {/**/}
                        <tr className="table__row table__row--structure">
                            <td className="table__cell table__cell--structure">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th className="table__cell table__cell--header">Team A</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--single">UTS</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td className="table__cell table__cell--structure">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th className="table__cell table__cell--header">Team B</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--single">
                                                Harbourside
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
                                                Half-time result
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half">10</td>
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half">9</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td className="table__cell table__cell--structure">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th className="table__cell table__cell--header">Place</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--single">
                                                Sydney NSW
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        {/**/}
                        {/* Line 2 */}
                        {/**/}
                        <tr className="table__row table__row--structure">
                            <td className="table__cell table__cell--structure">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th className="table__cell table__cell--header">Colour</th>
                                            <th colSpan="3" className="table__cell table__cell--header">
                                                Timeouts
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--single">White</td>
                                            <td className="table__cell table__cell--data table__cell--single">14:35</td>
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
                                            <th className="table__cell table__cell--header">Colour</th>
                                            <th colSpan="3" className="table__cell table__cell--header">
                                                Timeouts
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--single">Green</td>
                                            <td className="table__cell table__cell--data table__cell--single">25:05</td>
                                            <td className="table__cell table__cell--data table__cell--single">10:47</td>
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
                                                Full time result
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half">17</td>
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half">36</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td className="table__cell table__cell--structure">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th className="table__cell table__cell--header">Venue</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--single">
                                                Sydney Boys HS
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        {/**/}
                        {/* Line 3 */}
                        {/**/}
                        <tr className="table__row table__row--structure">
                            <td colSpan="2" rowSpan="2" className="table__cell table__cell--structure">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th className="table__cell table__cell--header" />
                                            <th className="table__cell table__cell--header">Officials</th>
                                            <th className="table__cell table__cell--header">Signature</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="table__row table__row--data">
                                            <td className="table__cell table__cell--data table__cell--line-head">R1</td>
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head">R2</td>
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head">SK</td>
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head">TK</td>
                                            <td className="table__cell table__cell--data" />
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
                                                Extra time result
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
                                            <th className="table__cell table__cell--header">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--single">
                                                26/09/2020
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        {/**/}
                        {/* Line 4 */}
                        {/**/}
                        <tr className="table__row table__row--structure">
                            <td className="table__cell table__cell--structure table__cell--bottom">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th colSpan="3" className="table__cell table__cell--header">
                                                After penalties result
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
                                            <th className="table__cell table__cell--header">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--single">21:20</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        {/**/}
                        {/* Line 5 */}
                        {/**/}
                        <tr className="table__row table__row--structure">
                            <td colSpan="2" className="table__cell table__cell--structure">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th className="table__cell table__cell--header">No</th>
                                            <th className="table__cell table__cell--header">Team A Players</th>
                                            <th className="table__cell table__cell--header">Goals</th>
                                            <th className="table__cell table__cell--header">Y</th>
                                            <th className="table__cell table__cell--header">2</th>
                                            <th className="table__cell table__cell--header">R</th>
                                            <th className="table__cell table__cell--header">B</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head">26</td>
                                            <td className="table__cell table__cell--data">Ben Adam</td>
                                            <td className="table__cell table__cell--data">4</td>
                                            <td className="table__cell table__cell--data">1</td>
                                            <td className="table__cell table__cell--data">1</td>
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td
                                                colSpan="2"
                                                className="table__cell table__cell--data table__cell--total-label"
                                            >
                                                Total
                                            </td>
                                            <td className="table__cell table__cell--data table__cell--total" />
                                            <td className="table__cell table__cell--data table__cell--total" />
                                            <td className="table__cell table__cell--data table__cell--total" />
                                            <td className="table__cell table__cell--data table__cell--total" />
                                            <td className="table__cell table__cell--data table__cell--total" />
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td rowSpan="4" className="table__cell table__cell--structure">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th className="table__cell table__cell--header">A</th>
                                            <th colSpan="3" className="table__cell table__cell--header">
                                                Score
                                            </th>
                                            <th className="table__cell table__cell--header">B</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half">26</td>
                                            <td className="table__cell table__cell--data table__cell--half">1</td>
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half">0</td>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--half" />
                                            <td className="table__cell table__cell--data table__cell--half">1</td>
                                            <td className="table__cell table__cell--data table__cell--colon">:</td>
                                            <td className="table__cell table__cell--data table__cell--half">1</td>
                                            <td className="table__cell table__cell--data table__cell--half">14</td>
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
                                            <th className="table__cell table__cell--header">A</th>
                                            <th colSpan="3" className="table__cell table__cell--header">
                                                Score
                                            </th>
                                            <th className="table__cell table__cell--header">B</th>
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
                        {/**/}
                        {/* Line 6 */}
                        {/**/}
                        <tr className="table__row table__row--structure">
                            <td colSpan="2" className="table__cell table__cell--structure">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th className="table__cell table__cell--header">No</th>
                                            <th className="table__cell table__cell--header">Team A Officials</th>
                                            <th className="table__cell table__cell--header">Signature</th>
                                            <th className="table__cell table__cell--header">Y</th>
                                            <th className="table__cell table__cell--header">2</th>
                                            <th className="table__cell table__cell--header">R</th>
                                            <th className="table__cell table__cell--header">B</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head">A</td>
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head">B</td>
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head">C</td>
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head">D</td>
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        {/**/}
                        {/* Line 7 */}
                        {/**/}
                        <tr className="table__row table__row--structure">
                            <td colSpan="2" className="table__cell table__cell--structure">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th className="table__cell table__cell--header">No</th>
                                            <th className="table__cell table__cell--header">Team B Players</th>
                                            <th className="table__cell table__cell--header">Goals</th>
                                            <th className="table__cell table__cell--header">Y</th>
                                            <th className="table__cell table__cell--header">2</th>
                                            <th className="table__cell table__cell--header">R</th>
                                            <th className="table__cell table__cell--header">B</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data">.</td>
                                        </tr>
                                        <tr>
                                            <td
                                                colSpan="2"
                                                className="table__cell table__cell--data table__cell--total-label"
                                            >
                                                Total
                                            </td>
                                            <td className="table__cell table__cell--data table__cell--total" />
                                            <td className="table__cell table__cell--data table__cell--total" />
                                            <td className="table__cell table__cell--data table__cell--total" />
                                            <td className="table__cell table__cell--data table__cell--total" />
                                            <td className="table__cell table__cell--data table__cell--total" />
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        {/**/}
                        {/* Line 8 */}
                        {/**/}
                        <tr className="table__row table__row--structure">
                            <td colSpan="2" className="table__cell table__cell--structure">
                                <table className="table table--data">
                                    <thead>
                                        <tr>
                                            <th className="table__cell table__cell--header">No</th>
                                            <th className="table__cell table__cell--header">Team B Officials</th>
                                            <th className="table__cell table__cell--header">Signature</th>
                                            <th className="table__cell table__cell--header">Y</th>
                                            <th className="table__cell table__cell--header">2</th>
                                            <th className="table__cell table__cell--header">R</th>
                                            <th className="table__cell table__cell--header">B</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head">A</td>
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head">B</td>
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head">C</td>
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                        </tr>
                                        <tr>
                                            <td className="table__cell table__cell--data table__cell--line-head">D</td>
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                            <td className="table__cell table__cell--data" />
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </main>
        </Fragment>
    );
}

// ScoreSheet.propTypes = {
// };

export default ScoreSheet;
