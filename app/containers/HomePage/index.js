/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableSortLabel
} from '@material-ui/core';

import { URLS } from '../App/constants';
import { EVENT_TYPES, GAMES_PREFIX } from '../Game/constants';
import LocalStorage from '../../utils/local-storage';
import { generateId, formatDate } from '../../utils/utilities';

import { messages } from './messages';
import './styles.scss';

function createData(id, date, competition, round, gender, homeTeam, scoreHome, scoreAway, awayTeam, status) {
    return { id, date, competition, round, gender, homeTeam, scoreHome, scoreAway, awayTeam, status };
}

const gamesList = [];
const localKeys = Object.keys(localStorage);
const gamePrefix = /^game-uuid-[a-z0-9-]{36}$/g;
for (let i = 0; i < localKeys.length; i += 1) {
    if (localKeys[i].match(gamePrefix)) {
        const game = LocalStorage.get(localKeys[i]);
        let matchStatus = messages.notStarted;
        if (game.gameEvents.length > 0) {
            const lastEvent = game.gameEvents[game.gameEvents.length - 1];
            switch (lastEvent.eventType) {
                case EVENT_TYPES.gamePaused:
                    matchStatus = messages.gamePaused;
                    break;
                case EVENT_TYPES.periodEnd:
                    matchStatus = lastEvent.id === 7 ? messages.fullTime : messages.halfTime;
                    break;
                case EVENT_TYPES.gameEnd:
                    matchStatus = messages.fullTime;
                    break;
                default:
                    matchStatus = messages.inProgress;
            }
        }
        gamesList.push(
            createData(
                game.gameId,
                game.settings.date || game.date,
                game.settings.competition,
                game.settings.round,
                game.settings.gender,
                game.settings.teams.A.name,
                game.dataTeamA.goals,
                game.dataTeamB.goals,
                game.settings.teams.B.name,
                matchStatus
            )
        );
    }
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

const headCells = [
    { id: 'date', numeric: true, disablePadding: false, label: messages.date },
    { id: 'competition', numeric: false, disablePadding: false, label: messages.competition },
    { id: 'round', numeric: true, disablePadding: false, label: messages.round },
    { id: 'gender', numeric: true, disablePadding: false, label: messages.gender },
    { id: 'homeTeam', numeric: false, disablePadding: false, label: messages.homeTeam },
    { id: 'score', numeric: false, disablePadding: false, label: messages.score, notSortable: true },
    { id: 'awayTeam', numeric: false, disablePadding: false, label: messages.awayTeam },
    { id: 'status', numeric: false, disablePadding: false, label: messages.status }
];

const EnhancedTableHead = ({ order, orderBy, onRequestSort }) => {
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'center' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {!headCell.notSortable ? (
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <span className="sr-only">
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                        ) : (
                            headCell.label
                        )}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

EnhancedTableHead.propTypes = {
    order: PropTypes.string,
    orderBy: PropTypes.string,
    onRequestSort: PropTypes.func
};

export default function HomePage() {
    const createGame = () => {
        const gameId = generateId();
        const gameKey = `${GAMES_PREFIX}${gameId}`;
        LocalStorage.set(gameKey, '');
        sessionStorage.setItem('gameId', gameKey);
        window.location.href = URLS.game;
    };

    const loadGame = gameKey => {
        sessionStorage.setItem('gameId', gameKey);
        window.location.href = URLS.game;
    };

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('date');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <Fragment>
            <main>
                <h1 className="title title--1">{messages.title}</h1>
                <Button variant="contained" color="primary" onClick={createGame}>
                    {messages.createGame}
                </Button>

                <h2 id="gameListTitle">{messages.savedGames}</h2>
                <Paper className="game-list__container">
                    <TableContainer>
                        <Table size="small" aria-label="caption table">
                            <caption>{messages.caption}</caption>
                            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                            <TableBody>
                                {stableSort(gamesList, getComparator(order, orderBy)).map(game => (
                                    <TableRow key={game.id} onClick={() => loadGame(game.id)}>
                                        <TableCell align="center">{formatDate(game.date)}</TableCell>
                                        <TableCell>{game.competition}</TableCell>
                                        <TableCell align="center">{game.round}</TableCell>
                                        <TableCell align="center">{game.gender}</TableCell>
                                        <TableCell align="right">{game.homeTeam}</TableCell>
                                        <TableCell align="center">
                                            {game.scoreHome}-{game.scoreAway}
                                        </TableCell>
                                        <TableCell>{game.awayTeam}</TableCell>
                                        <TableCell>{game.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </main>
        </Fragment>
    );
}
