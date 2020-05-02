/*
 * Game screen
 *
 * This is the main screen, at the '/game' route
 *
 */

import React, { Fragment, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import {
    makeSelectDate,
    makeSelectSettings,
    makeSelectGameStarted,
    makeSelectGamePaused,
    makeSelectDataTeamA,
    makeSelectDataTeamB
} from './selectors';
import reducer from './reducer';
import { handleGameStatus } from './actions';

import Settings from '../Settings';

const key = 'game';

export function Game({ settings, date, gameStarted, gamePaused, onHandleGameStatus, dataTeamA, dataTeamB }) {
    useInjectReducer({ key, reducer });

    const messages = {
        header: 'Game screen',
        settings: {
            open: 'Open settings...'
        },
        startButton: {
            start: 'Start game',
            pause: 'Pause game',
            resume: 'Resume game'
        },
        teamA: 'Home team',
        teamB: 'Visitor team'
    };

    const [settingsScreenVisibility, setSettingsScreenVisibility] = useState(false);
    const openSettings = () => {
        setSettingsScreenVisibility(true);
    };

    const handleStartButton = () => {
        onHandleGameStatus({
            gameStarted: true,
            gamePaused: !gamePaused
        });
    };

    const displayStartButtonMessage = () => {
        if (gameStarted) {
            return gamePaused ? messages.startButton.resume : messages.startButton.pause;
        }
        return messages.startButton.start;
    };

    return (
        <Fragment>
            <h1 className="title title--1">{messages.header}</h1>
            <ul>
                <li>
                    <button type="button" onClick={openSettings}>
                        {messages.settings.open}
                    </button>
                </li>
                <li>
                    <button type="button" onClick={handleStartButton}>
                        {displayStartButtonMessage()}
                    </button>
                </li>
                <li>
                    Score: {dataTeamA.score} - {dataTeamB.score}
                </li>
            </ul>
            <p>
                {messages.teamA}: {settings.teamAName}
            </p>
            <p>
                {messages.teamB}: {settings.teamBName}
            </p>
            <p>{date}</p>
            {settingsScreenVisibility ? (
                <Settings setSettingsScreenVisibility={setSettingsScreenVisibility} settingsData={settings} />
            ) : (
                ''
            )}
        </Fragment>
    );
}

Game.propTypes = {
    settings: PropTypes.object,
    date: PropTypes.string,
    gameStarted: PropTypes.bool,
    gamePaused: PropTypes.bool,
    onHandleGameStatus: PropTypes.func,
    dataTeamA: PropTypes.object,
    dataTeamB: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    settings: makeSelectSettings(),
    date: makeSelectDate(),
    gameStarted: makeSelectGameStarted(),
    gamePaused: makeSelectGamePaused(),
    dataTeamA: makeSelectDataTeamA(),
    dataTeamB: makeSelectDataTeamB()
});

export function mapDispatchToProps(dispatch) {
    return {
        onHandleGameStatus: data => dispatch(handleGameStatus(data))
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(
    withConnect,
    memo
)(Game);
