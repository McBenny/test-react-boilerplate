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

import LocalStorage from '../../utils/local-storage';
import { formatDate } from '../../utils/utilities';
import { SESSION_KEY } from '../../containers/App/constants';

import { messages } from './messages';
import './styles.scss';

function DeleteGame({ popupVisibility, game, closeHandler }) {
    if (game) {
        const { id, date, competition, round, gender, homeTeam, awayTeam, scoreHome, scoreAway, status } = game;
        const deleteGame = gameId => {
            LocalStorage.remove(gameId);
            sessionStorage.removeItem(SESSION_KEY);
            closeHandler();
        };

        return (
            <Dialog open={popupVisibility} onClose={closeHandler} aria-labelledby="dialog-title-delete-game">
                <DialogTitle id="dialog-title-delete-game">{messages.title}</DialogTitle>
                <DialogContent>
                    <p>{messages.question}</p>
                    <TableContainer className="summary__table">
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
                                    <TableCell className="MuiTableCell--match" colSpan={2}>
                                        {homeTeam}{' '}
                                        <span className="summary__score">
                                            {scoreHome}-{scoreAway}
                                        </span>{' '}
                                        {awayTeam}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" className="MuiTableCell--header">
                                        {messages.status}
                                    </TableCell>
                                    <TableCell>{status}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <p className="text text--error">
                        <strong>{messages.warning}</strong>
                        <br />
                        {messages.warningText}
                    </p>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={closeHandler}>
                        {messages.cancel}
                    </Button>
                    <Button variant="contained" onClick={() => deleteGame(id)}>
                        {messages.confirm}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
    return '';
}
DeleteGame.defaultProps = {
    popupVisibility: false
};

DeleteGame.propTypes = {
    popupVisibility: PropTypes.bool,
    game: PropTypes.object.isRequired,
    closeHandler: PropTypes.func
};

export default DeleteGame;
