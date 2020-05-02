/*
 * SplashScreen
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { Fragment } from 'react';

export default function HomePage() {
    const headerMessage = 'Handball Scoreboard';
    const linkText = 'Start game';
    return (
        <Fragment>
            <h1 className="title title--1">{headerMessage}</h1>
            <a href="game">{linkText}</a>
        </Fragment>
    );
}
