import React from 'react';
import { render } from '@testing-library/react';

import LineUp from '../index';
import { messages } from '../messages';

const componentProperties = {
    popupVisibility: true,
    team: 'A',
    playersList: [],
    captainId: 0,
    officialsList: [],
    closeHandler: () => {},
    openPopup: () => {}
};

describe('<LineUp />', () => {
    it('should render and match the snapshot', () => {
        const {
            container: { firstChild }
        } = render(<LineUp {...componentProperties} />);
        expect(firstChild).toMatchSnapshot();
    });
});

describe('LineUp messages', () => {
    it('should be defined and have at least a title', () => {
        expect(messages).toBeDefined();
        expect(messages.title).toBeDefined();
        expect(Object.keys(messages).length).toBeGreaterThan(1);
    });
});
