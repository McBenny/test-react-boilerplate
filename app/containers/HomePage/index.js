/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import {
    Button,
    IconButton,
    Paper,
    Snackbar,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableSortLabel
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined';
import WcIcon from '@material-ui/icons/Wc';

import { SESSION_KEY, URLS } from '../App/constants';
import { EVENT_TYPES, GAMES_PREFIX, POPUPS } from '../Game/constants';
import LocalStorage from '../../utils/local-storage';
import { generateId, formatDate, printResponsiveLabels } from '../../utils/utilities';

import DeleteGame from '../../components/Delete-game';
import DuplicateGame from '../../components/Duplicate-game';

import { messages } from './messages';
import './styles.scss';
import scoreboardSample from '../../images/score-board-sample.png';

const gamePrefix = /^game-uuid-[a-z0-9-]{36}$/g;
const createGameList = () => {
    const localKeys = Object.keys(localStorage);
    const buffer = [];
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
            buffer.push(
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
    return buffer;
};
let gamesList = createGameList();

function createData(id, date, competition, round, gender, homeTeam, scoreHome, scoreAway, awayTeam, status) {
    return { id, date, competition, round, gender, homeTeam, scoreHome, scoreAway, awayTeam, status };
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

function printParagraphs(text) {
    if (text && Array.isArray(text)) {
        // eslint-disable-next-line react/no-danger
        return text.map(paragraph => <p key={uuidv4()} dangerouslySetInnerHTML={{ __html: paragraph }} />);
    }
    return '';
}

const POSITIONS = {
    left: 'left',
    center: 'center',
    right: 'right'
};
const headCells = [
    { id: 'date', numeric: POSITIONS.center, disablePadding: false, label: messages.date },
    { id: 'competition', numeric: POSITIONS.left, disablePadding: false, label: messages.competition },
    { id: 'round', numeric: POSITIONS.center, disablePadding: false, label: messages.round },
    { id: 'gender', numeric: POSITIONS.center, disablePadding: false, label: <WcIcon /> },
    { id: 'homeTeam', numeric: POSITIONS.right, disablePadding: false, label: messages.homeTeam },
    { id: 'score', numeric: POSITIONS.center, disablePadding: false, label: messages.score, notSortable: true },
    { id: 'awayTeam', numeric: POSITIONS.left, disablePadding: false, label: messages.awayTeam },
    { id: 'status', numeric: POSITIONS.center, disablePadding: false, label: messages.status },
    { id: 'action', numeric: POSITIONS.center, disablePadding: false, label: messages.actions, notSortable: true }
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
                        align={headCell.numeric}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {!headCell.notSortable ? (
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                                title={typeof headCell.label !== 'string' ? messages[headCell.id] : undefined}
                            >
                                {printResponsiveLabels(headCell.label)}
                                {orderBy === headCell.id ? (
                                    <span className="sr-only">
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                        ) : (
                            printResponsiveLabels(headCell.label)
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
        sessionStorage.setItem(SESSION_KEY, gameKey);
        window.location.href = URLS.game;
    };

    const [gameToDelete, setGameToDelete] = useState(null);
    useEffect(() => {
        if (gameToDelete !== null) {
            openPopup(POPUPS.deleteGame);
        }
    }, [gameToDelete]);

    const [gameToDuplicate, setGameToDuplicate] = useState(null);
    useEffect(() => {
        if (gameToDuplicate !== null) {
            openPopup(POPUPS.duplicateGame);
        }
    }, [gameToDuplicate]);

    const [snackStatus, setSnackStatus] = useState({ show: false });
    const closeSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackStatus({
            show: false
        });
    };

    const loadGame = gameKey => {
        sessionStorage.setItem(SESSION_KEY, gameKey);
        window.location.href = URLS.game;
    };

    // Popups management
    const popupsInitialState = {
        deleteGame: false,
        duplicateGame: false
    };

    const [popupVisibility, setPopupVisibility] = useState(popupsInitialState);
    const openPopup = popup => {
        setPopupVisibility({ ...popupsInitialState, [popup]: true });
    };
    const validLocalKeys = Object.keys(localStorage).filter(key => key.match(gamePrefix));
    const closePopup = () => {
        setGameToDelete(null);
        setGameToDuplicate(null);
        setPopupVisibility({ ...popupsInitialState });

        // Update table of games
        const newValidLocalKeys = Object.keys(localStorage).filter(key => key.match(gamePrefix));
        if (validLocalKeys.length !== newValidLocalKeys.length) {
            const snackContent =
                validLocalKeys.length < newValidLocalKeys.length ? POPUPS.duplicateGame : POPUPS.deleteGame;
            gamesList = createGameList();
            setSnackStatus({
                content: snackContent,
                show: true
            });
        }
    };

    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('date');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const [bins, setBin] = useState({});
    return (
        <Fragment>
            <main>
                <h1 className="title title--1">{messages.title}</h1>
                <div className="game-list__container">
                    <Button
                        variant="contained"
                        className="button button--image game-list__button game-list__button--new-game"
                        onClick={createGame}
                        aria-label={messages.createGame}
                        title={messages.createGame}
                    >
                        <img src={scoreboardSample} alt={messages.imageSample} style={{ maxWidth: '300px' }} />
                    </Button>
                    <h2 id="homeTitle">{messages.createGame}</h2>
                    {printParagraphs(messages.introText)}
                    <p>
                        <Button variant="contained" color="primary" onClick={createGame}>
                            {messages.createGame}
                        </Button>
                    </p>
                </div>
                <div className="game-list__container">
                    <h2 id="gameListTitle">
                        {messages.savedGames} {gamesList.length > 0 ? `(${gamesList.length})` : ''}
                    </h2>
                </div>
                {gamesList.length > 0 ? (
                    <>
                        <Paper className="game-list__container">
                            <TableContainer>
                                <Table size="small" aria-label="caption table" className="home__table">
                                    <caption>{messages.caption}</caption>
                                    <EnhancedTableHead
                                        order={order}
                                        orderBy={orderBy}
                                        onRequestSort={handleRequestSort}
                                    />
                                    <TableBody>
                                        {stableSort(gamesList, getComparator(order, orderBy)).map(game => (
                                            <TableRow
                                                key={game.id}
                                                onClick={() => loadGame(game.id)}
                                                className="game-list__row game-list__row--clickable"
                                                title={messages.clickToSeeGame}
                                            >
                                                <TableCell align="center">{formatDate(game.date)}</TableCell>
                                                <TableCell>{game.competition}</TableCell>
                                                <TableCell align="center">{game.round}</TableCell>
                                                <TableCell align="center">{game.gender}</TableCell>
                                                <TableCell align="right">{game.homeTeam}</TableCell>
                                                <TableCell align="center">
                                                    {game.scoreHome}-{game.scoreAway}
                                                </TableCell>
                                                <TableCell>{game.awayTeam}</TableCell>
                                                <TableCell align="center">{game.status}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton
                                                        color="inherit"
                                                        onClick={e => {
                                                            e.stopPropagation();
                                                            setGameToDuplicate(game);
                                                        }}
                                                        arial-label={messages.duplicate}
                                                        title={messages.duplicate}
                                                        size="small"
                                                    >
                                                        <PostAddOutlinedIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton
                                                        color="inherit"
                                                        onClick={e => {
                                                            e.stopPropagation();
                                                            setGameToDelete(game);
                                                        }}
                                                        onMouseOver={
                                                            !bins[game.id]
                                                                ? () => setBin({ ...bins, [game.id]: true })
                                                                : () => {}
                                                        }
                                                        onFocus={
                                                            !bins[game.id]
                                                                ? () => setBin({ ...bins, [game.id]: true })
                                                                : () => {}
                                                        }
                                                        onMouseOut={
                                                            bins[game.id]
                                                                ? () => setBin({ ...bins, [game.id]: false })
                                                                : () => {}
                                                        }
                                                        onBlur={
                                                            bins[game.id]
                                                                ? () => setBin({ ...bins, [game.id]: false })
                                                                : () => {}
                                                        }
                                                        arial-label={messages.delete}
                                                        title={messages.delete}
                                                        size="small"
                                                    >
                                                        {bins[game.id] ? (
                                                            <DeleteForeverOutlinedIcon fontSize="small" />
                                                        ) : (
                                                            <DeleteOutlinedIcon fontSize="small" />
                                                        )}
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                        {popupVisibility.deleteGame ? (
                            <DeleteGame
                                popupVisibility={popupVisibility.deleteGame}
                                game={gameToDelete}
                                closeHandler={closePopup}
                            />
                        ) : (
                            ''
                        )}
                        {popupVisibility.duplicateGame ? (
                            <DuplicateGame
                                popupVisibility={popupVisibility.duplicateGame}
                                game={gameToDuplicate}
                                closeHandler={closePopup}
                            />
                        ) : (
                            ''
                        )}
                        <Snackbar
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                            open={snackStatus.show}
                            autoHideDuration={4000}
                            onClose={closeSnackBar}
                        >
                            <MuiAlert elevation={6} variant="filled" onClose={closeSnackBar}>
                                {snackStatus.content === POPUPS.deleteGame
                                    ? messages.deleteConfirmation
                                    : messages.duplicateConfirmation}
                            </MuiAlert>
                        </Snackbar>
                    </>
                ) : (
                    <div className="game-list__container">
                        <p>{messages.noGames}</p>
                    </div>
                )}
            </main>
        </Fragment>
    );
}
