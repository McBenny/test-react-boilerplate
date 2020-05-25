import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import App from '../index';
import { URLS } from '../constants';

const renderer = new ShallowRenderer();

describe('<App />', () => {
    it('should render and match the snapshot', () => {
        renderer.render(<App />);
        const renderedOutput = renderer.getRenderOutput();
        expect(renderedOutput).toMatchSnapshot();
    });
});

describe('<App /> - Constants', () => {
    it('should have 2 specific keys', () => {
        expect(URLS.game).toBeDefined();
        expect(URLS.index).toBeDefined();
    });
});
