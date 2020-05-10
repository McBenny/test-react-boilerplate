import React from 'react';
import PropTypes from 'prop-types';
import { messages } from './messages';

function PlayPause({ popupManagement }) {
    // TODO: make this a common function
    const closePopIn = () => {
        const { setPopupVisibility, popupVisibility } = popupManagement;
        setPopupVisibility({ ...popupVisibility, playPause: false });
    };

    return (
        <React.Fragment>
            <h2 className="title title--2">{messages.title}</h2>
            <button type="button" onClick={closePopIn}>
                {messages.close}
            </button>
        </React.Fragment>
    );
}

PlayPause.propTypes = {
    popupManagement: PropTypes.object
};

export default PlayPause;
