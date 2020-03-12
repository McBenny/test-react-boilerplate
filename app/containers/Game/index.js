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
import { changeTeamAName } from './actions';
import { makeSelectTeamAName, makeSelectTeamBName, makeSelectDate } from './selectors';
import reducer from './reducer';

const key = 'game';

export function Game({
    teamAName,
    teamBName,
    date
}) {
    useInjectReducer({ key, reducer });

    const [isInitialised, setIsInitialised] = useState(false);

    const saveInitialisation = () => {
        setIsInitialised(true);
    };

    const headerMessage = 'Game screen';
    const needSettingsMessage = 'You need to set things up.';
    const openSettings = 'Open settings...';
    return (
        <Fragment>
            {isInitialised ? (
                <Fragment>
                    <h1>All good!</h1>
                    <p>{teamAName}</p>
                    <p>{teamBName}</p>
                    <p>{date}</p>
                </Fragment>
            ) : (
                <Fragment>
                    <h1>{headerMessage}</h1>
                    <p>{needSettingsMessage}</p>
                    <button type="button" onClick={saveInitialisation}>{openSettings}</button>
                </Fragment>
            )}
        </Fragment>
    );
}

Game.propTypes = {
    teamAName: PropTypes.string,
    teamBName: PropTypes.string,
    date: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
    teamAName: makeSelectTeamAName(),
    teamBName: makeSelectTeamBName(),
    date: makeSelectDate()
});

export function mapDispatchToProps(dispatch) {
    return {
        onChangeTeamAName: evt => dispatch(changeTeamAName(evt.target.value))
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
