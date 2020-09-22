import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

function Countdown({ duration, isOnHold, callback }) {
    const [remainingTime, setRemainingTime] = useState(duration);
    const [isActive, setIsActive] = useState(false);

    /**
     * warningDelay:    time before the end to display a warning signal
     * unMountDelay:    time to wait before unmount after reaching 0
     * @type {{warningDelay: number, unMountDelay: number}}
     */
    const params = {
        warningDelay: 10,
        unMountDelay: 5
    };
    // const toggle = () => {
    //     setIsActive(!isActive);
    // };

    // const reset = () => {
    //     setRemainingTime(duration);
    //     setIsActive(false);
    // };

    useEffect(() => {
        let interval = null;
        if (isActive && remainingTime > 0) {
            interval = setInterval(() => {
                // eslint-disable-next-line no-shadow
                setRemainingTime(remainingTime => remainingTime - 1);
            }, 1000);
        } else {
            clearInterval(interval);
            if (isActive && callback) {
                setTimeout(callback, params.unMountDelay * 1000);
            }
        }
        return () => clearInterval(interval);
    }, [isActive, remainingTime]);

    useEffect(() => {
        setIsActive(!isOnHold);
    }, [isOnHold]);

    const displayFormatted = timeInSeconds => {
        const minutes = Math.floor(timeInSeconds / 60);
        let seconds = Math.ceil(timeInSeconds % 60);
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutes}:${seconds}`;
    };

    return (
        <span className="countdown">
            <span
                className={`countdown__remaining-time${
                    remainingTime < params.warningDelay && remainingTime !== 0
                        ? ' countdown__remaining-time--ending'
                        : ''
                }${remainingTime === 0 ? ' countdown__remaining-time--ended' : ''}`}
            >
                {displayFormatted(remainingTime)}
            </span>
        </span>
    );
}

Countdown.propTypes = {
    duration: PropTypes.number,
    isOnHold: PropTypes.bool,
    callback: PropTypes.func
};

export default Countdown;
