/*
 * SplashScreen
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { Fragment } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import LocalStorage from '../../utils/local-storage';
import { generateId, naturalSorting, formatDate } from '../../utils/utilities';
import { URLS } from '../App/constants';
import { GAMES_PREFIX } from '../Game/constants';

import { messages } from './messages';

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
        const sortedLocalStorage = naturalSorting(cleanLocalStorage, 'date');
        const buffer = sortedLocalStorage.map(game => {
            const formattedDate = formatDate(game.date);
            return (
                <ListItem key={game.gameId} button>
                    <ListItemText onClick={() => loadGame(game.gameId)}>
                        {formattedDate}{' '}
                        <span className="title title--1">
                            {game.settings.competition} [{game.settings.gender}]{' '}
                            {game.settings.round !== '' ? `(round: ${game.settings.round})` : ''}
                        </span>
                        <br />
                        <span className="title title--subtitle">
                            {game.settings.teams.A.name} vs {game.settings.teams.B.name}
                        </span>
                    </ListItemText>
                </ListItem>
            );
        });
        return (
            <List component="nav" aria-labelledby="gameListTitle">
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
