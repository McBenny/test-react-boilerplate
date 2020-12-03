import React from 'react';
import PropTypes from 'prop-types';

import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined';

import './styles.scss';

const Timeout = props => (
    <div className="timeout">
        <div className="timeout__stopwatch-container">
            <TimerOutlinedIcon className="timeout__stopwatch" />
        </div>
        <div className="timeout__background">
            <div className="timeout__counter">{props.children}</div>
        </div>
    </div>
);

Timeout.propTypes = {
    children: PropTypes.any
};

export default Timeout;
