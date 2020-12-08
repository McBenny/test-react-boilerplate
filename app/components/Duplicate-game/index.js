import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
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
import { initialState } from '../../containers/Game/reducer';

import './styles.scss';

function DuplicateGame({ popupVisibility, game, closeHandler }) {
    const DUPLICATION_TYPES = {
        full: 'full',
        initial: 'initial'
    };
    const [duplicationType, setDuplicationType] = useState(DUPLICATION_TYPES.full);

    if (game) {
        const { id, date, competition, round, gender, homeTeam, awayTeam, scoreHome, scoreAway, status } = game;
        const duplicateGame = (gameId, type) => {
            const oldGameData = LocalStorage.get(gameId);
            const newGameId = generateId();
            const newGameKey = `${GAMES_PREFIX}${newGameId}`;
            const newGameData = {
                ...oldGameData,
                gameId: newGameKey
            };
            const cleanMember = {
                blueCards: 0,
                goals: 0,
                penalty: 0,
                redCards: 0,
                suspensions: 0,
                yellowCards: 0
            };
            const { currentPeriod, currentScore, dataTeamA, dataTeamB, gamePaused, gameStarted } = initialState;
            const oldTeams = oldGameData.settings.teams;
            const newInitialGameData = {
                ...oldGameData,
                currentPeriod,
                currentScore,
                dataTeamA,
                dataTeamB,
                gameEvents: [],
                gameId: newGameKey,
                gamePaused,
                gameStarted,
                settings: {
                    ...oldGameData.settings,
                    teams: {
                        A: {
                            ...oldTeams.A,
                            officials: oldTeams.A.officials.map(member => ({
                                ...member,
                                ...cleanMember
                            })),
                            players: oldTeams.A.players.map(member => ({
                                ...member,
                                ...cleanMember
                            }))
                        },
                        B: {
                            ...oldTeams.B,
                            officials: oldTeams.B.officials.map(member => ({
                                ...member,
                                ...cleanMember
                            })),
                            players: oldTeams.B.players.map(member => ({
                                ...member,
                                ...cleanMember
                            }))
                        }
                    }
                }
            };
            LocalStorage.set(newGameKey, type === DUPLICATION_TYPES.full ? newGameData : newInitialGameData);
            closeHandler();
        };

        const handleChangeDuplicationType = event => {
            setDuplicationType(event.target.value);
        };
        return (
            <Dialog open={popupVisibility} onClose={closeHandler} aria-labelledby="dialog-title-duplicate-game">
                <DialogTitle id="dialog-title-duplicate-game">{messages.title}</DialogTitle>
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
                                    <TableCell className="MuiTableCell--match" colSpan={2} aria-label={messages.match}>
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
                    <FormControl component="fieldset" className="summary__group">
                        <h3>{messages.typeOfDuplication}</h3>
                        <RadioGroup
                            aria-label={messages.typeOfDuplication}
                            name="duplicationType"
                            value={duplicationType}
                            onChange={handleChangeDuplicationType}
                            className="summary__types"
                        >
                            <FormControlLabel
                                value={DUPLICATION_TYPES.full}
                                control={<Radio color="primary" />}
                                label={messages.duplicationTypes.full}
                            />
                            <FormControlLabel
                                value={DUPLICATION_TYPES.initial}
                                control={<Radio color="primary" />}
                                label={messages.duplicationTypes.initial}
                            />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={closeHandler}>
                        {messages.cancel}
                    </Button>
                    <Button variant="contained" onClick={() => duplicateGame(id, duplicationType)}>
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
