import React from 'react';
import { render } from '@testing-library/react';

import DuplicateGame from '../index';
import { messages } from '../messages';

const componentProperties = {
    popupVisibility: true,
    game: {
        date: '0000-00-00'
    },
    closeHandler: () => {}
};

describe('<DuplicateGame />', () => {
    it('should render and match the snapshot', () => {
        const {
            container: { firstChild }
        } = render(<DuplicateGame {...componentProperties} />);
        expect(firstChild).toMatchSnapshot();
    });
});

describe('DuplicateGame messages', () => {
    it('should be defined and have at least a title', () => {
        expect(messages).toBeDefined();
        expect(messages.title).toBeDefined();
        expect(Object.keys(messages).length).toBeGreaterThan(1);
    });
});
