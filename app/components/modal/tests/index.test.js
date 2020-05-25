import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Modal, { cancelButton } from '../index';
import { messages } from '../messages';

const componentProperties = {
    team: 'A',
    playersList: [],
    captainId: 0,
    officialsList: [],
    closeHandler: () => {},
    openPopup: () => {}
};

describe('Modal messages', () => {
    it('should be defined and have at least Cancel and Close labels', () => {
        expect(messages).toBeDefined();
        expect(messages.cancel).toBeDefined();
        expect(messages.cancel).not.toBe('');
        expect(messages.close).toBeDefined();
        expect(messages.close).not.toBe('');
    });
});

describe('cancelButton func', () => {
    it('should render and match the snapshot', () => {
        const {
            container: { firstChild }
        } = render(cancelButton(componentProperties.closeHandler()));
        expect(firstChild).toMatchSnapshot();
    });

    it('function is called when button close is clicked in modal', () => {
        const onClickMock = jest.fn();
        const { getByRole } = render(<Modal {...componentProperties} closeHandler={onClickMock} />);
        fireEvent.click(getByRole('button'));
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it('function is called when cancel button is clicked', () => {
        const onClickMock = jest.fn();
        const { getByRole } = render(cancelButton(onClickMock));
        fireEvent.click(getByRole('button'));
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });
});

describe('<Modal />', () => {
    it('should render and match the snapshot', () => {
        const {
            container: { firstChild }
        } = render(<Modal {...componentProperties} />);
        expect(firstChild).toMatchSnapshot();
    });
});
