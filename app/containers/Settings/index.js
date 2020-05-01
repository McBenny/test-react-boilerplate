/*
 * Game screen
 *
 * This is the main screen, at the '/game' route
 *
 */

import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { changeTeamAName, changeTeamBName, cancelChangeSettings } from './actions';
import { makeSelectTeamAName, makeSelectTeamBName } from './selectors';
import reducer from './reducer';
import { saveSettings } from '../Game/actions';

const key = 'settings';

export function Settings({
    teamAName,
    teamBName,
    onChangeTeamAName,
    onChangeTeamBName,
    onSaveSettings,
    onCloseSettings,
    setSettingsScreenVisibility,
    settingsData
}) {
    useInjectReducer({ key, reducer });

    const messages = {
        header: 'Settings',
        close: 'Close settings',
        save: 'Save settings',
        teamA: 'Home team',
        teamB: 'Visitor team'
    };

    const saveInitialisation = e => {
        e.preventDefault();
        onSaveSettings({
            teamAName,
            teamBName
        });
        setSettingsScreenVisibility(false);
    };

    const closeSettings = () => {
        onCloseSettings(settingsData);
        setSettingsScreenVisibility(false);
    };

    return (
        <Fragment>
            <h2>{messages.header}</h2>
            <form action="" onSubmit={saveInitialisation}>
                <label htmlFor="teamAName">{messages.teamA}:</label>{' '}
                <input type="text" id="teamAName" onChange={onChangeTeamAName} value={teamAName} required /> <br />
                <label htmlFor="teamBName">{messages.teamB}:</label>{' '}
                <input type="text" id="teamBName" onChange={onChangeTeamBName} value={teamBName} required /> <br />
                <button type="button" onClick={closeSettings}>
                    {messages.close}
                </button>{' '}
                <button type="submit">{messages.save}</button>
            </form>
        </Fragment>
    );
}

Settings.propTypes = {
    teamAName: PropTypes.string,
    teamBName: PropTypes.string,
    onChangeTeamAName: PropTypes.func,
    onChangeTeamBName: PropTypes.func,
    onSaveSettings: PropTypes.func,
    onCloseSettings: PropTypes.func,
    setSettingsScreenVisibility: PropTypes.func,
    settingsData: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    teamAName: makeSelectTeamAName(),
    teamBName: makeSelectTeamBName()
});

export function mapDispatchToProps(dispatch) {
    return {
        onChangeTeamAName: evt => dispatch(changeTeamAName(evt.target.value)),
        onChangeTeamBName: evt => dispatch(changeTeamBName(evt.target.value)),
        onSaveSettings: data => dispatch(saveSettings(data)),
        onCloseSettings: data => dispatch(cancelChangeSettings(data))
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(
    withConnect,
    memo
)(Settings);
