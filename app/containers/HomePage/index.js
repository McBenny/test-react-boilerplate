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
import { generateId } from '../../utils/utilities';
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
        const buffer = localKeys.map(game => {
            if (game.match(gamePrefix)) {
                const gameData = LocalStorage.get(game);
                return (
                    <ListItem key={gameData.gameId} button>
                        <ListItemText
                            onClick={() => loadGame(gameData.gameId)}
                            primary={`${gameData.settings.teams.A.name} - ${gameData.settings.teams.B.name} (${
                                gameData.dataTeamA.goals
                            }-${gameData.dataTeamB.goals})`}
                            secondary={`${gameData.date} ${gameData.settings.competition}/${gameData.settings.round}/${
                                gameData.settings.gender
                            }`}
                        />
                    </ListItem>
                );
            }
            return '';
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
