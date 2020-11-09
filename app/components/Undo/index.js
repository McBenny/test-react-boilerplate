import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { messages } from './messages';
import {
    EVENT_TYPES,
    REMOVE_GOAL,
    REMOVE_YELLOW_CARD,
    REMOVE_SUSPENSION,
    REMOVE_RED_CARD,
    REMOVE_BLUE_CARD
} from '../../containers/Game/constants';
import { addAction, handleGameStatus, removeEvent, removeTimeout, storeScore } from '../../containers/Game/actions';

function Undo({ popupVisibility, event, setATimeOut, closeHandler }) {
    const dispatch = useDispatch();
    const undoEvent = () => {
        switch (event.eventType) {
            case EVENT_TYPES.gameStart:
            case EVENT_TYPES.gameEnd:
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
                break;

            case EVENT_TYPES.periodStart:
            case EVENT_TYPES.periodEnd:
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
                break;

            case EVENT_TYPES.timeout:
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
                break;

            case EVENT_TYPES.goal:
            case EVENT_TYPES.yellowCard:
            case EVENT_TYPES.suspension:
            case EVENT_TYPES.redCard:
            case EVENT_TYPES.blueCard: {
                let ACTION;
                switch (event.eventType) {
                    case EVENT_TYPES.goal:
                        ACTION = REMOVE_GOAL;
                        break;
                    case EVENT_TYPES.yellowCard:
                        ACTION = REMOVE_YELLOW_CARD;
                        break;
                    case EVENT_TYPES.suspension:
                        ACTION = REMOVE_SUSPENSION;
                        break;
                    case EVENT_TYPES.redCard:
                        ACTION = REMOVE_RED_CARD;
                        break;
                    case EVENT_TYPES.blueCard:
                        ACTION = REMOVE_BLUE_CARD;
                        break;
                    default:
                }
                dispatch(
                    addAction({
                        eventType: event.eventType,
                        penalty: event.penalty,
                        type: ACTION,
                        team: event.team,
                        id: event.id,
                        memberType: event.memberType
                    })
                );
                break;
            }
            default:
        }
        dispatch(removeEvent());
        closeHandler();
    };

    if (event !== null) {
        return (
            <Dialog open={popupVisibility} onClose={closeHandler} aria-labelledby="dialog-title-undo" maxWidth="xl">
                <DialogTitle id="dialog-title-undo" disableTypography>
                    <h2 className="title title--action">{messages.title}...</h2>
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
    return <></>;
}

Undo.propTypes = {
    popupVisibility: PropTypes.bool,
    event: PropTypes.object,
    setATimeOut: PropTypes.func,
    closeHandler: PropTypes.func
};

export default Undo;
