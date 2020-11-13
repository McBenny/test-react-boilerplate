/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { Fragment } from 'react';

import { List, ListItem, ListItemText, Button } from '@material-ui/core';

import { URLS } from '../App/constants';
import { EVENT_TYPES, GAMES_PREFIX } from '../Game/constants';
import LocalStorage from '../../utils/local-storage';
import { generateId, formatDate } from '../../utils/utilities';

import { messages } from './messages';
import './styles.scss';

function gameSorting(myArray) {
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
    return myArray.sort((a, b) => collator.compare(b.settings.date, a.settings.date));
}

export default function HomePage() {
    const createGame = () => {
        const gameId = generateId();
        const gameKey = `${GAMES_PREFIX}${gameId}`;
        LocalStorage.set(gameKey, '');
        sessionStorage.setItem('gameId', gameKey);
        window.location.href = URLS.game;
    };

    const loadGame = gameKey => {
        sessionStorage.setItem('gameId', gameKey);
        window.location.href = URLS.game;
    };

    const savedGames = () => {
        const localKeys = Object.keys(localStorage);
        const gamePrefix = /^game-uuid-[a-z0-9-]{36}$/g;

        const cleanLocalStorage = [];
        for (let i = 0; i < localKeys.length; i += 1) {
            if (localKeys[i].match(gamePrefix)) {
                cleanLocalStorage[i] = LocalStorage.get(localKeys[i]);
            }
        }
        const sortedLocalStorage = gameSorting(cleanLocalStorage);
        const buffer = sortedLocalStorage.map(game => {
            // Alternative to support old format
            const formattedDate = formatDate(game.settings.date || game.date);
            let matchStatus = messages.notStarted;
            if (game.gameEvents.length > 0) {
                const lastEvent = game.gameEvents[game.gameEvents.length - 1];
                switch (lastEvent.eventType) {
                    case EVENT_TYPES.gamePaused:
                        matchStatus = messages.gamePaused;
                        break;
                    case EVENT_TYPES.periodEnd:
                        matchStatus = messages.halfTime;
                        break;
                    case EVENT_TYPES.gameEnd:
                        matchStatus = messages.fullTime;
                        break;
                    default:
                        matchStatus = messages.inProgress;
                }
            }
            return (
                <ListItem key={game.gameId} button className="game-list__item">
                    <ListItemText onClick={() => loadGame(game.gameId)}>
                        <span className="game-list__content">
                            <span className="game-list__date">{formattedDate}</span>
                            <span className="game-list__details">
                                <span className="title title--1-5">
                                    {game.settings.competition} [{game.settings.gender}]{' '}
                                    {game.settings.round !== '' ? `(round: ${game.settings.round})` : ''}
                                </span>
                                <br />
                                <span className="title title--subtitle">
                                    {game.settings.teams.A.name} vs {game.settings.teams.B.name}
                                </span>
                                <br />
                                <span className="title title--1-5">
                                    score: {game.dataTeamA.goals}-{game.dataTeamB.goals} (
                                    <em className="game-list__status">{matchStatus}</em>)
                                </span>
                            </span>
                        </span>
                    </ListItemText>
                </ListItem>
            );
        });
        return (
            <List component="nav" className="game-list" aria-labelledby="gameListTitle">
                {buffer}
            </List>
        );
    };

    return (
        <Fragment>
            <main>
                <h1>{messages.title}</h1>
                <Button variant="contained" color="primary" onClick={createGame}>
                    {messages.createGame}
                </Button>
                <h2 id="gameListTitle">{messages.savedGames}</h2>
                {savedGames()}
            </main>
        </Fragment>
    );
}
