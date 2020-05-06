import React from 'react';
import PropTypes from 'prop-types';
import { ADD_GOAL, UNKNOWN_PLAYER } from '../../containers/Game/constants';
import { compareValues } from '../../utils/utilities';

function Players({ setScreenVisibility, eventType, playersListType, team, playersList, actionHandler }) {
    // TODO: have a centralised messages file to import this from
    const messages = {
        title: 'Players',
        close: 'Close'
    };

    const closePopIn = () => {
        setScreenVisibility(false);
    };

    const playersListModified = playersListType === ADD_GOAL ? Object.assign(UNKNOWN_PLAYER, playersList) : playersList;

    const playersListDisplay = () => {
        // TODO: transform object of players into an array to simplify this
        const playersKeysArray = Object.keys(playersListModified);
        const playersArray = playersKeysArray.map(player => ({
            ...playersListModified[player],
            ref: player
        }));
        const playersSorted = playersArray.sort(compareValues('playerNumber', true));
        const list = playersSorted.map(player => (
            <li key={playersListModified[player.ref].playerNumber}>
                <button
                    type="button"
                    onClick={() =>
                        actionHandler({
                            eventType,
                            type: playersListType,
                            team,
                            playerNumber: playersListModified[player.ref].playerNumber
                        })
                    }
                >
                    {playersListModified[player.ref].playerNumber} {playersListModified[player.ref].playerName}
                </button>
            </li>
        ));
        return <ul>{list}</ul>;
    };

    return (
        <React.Fragment>
            <h2 className="title title--2">{messages.title}</h2>
            <h3>{playersListType}</h3>
            {playersListDisplay()}
            <button type="button" onClick={closePopIn}>
                {messages.close}
            </button>
        </React.Fragment>
    );
}

Players.propTypes = {
    setScreenVisibility: PropTypes.func,
    eventType: PropTypes.string,
    playersListType: PropTypes.string,
    team: PropTypes.string,
    playersList: PropTypes.object,
    actionHandler: PropTypes.func
};

export default Players;
