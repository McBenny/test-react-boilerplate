import React from 'react';
import PropTypes from 'prop-types';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button
} from '@material-ui/core';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';

import { EVENT_TYPES, PERIODS } from '../../containers/Game/constants';
import { isEven } from '../../utils/utilities';

import { messages } from './messages';

function PlayPause({ popupVisibility, gameStarted, gamePaused, period, startHandler, closeHandler }) {
    const handleStartButton = () => {
        startHandler({
            gamePauseStatus: gamePaused,
            eventType: EVENT_TYPES.gameStart,
            id: period,
            period: period + 1
        });
        closeHandler();
    };

    const handlePauseResumeButton = () => {
        startHandler({
            gamePauseStatus: gamePaused,
            eventType: gamePaused ? EVENT_TYPES.gameResumed : EVENT_TYPES.gamePaused,
            id: period,
            period
        });
        closeHandler();
    };

    const handleEndPeriodButton = () => {
        startHandler({
            gameStatus: period !== 7,
            gamePauseStatus: false,
            eventType: EVENT_TYPES.periodEnd,
            id: period,
            period: period + 1
        });
        closeHandler();
    };

    const handleStartPeriodButton = () => {
        startHandler({
            gamePauseStatus: true,
            eventType: EVENT_TYPES.periodStart,
            id: period + 1,
            period: period + 1
        });
        closeHandler();
    };

    const handleEndButton = () => {
        startHandler({
            gameStatus: false,
            gamePauseStatus: false,
            eventType: EVENT_TYPES.gameEnd,
            id: period,
            period: period + 1
        });
        closeHandler();
    };

    return (
        <Dialog open={popupVisibility} onClose={closeHandler} aria-labelledby="dialog-title-play-pause">
            <DialogTitle id="dialog-title-play-pause">{messages.title}</DialogTitle>
            <DialogContent>
                <List component="nav" aria-label="Actions regarding periods">
                    {!gameStarted ? (
                        <ListItem button onClick={handleStartButton}>
                            <ListItemIcon>
                                <PlayCircleOutlineIcon />
                            </ListItemIcon>
                            <ListItemText primary={messages.start} />
                        </ListItem>
                    ) : (
                        ''
                    )}
                    {gameStarted && !isEven(period) ? (
                        <ListItem button onClick={handlePauseResumeButton}>
                            <ListItemIcon>
                                {gamePaused ? <PlayCircleOutlineIcon /> : <PauseCircleOutlineIcon />}
                            </ListItemIcon>
                            <ListItemText primary={gamePaused ? messages.resume : messages.pause} />
                        </ListItem>
                    ) : (
                        ''
                    )}
                    {gameStarted && !isEven(period) ? (
                        <ListItem button onClick={handleEndPeriodButton}>
                            <ListItemIcon>
                                <HighlightOffOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={`${messages.endPeriod} ${PERIODS[period]}`} />
                        </ListItem>
                    ) : (
                        ''
                    )}
                    {gameStarted && isEven(period) ? (
                        <ListItem button onClick={handleStartPeriodButton}>
                            <ListItemIcon>
                                <PlayCircleOutlineIcon />
                            </ListItemIcon>
                            <ListItemText primary={`${messages.startPeriod} ${PERIODS[period + 1]}`} />
                        </ListItem>
                    ) : (
                        ''
                    )}
                    {gameStarted && (period === 3 || period === 7) ? (
                        <ListItem button onClick={handleEndButton}>
                            <ListItemIcon>
                                <HighlightOffOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={messages.endGame} />
                        </ListItem>
                    ) : (
                        ''
                    )}
                </List>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={closeHandler}>
                    {messages.cancel}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

PlayPause.propTypes = {
    popupVisibility: PropTypes.bool,
    gameStarted: PropTypes.bool,
    gamePaused: PropTypes.bool,
    period: PropTypes.number,
    startHandler: PropTypes.func,
    closeHandler: PropTypes.func
};

export default PlayPause;
