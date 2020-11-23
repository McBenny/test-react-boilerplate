/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Button, IconButton } from '@material-ui/core';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineDot,
    TimelineConnector,
    TimelineContent,
    TimelineOppositeContent
} from '@material-ui/lab';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import HomeOutlined from '@material-ui/icons/HomeOutlined';
import NotListedLocationOutlinedIcon from '@material-ui/icons/NotListedLocationOutlined';
import SportsSoccerOutlinedIcon from '@material-ui/icons/SportsSoccerOutlined';
import TrendingFlatOutlinedIcon from '@material-ui/icons/TrendingFlatOutlined';

import reducer from '../Game/reducer';
import { makeSelectGameId } from '../Game/selectors';
import { useInjectReducer } from '../../utils/injectReducer';

import { URLS } from '../App/constants';

import { messages } from './messages';
import './styles.scss';

const key = 'game';

export function NotFound({ gameId }) {
    useInjectReducer({ key, reducer });

    function loadPage(page) {
        window.location.href = page;
    }

    return (
        <>
            <main>
                <h1 className="title title--1">{messages.title}</h1>
                <Timeline className="timeline">
                    <TimelineItem>
                        <TimelineOppositeContent>
                            <div className="timeline__404">404</div>
                            <div className="timeline__404 timeline__404--legend">{messages.notFound}</div>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot>
                                <IconButton
                                    onClick={() => loadPage(URLS.index)}
                                    title={messages.homePage}
                                    size="small"
                                    aria-label={`${messages.goesTo} ${messages.homePage}`}
                                >
                                    <HomeOutlined />
                                </IconButton>
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Button onClick={() => loadPage(URLS.index)} className="timeline__buttons" size="large">
                                {messages.homePage}
                            </Button>
                            <p className="timeline__explanations">
                                <strong>{messages.whatYouWillFind}</strong>
                                <br />
                                {messages.homePageText}
                            </p>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot>
                                <IconButton
                                    disabled={!gameId}
                                    onClick={() => loadPage(URLS.game)}
                                    title={messages.gamePage}
                                    size="small"
                                    aria-label={`${messages.goesTo} ${messages.gamePage}`}
                                >
                                    <SportsSoccerOutlinedIcon />
                                </IconButton>
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Button
                                disabled={!gameId}
                                onClick={() => loadPage(URLS.game)}
                                className="timeline__buttons"
                                size="large"
                            >
                                {messages.gamePage}
                            </Button>
                            <p className="timeline__explanations">
                                <strong>{messages.whatYouWillFind}</strong>
                                <br />
                                {messages.gamePageText}
                            </p>
                            {!gameId ? (
                                <p className="timeline__explanations">
                                    <em>
                                        {messages.gamePageTextComplement} <a href={URLS.index}>{messages.homePage}</a>
                                    </em>
                                    ...
                                </p>
                            ) : (
                                ''
                            )}
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot>
                                <IconButton
                                    disabled={!gameId}
                                    onClick={() => loadPage(URLS.scoreSheet)}
                                    title={messages.scoreSheet}
                                    size="small"
                                    aria-label={`${messages.goesTo} ${messages.scoreSheet}`}
                                >
                                    <AssignmentOutlinedIcon />
                                </IconButton>
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Button
                                disabled={!gameId}
                                onClick={() => loadPage(URLS.scoreSheet)}
                                className="timeline__buttons"
                                size="large"
                            >
                                {messages.scoreSheet}
                            </Button>
                            <p className="timeline__explanations">
                                <strong>{messages.whatYouWillFind}</strong>
                                <br />
                                {messages.scoreSheetText}
                            </p>
                            {!gameId ? (
                                <p className="timeline__explanations">
                                    <em>
                                        {messages.scoreSheetTextComplement} <a href={URLS.index}>{messages.homePage}</a>
                                    </em>
                                    ...
                                </p>
                            ) : (
                                ''
                            )}
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
                <Timeline>
                    <TimelineItem>
                        <TimelineOppositeContent>
                            {messages.notFoundText}
                            <TrendingFlatOutlinedIcon />
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot color="secondary">
                                <NotListedLocationOutlinedIcon className="timeline__not-found" />
                            </TimelineDot>
                        </TimelineSeparator>
                        <TimelineContent>
                            <Button className="timeline__buttons timeline__buttons--disabled">
                                {messages.notFound}
                            </Button>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </main>
        </>
    );
}

NotFound.propTypes = {
    gameId: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
    gameId: makeSelectGameId()
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(NotFound);
