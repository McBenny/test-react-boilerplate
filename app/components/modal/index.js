import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';

// Hooks
import useKeyPress from '../../utils/use-key-press';
import useOutsideClick from '../../utils/use-outside-click';

// Styles
import './styles.scss';
import { messages as modalMessages, messages } from './messages';

// Helpers
import { ESCAPE_KEY_CODE, ESCAPE_KEY_NAME } from '../../utils/constants';

export function cancelButton(closeHandler) {
    return (
        <button type="button" onClick={() => closeHandler()}>
            {modalMessages.cancel}
        </button>
    );
}

/**
 *
 * @param {string} title
 * @param {html} children: content of the pop-up
 * @param {function} closeHandler: action to perform on close
 * @param {string} additionalClasses: additional classes to apply to the modal
 * @param {object} containerStyle: inline styles to apply to the modal
 * @returns {*}
 * @constructor
 */
// TODO: Remove the popup property
function Modal({ title, children, closeHandler, additionalClasses, containerStyle }) {
    const [escapeKeyPressed] = useKeyPress({
        targetKeyName: ESCAPE_KEY_NAME,
        targetKeyCode: ESCAPE_KEY_CODE
    });

    // Effect for handling escape key press
    useEffect(() => {
        if (escapeKeyPressed && closeHandler) {
            closeHandler();
        }
    }, [escapeKeyPressed]);

    const containerClasses = `modal ${additionalClasses || ''}`;

    // Click outside
    const modalContainerRef = useRef(null);
    useOutsideClick([modalContainerRef], () => closeHandler());

    const modalTemplate = (
        <div ref={modalContainerRef}>
            <FocusTrap>
                <div style={containerStyle} className={containerClasses}>
                    <div className="modal__header">
                        <h2 className="modal__title">{title}</h2>
                        <button type="button" onClick={() => closeHandler()}>
                            {messages.close}
                        </button>
                    </div>
                    <div className="modal__variable-height">{children}</div>
                </div>
            </FocusTrap>
        </div>
    );

    return <aside className="modal__overlay">{modalTemplate}</aside>;
}

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
    closeHandler: PropTypes.func.isRequired,
    additionalClasses: PropTypes.string,
    containerStyle: PropTypes.object
};

export default Modal;
