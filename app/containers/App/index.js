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
import CssBaseline from '@material-ui/core/CssBaseline';

import HomePage from '../HomePage/Loadable';
import Game from '../Game/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import ScoreSheet from '../ScoreSheet/Loadable';
import ScoreSheetAlt from '../ScoreSheet/Loadable-alt';

import '../../styles/core.scss';
import { URLS } from './constants';

export default function App() {
    return (
        <div>
            <CssBaseline />
            <Switch>
                <Route exact path={URLS.index} component={HomePage} />
                <Route exact path={URLS.game} component={Game} />
                <Route exact path={URLS.scoreSheet} component={ScoreSheet} />
                <Route exact path={URLS.scoreSheetAlt} component={ScoreSheetAlt} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    );
}
