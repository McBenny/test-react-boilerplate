import React from 'react';
import PropTypes from 'prop-types';
import { messages } from './messages';
import { EVENT_TYPES, PERIODS } from '../../containers/Game/constants';
import { isEven } from '../../utils/utilities';

function PlayPause({ popupManagement, gameStarted, gamePaused, period, startHandler }) {
    // TODO: make this a common function
    const closePopIn = () => {
        const { setPopupVisibility, popupVisibility } = popupManagement;
        setPopupVisibility({ ...popupVisibility, playPause: false });
    };

    const startButton = () => {
        if (!gameStarted) {
            const handleStartButton = () => {
                startHandler({
                    gamePauseStatus: gamePaused,
                    eventType: EVENT_TYPES.gameStart,
                    id: period,
                    period: period + 1
                });
                closePopIn();
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
                closePopIn();
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
                closePopIn();
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
                closePopIn();
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
                closePopIn();
            };
            return (
                <button type="button" onClick={handleEndButton}>
                    {messages.endGame}
                </button>
            );
        }
        return false;
    };

    const cancelButton = (
        <button type="button" onClick={closePopIn}>
            {messages.cancel}
        </button>
    );

    return (
        <React.Fragment>
            <h2 className="title title--2">{messages.title}</h2>
            <ul>
                <li>{startButton()}</li>
                <li>{pauseResumeButton()}</li>
                <li>{endPeriodButton()}</li>
                <li>{startPeriodButton()}</li>
                <li>{endGameButton()}</li>
                <li>{cancelButton}</li>
            </ul>
            <button type="button" onClick={closePopIn}>
                {messages.close}
            </button>
        </React.Fragment>
    );
}

PlayPause.propTypes = {
    popupManagement: PropTypes.object,
    gameStarted: PropTypes.bool,
    gamePaused: PropTypes.bool,
    period: PropTypes.number,
    startHandler: PropTypes.func
};

export default PlayPause;
