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
import { makeSelectDate, makeSelectSettings } from './selectors';
import reducer from './reducer';

import Settings from '../Settings';
// import { initialState as initialSettings } from '../Settings/reducer';
// import { saveSettings } from './actions';

const key = 'game';

export function Game({ settings, date }) {
    useInjectReducer({ key, reducer });

    const messages = {
        header: 'Game screen',
        settings: {
            open: 'Open settings...'
        },
        teamA: 'Home team',
        teamB: 'Visitor team'
    };

    const [settingsScreenVisibility, setSettingsScreenVisibility] = useState(false);
    const openSettings = () => {
        setSettingsScreenVisibility(true);
    };

    return (
        <Fragment>
            <h1>{messages.header}</h1>
            <p>
                {messages.teamA}: {settings.teamAName}
            </p>
            <p>
                {messages.teamB}: {settings.teamBName}
            </p>
            <p>{date}</p>
            <button type="button" onClick={openSettings}>
                {messages.settings.open}
            </button>
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
    date: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
    settings: makeSelectSettings(),
    date: makeSelectDate()
});

// export function mapDispatchToProps(dispatch) {
//     return {
//         onChangeTeamAName: evt => dispatch(changeTeamAName(evt.target.value)),
//         onChangeTeamBName: evt => dispatch(changeTeamBName(evt.target.value))
//     };
// }

const withConnect = connect(
    mapStateToProps
    // mapDispatchToProps
);

export default compose(
    withConnect,
    memo
)(Game);
