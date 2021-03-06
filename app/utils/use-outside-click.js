/* global document */
import React from 'react';

function useOutsideClick(refs, onClickOutside) {
    const [isActive, setActive] = React.useState(false);

    const isOutside = React.useCallback(
        e => {
            const test = refs.map(ref => {
                // For busy-indicator in particular since it's an overlay bypass this and return false
                if (e.target && e.target.className === 'busy-indicator') {
                    return false;
                }

                return ref.current !== null && !ref.current.contains(e.target);
            });

            return test.every(Boolean);
        },
        [refs]
    );

    const mousedown = React.useCallback(
        e => {
            if (isOutside(e)) {
                setActive(true);
                onClickOutside(e);
            }
        },
        [isOutside, onClickOutside]
    );

    const mouseup = React.useCallback(
        e => {
            if (isOutside(e)) {
                setActive(false);
            }
        },
        [isOutside]
    );

    React.useEffect(() => {
        document.addEventListener('mousedown', mousedown);
        document.addEventListener('mouseup', mouseup);

        return () => {
            document.removeEventListener('mousedown', mousedown);
            document.removeEventListener('mouseup', mouseup);
        };
    }, [refs, onClickOutside]);

    return [isActive];
}

export default useOutsideClick;
