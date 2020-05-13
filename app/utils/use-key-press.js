import { useState, useEffect } from 'react';

function useKeyPress({ targetKeyName, targetKeyCode }) {
    // TODO Possibly  hook to shared components for all games to use

    // Keep track of whether key is pressed locally
    const [keyPressed, setKeyPressed] = useState(false);
    const [eventListenerAdded, setEventListenerAdded] = useState(false);

    useEffect(
        () => {
            // use keyCode as fallback for Safari 9
            // Set local state 'keyPressed' to true when target key is pressed
            const downHandler = ({ key, keyCode }) => {
                if ((key && key === targetKeyName) || (keyCode && keyCode === targetKeyCode)) {
                    setKeyPressed(true);
                }
            };

            // Set local state 'keyPressed' to false when target key is released
            const upHandler = ({ key, keyCode }) => {
                if ((key && key === targetKeyName) || (keyCode && keyCode === targetKeyCode)) {
                    setKeyPressed(false);
                }
            };

            // Add the event listeners only once
            if (!eventListenerAdded) {
                window.addEventListener('keydown', downHandler);
                window.addEventListener('keyup', upHandler);
                setEventListenerAdded(true);
            }

            // Remove event listeners when the component unmounts
            return () => {
                window.removeEventListener('keydown', downHandler);
                window.removeEventListener('keyup', upHandler);
            };
        },
        [targetKeyName, targetKeyCode] // Hook will be executed if one of these two parameters change
    );

    return [keyPressed, setKeyPressed];
}

export default useKeyPress;
