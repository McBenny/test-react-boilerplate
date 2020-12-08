import React from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableRow
} from '@material-ui/core';

import { formatDate, generateId } from '../../utils/utilities';

import { messages } from './messages';
import LocalStorage from '../../utils/local-storage';
import { GAMES_PREFIX } from '../../containers/Game/constants';

function DuplicateGame({ popupVisibility, game, closeHandler }) {
    if (game) {
        const { id, date, competition, round, gender, homeTeam, awayTeam, scoreHome, scoreAway, status } = game;
        const duplicateGame = gameId => {
            const oldGameData = LocalStorage.get(gameId);
            // console.log(oldGameData);
            const newGameId = generateId();
            const newGameKey = `${GAMES_PREFIX}${newGameId}`;
            const newGameData = {
                ...oldGameData,
                gameId: newGameKey
            };
            // console.log(newGameData);
            LocalStorage.set(newGameKey, newGameData);
            // console.log('Duplicate function to be defined', gameId);
            closeHandler();
        };

        return (
            <Dialog open={popupVisibility} onClose={closeHandler} aria-labelledby="dialog-title-delete-game">
                <DialogTitle id="dialog-title-delete-game">{messages.title}</DialogTitle>
                <DialogContent>
                    <p>{messages.question}</p>
                    <TableContainer className="delete__table">
                        <Table size="small" aria-label="caption table">
                            <caption className="sr-only">{messages.caption}</caption>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" className="MuiTableCell--header">
                                        {messages.date}
                                    </TableCell>
                                    <TableCell>{formatDate(date)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" className="MuiTableCell--header">
                                        {messages.competition}
                                    </TableCell>
                                    <TableCell>{competition}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" className="MuiTableCell--header">
                                        {messages.round}
                                    </TableCell>
                                    <TableCell>{round}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" className="MuiTableCell--header">
                                        {messages.gender}
                                    </TableCell>
                                    <TableCell>{gender}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" className="MuiTableCell--header">
                                        {messages.status}
                                    </TableCell>
                                    <TableCell>{status}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <br />
                        <Table size="small" aria-labelledby="table-title-match">
                            <caption id="table-title-match" className="sr-only">
                                {messages.match}
                            </caption>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="MuiTableCell--match">
                                        {homeTeam}{' '}
                                        <span className="delete__score">
                                            {scoreHome}-{scoreAway}
                                        </span>{' '}
                                        {awayTeam}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={closeHandler}>
                        {messages.cancel}
                    </Button>
                    <Button variant="contained" onClick={() => duplicateGame(id)}>
                        {messages.confirm}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
    return '';
}
DuplicateGame.defaultProps = {
    popupVisibility: false
};

DuplicateGame.propTypes = {
    popupVisibility: PropTypes.bool,
    game: PropTypes.object.isRequired,
    closeHandler: PropTypes.func
};

export default DuplicateGame;
