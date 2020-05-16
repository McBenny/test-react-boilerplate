/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SplashScreen from '../SplashScreen/Loadable';
import Game from '../Game/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';

import '../../styles/core.scss';
import { URLS } from './constants';

export default function App() {
    return (
        <div>
            <Switch>
                <Route exact path={URLS.index} component={SplashScreen} />
                <Route exact path={URLS.game} component={Game} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    );
}
