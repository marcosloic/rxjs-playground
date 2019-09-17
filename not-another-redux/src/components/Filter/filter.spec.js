import TestRenderer from 'react-test-renderer';
import React from 'react';
import { Filter } from './Filter';

describe('The filter component', () => {
    it('Matches the snapshot', () => {
        const filter = TestRenderer.create(<Filter />);
        expect(filter).toMatchSnapshot();
    });
});
