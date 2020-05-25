/*
 * SplashScreen
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { Fragment } from 'react';

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
        const buffer = localKeys.map(game => {
            const gameData = LocalStorage.get(game);
            return (
                <li key={gameData.gameId}>
                    {gameData.date} {gameData.settings.competition}/{gameData.settings.round}/{gameData.settings.gender}
                    <br />
                    {gameData.settings.teams.A.name} - {gameData.settings.teams.B.name} ({gameData.dataTeamA.goals}-
                    {gameData.dataTeamB.goals})
                    <button type="button" onClick={() => loadGame(gameData.gameId)}>
                        {messages.loadGame}
                    </button>
                </li>
            );
        });
        return <ul>{buffer}</ul>;
    };

    return (
        <Fragment>
            <h1>{messages.title}</h1>
            <button type="button" onClick={createGame}>
                {messages.createGame}
            </button>
            <h2>{messages.savedGames}</h2>
            {savedGames()}
        </Fragment>
    );
}
