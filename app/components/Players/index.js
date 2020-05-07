import React from 'react';
import PropTypes from 'prop-types';
import { compareValues } from '../../utils/utilities';
import { messages } from './messages';
import { ADD_GOAL, UNKNOWN_PLAYER } from '../../containers/Game/constants';

function Players({ setScreenVisibility, eventType, playersListType, team, playersList, actionHandler }) {
    const closePopIn = () => {
        setScreenVisibility(false);
    };

    const playersListDisplay = () => {
        let playersListSorted;
        const unknownPlayerInserted = playersList.filter(player => player.id === 0);
        if (playersListType === ADD_GOAL) {
            if (unknownPlayerInserted.length === 0) {
                playersList.push(UNKNOWN_PLAYER);
            }
            playersListSorted = playersList.sort(compareValues('playerNumber', true));
            playersListSorted.splice(2, 0, playersListSorted.splice(0, 1)[0]);
        } else {
            playersListSorted = playersList.sort(compareValues('playerNumber', true));
            if (unknownPlayerInserted.length !== 0) {
                playersListSorted.shift();
            }
        }
        const buffer = playersListSorted.map(player => (
            <li key={`${playersListType}playerNumber${player.id}`}>
                <button
                    type="button"
                    onClick={() =>
                        actionHandler({
                            eventType,
                            type: playersListType,
                            team,
                            id: player.id
                        })
                    }
                >
                    {player.playerNumber} {player.playerName}
                </button>
            </li>
        ));
        return <ul>{buffer}</ul>;
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
    playersList: PropTypes.array,
    actionHandler: PropTypes.func
};

export default Players;
