import React from 'react';
import { render } from '@testing-library/react';

import GameLog from '../index';
import { messages } from '../messages';

describe('<GameLog />', () => {
    it('should render and match the snapshot', () => {
        const {
            container: { firstChild }
        } = render(<GameLog gameEvents={[]} settingsData={{}} />);
        expect(firstChild).toMatchSnapshot();
    });
});

describe('GameLog messages', () => {
    it('should be defined and have at least a title', () => {
        expect(messages).toBeDefined();
        expect(messages.title).toBeDefined();
        expect(Object.keys(messages).length).toBeGreaterThan(1);
    });
});
