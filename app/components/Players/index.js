import React from 'react';
import PropTypes from 'prop-types';
import { compareValues } from '../../utils/utilities';
import { messages } from './messages';
import {
    ADD_GOAL,
    ADD_YELLOW_CARD,
    ADD_BLUE_CARD,
    ADD_SUSPENSION,
    UNKNOWN_PLAYER
} from '../../containers/Game/constants';
import { MAX_NUMBER } from '../../containers/Settings/constants';

function Players({ setScreenVisibility, eventType, playersListType, team, playersList, officialsList, actionHandler }) {
    const closePopIn = () => {
        setScreenVisibility(false);
    };

    /**
     * According to the rules of handball:
     *  - in general, when the maximum number of a sanction is reached, referees can't add the same sanction,
     *  - reaching the maximum number of yellow cards only prevents from receiving another yellow card,
     *  - reaching maximum number of red cards prevents from playing so only possibility: blue card,
     *  - a blue card can only be given to a player with a red card. Reaching maximum number of blue cards prevents from everything,
     *  - reaching maximum number of suspensions still allows for goals and red cards.
     * @param player
     * @returns {boolean|boolean}
     */
    const isPlayerDisabled = player => {
        const yellowCardsMax =
            playersListType === ADD_YELLOW_CARD &&
            (player.yellowCards >= MAX_NUMBER.yellowCards || player.suspensions > 0);
        const redCardsMax = playersListType !== ADD_BLUE_CARD && player.redCards >= MAX_NUMBER.redCards;
        const blueCardsMax =
            playersListType === ADD_BLUE_CARD &&
            (player.redCards < MAX_NUMBER.redCards || player.blueCards >= MAX_NUMBER.blueCards);
        const suspensionsMax =
            (playersListType === ADD_YELLOW_CARD || playersListType === ADD_SUSPENSION) &&
            player.suspensions >= MAX_NUMBER.suspensions;
        return yellowCardsMax || redCardsMax || blueCardsMax || suspensionsMax;
    };

    const createPlayersList = () => {
        let playersListSorted;
        const unknownPlayerInserted = playersList.filter(player => player.id === 0);
        if (playersListType === ADD_GOAL) {
            if (unknownPlayerInserted.length === 0) {
                playersList.push(UNKNOWN_PLAYER);
            }
            playersListSorted = playersList.sort(compareValues('reference', true));
            playersListSorted.splice(playersListSorted.length, 0, playersListSorted.splice(0, 1)[0]);
        } else {
            playersListSorted = playersList.sort(compareValues('reference', true));
            if (unknownPlayerInserted.length !== 0) {
                playersListSorted.shift();
            }
        }
        return playersListSorted;
    };

    const playersListDisplay = () => {
        const cleanPlayersList = createPlayersList();
        const buffer = cleanPlayersList.map(player => {
            const playerDisabled = isPlayerDisabled(player);
            return (
                <li key={`${playersListType}playerNumber${player.id}`}>
                    <button
                        type="button"
                        onClick={() => {
                            actionHandler({
                                eventType,
                                type: playersListType,
                                team,
                                id: player.id,
                                memberType: 'players'
                            });
                            closePopIn();
                        }}
                        disabled={playerDisabled}
                        title={playerDisabled ? messages.maxActionsReached : ''}
                    >
                        {player.reference} {player.playerName}
                    </button>
                </li>
            );
        });
        if (cleanPlayersList.length === 0) {
            return <p>{messages.noPlayers}</p>;
        }
        return <ul>{buffer}</ul>;
    };

    const officialsListDisplay = () => {
        const buffer = officialsList.map(official => {
            const officialDisabled = isPlayerDisabled(official);
            return (
                <li key={`${playersListType}officialReference${official.id}`}>
                    <button
                        type="button"
                        onClick={() => {
                            actionHandler({
                                eventType,
                                type: playersListType,
                                team,
                                id: official.id,
                                memberType: 'officials'
                            });
                            closePopIn();
                        }}
                        disabled={officialDisabled}
                        title={officialDisabled ? messages.maxActionsReached : ''}
                    >
                        {official.reference} {official.officialName}
                    </button>
                </li>
            );
        });
        if (officialsList.length === 0) {
            return <p>{messages.noOfficials}</p>;
        }
        return <ul>{buffer}</ul>;
    };

    return (
        <React.Fragment>
            <h2 className="title title--2">
                {messages.title}: {playersListType}
            </h2>
            <h3>{messages.listOfPlayers}</h3>
            {playersListDisplay()}
            {playersListType !== ADD_GOAL ? <h3>{messages.listOfOfficials}</h3> : ''}
            {playersListType !== ADD_GOAL ? officialsListDisplay() : ''}
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
    officialsList: PropTypes.array,
    actionHandler: PropTypes.func
};

export default Players;
