import React from 'react';
import PropTypes from 'prop-types';
import { messages } from './messages';
import { EVENT_TYPES, PERIODS, POPUPS } from '../../containers/Game/constants';
import { isEven } from '../../utils/utilities';
import Modal, { cancelButton } from '../modal';

function PlayPause({ gameStarted, gamePaused, period, startHandler, closeHandler }) {
    const popup = POPUPS.playPause;

    const startButton = () => {
        if (!gameStarted) {
            const handleStartButton = () => {
                startHandler({
                    gamePauseStatus: gamePaused,
                    eventType: EVENT_TYPES.gameStart,
                    id: period,
                    period: period + 1
                });
                closeHandler(popup);
            };
            return (
                <button type="button" onClick={handleStartButton}>
                    {messages.start}
                </button>
            );
        }
        return false;
    };

    const pauseResumeButton = () => {
        if (gameStarted && !isEven(period)) {
            const handlePauseResumeButton = () => {
                startHandler({
                    gamePauseStatus: gamePaused,
                    eventType: gamePaused ? EVENT_TYPES.gameResumed : EVENT_TYPES.gamePaused,
                    id: period,
                    period
                });
                closeHandler(popup);
            };
            return (
                <button type="button" onClick={handlePauseResumeButton}>
                    {gamePaused ? messages.resume : messages.pause}
                </button>
            );
        }
        return false;
    };

    const endPeriodButton = () => {
        if (gameStarted && !isEven(period)) {
            const handlePauseResumeButton = () => {
                startHandler({
                    gameStatus: period !== 7,
                    gamePauseStatus: false,
                    eventType: EVENT_TYPES.periodEnd,
                    id: period,
                    period: period + 1
                });
                closeHandler(popup);
            };
            return (
                <button type="button" onClick={handlePauseResumeButton}>
                    {messages.endPeriod} {PERIODS[period]}
                </button>
            );
        }
        return false;
    };

    const startPeriodButton = () => {
        if (gameStarted && isEven(period)) {
            const handlePauseResumeButton = () => {
                startHandler({
                    gamePauseStatus: true,
                    eventType: EVENT_TYPES.periodStart,
                    id: period + 1,
                    period: period + 1
                });
                closeHandler(popup);
            };
            return (
                <button type="button" onClick={handlePauseResumeButton}>
                    {messages.startPeriod} {PERIODS[period + 1]}
                </button>
            );
        }
        return false;
    };

    const endGameButton = () => {
        if (gameStarted && (period === 3 || period === 7)) {
            const handleEndButton = () => {
                startHandler({
                    gameStatus: false,
                    gamePauseStatus: false,
                    eventType: EVENT_TYPES.gameEnd,
                    id: period,
                    period: period + 1
                });
                closeHandler(popup);
            };
            return (
                <button type="button" onClick={handleEndButton}>
                    {messages.endGame}
                </button>
            );
        }
        return false;
    };

    return (
        <Modal title={messages.title} closeHandler={closeHandler} popup={popup}>
            <ul>
                <li>{startButton()}</li>
                <li>{pauseResumeButton()}</li>
                <li>{endPeriodButton()}</li>
                <li>{startPeriodButton()}</li>
                <li>{endGameButton()}</li>
                <li>{cancelButton(closeHandler, popup)}</li>
            </ul>
        </Modal>
    );
}

PlayPause.propTypes = {
    gameStarted: PropTypes.bool,
    gamePaused: PropTypes.bool,
    period: PropTypes.number,
    startHandler: PropTypes.func,
    closeHandler: PropTypes.func
};

export default PlayPause;
