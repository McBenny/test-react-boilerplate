import React from 'react';
import { render } from '@testing-library/react';

import PlayPause from '../index';
import { messages } from '../messages';

const componentProperties = {
    gameStarted: true,
    gamePaused: false,
    period: 1,
    startHandler: () => {},
    closeHandler: () => {}
};

describe('<PlayPause />', () => {
    it('should render and match the snapshot', () => {
        const {
            container: { firstChild }
        } = render(<PlayPause {...componentProperties} />);
        expect(firstChild).toMatchSnapshot();
    });
});

describe('PlayPause messages', () => {
    it('should be defined and have at least a title', () => {
        expect(messages).toBeDefined();
        expect(messages.title).toBeDefined();
        expect(Object.keys(messages).length).toBeGreaterThan(1);
    });
});
