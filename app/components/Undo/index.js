import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { messages } from './messages';
import { EVENT_TYPES } from '../../containers/Game/constants';
import { handleGameStatus, removeEvent, removeTimeout, storeScore } from '../../containers/Game/actions';

function Undo({ popupVisibility, event, setATimeOut, closeHandler }) {
    const dispatch = useDispatch();
    const undoEvent = () => {
        console.log('undo!', event);

        switch (event.eventType) {
            case EVENT_TYPES.gameStart:
            case EVENT_TYPES.gameEnd:
                // console.log('Revert', event.message);
                dispatch(
                    handleGameStatus({
                        gameStarted: event.eventType === EVENT_TYPES.gameEnd,
                        gamePaused: event.eventType === EVENT_TYPES.gameStart,
                        currentPeriod: '',
                        memberType: 'Event period',
                        eventType: event.eventType,
                        id: 0
                    })
                );
                dispatch(
                    storeScore({
                        id: '',
                        currentScore: ''
                    })
                );
                dispatch(removeEvent());
                break;
            case EVENT_TYPES.periodStart:
            case EVENT_TYPES.periodEnd:
                // console.log('Revert', event.message);
                dispatch(
                    handleGameStatus({
                        gameStarted: true,
                        gamePaused: event.eventType === EVENT_TYPES.periodStart,
                        currentPeriod: '',
                        memberType: 'Event period',
                        eventType: event.eventType,
                        id: 0
                    })
                );
                dispatch(
                    storeScore({
                        id: '',
                        currentScore: ''
                    })
                );
                dispatch(removeEvent());
                break;
            case EVENT_TYPES.gamePaused:
            case EVENT_TYPES.gameResumed:
                dispatch(
                    handleGameStatus({
                        gameStarted: true,
                        gamePaused: event.eventType === EVENT_TYPES.gameResumed,
                        currentPeriod: event.id,
                        memberType: 'Event period',
                        eventType: event.eventType,
                        id: 0
                    })
                );
                dispatch(removeEvent());
                break;
            case EVENT_TYPES.timeout:
                // console.log('Revert', event.message);
                dispatch(
                    handleGameStatus({
                        gameStarted: true,
                        gamePaused: true,
                        currentPeriod: event.id,
                        memberType: 'Event period',
                        eventType: event.eventType,
                        id: 0
                    })
                );
                dispatch(removeTimeout({ team: event.team }));
                setATimeOut({
                    A: false,
                    B: false
                });
                dispatch(removeEvent());
                break;
            default:
        }
    };

    if (event !== null) {
        return (
            <Dialog open={popupVisibility} onClose={closeHandler} aria-labelledby="dialog-title-undo" maxWidth="md">
                <DialogTitle id="dialog-title-undo" disableTypography>
                    <h2 className="title">{messages.title}...</h2>
                </DialogTitle>
                <DialogContent>
                    <p>{messages.introduction}</p>
                    <p>
                        {event.icon} <strong>{event.message}</strong>
                    </p>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={closeHandler}>
                        {messages.cancel}
                    </Button>
                    <Button variant="contained" onClick={undoEvent}>
                        {messages.yes}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
    return '';
}

Undo.propTypes = {
    popupVisibility: PropTypes.bool,
    event: PropTypes.object,
    setATimeOut: PropTypes.func,
    closeHandler: PropTypes.func
};

export default Undo;
