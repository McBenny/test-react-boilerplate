import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { IntlProvider } from 'react-intl';

import NotFoundPage from '../index';

const renderer = new ShallowRenderer();

describe('<NotFoundPage />', () => {
    it('should render and match the snapshot', () => {
        renderer.render(
            <IntlProvider locale="en">
                <NotFoundPage />
            </IntlProvider>
        );
        const renderedOutput = renderer.getRenderOutput();
        expect(renderedOutput).toMatchSnapshot();
    });
});
