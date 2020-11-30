import React from 'react';
import { render } from '@testing-library/react';

import DeleteGame from '../index';
import { messages } from '../messages';

const componentProperties = {
    popupVisibility: true,
    closeHandler: () => {}
};

describe('<DeleteGame />', () => {
    it('should render and match the snapshot', () => {
        const {
            container: { firstChild }
        } = render(<DeleteGame {...componentProperties} />);
        expect(firstChild).toMatchSnapshot();
    });
});

describe('DeleteGame messages', () => {
    it('should be defined and have at least a title', () => {
        expect(messages).toBeDefined();
        expect(messages.title).toBeDefined();
        expect(Object.keys(messages).length).toBeGreaterThan(1);
    });
});
