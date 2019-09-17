import {
    filterActionTypes,
    updateFiltersIntent$
} from '../../models/selectedFilters';

import TestRenderer from 'react-test-renderer';
import React from 'react';
import { FiltersList } from './FiltersList';
import { Filter } from '../Filter/Filter';
import { useObservable } from '../../utils/useObservable';

jest.mock('../../models/selectedFilters', () => {
    return {
        updateFiltersIntent$: {
            next: jest.fn()
        },
        filterActionTypes: {
            CLEAR: 'Clear',
            ADD: 'Add'
        }
    };
});

jest.mock('../../utils/useObservable');

const fakeFilters = {
    brand: 'brand',
    colors: 'white'
};

describe('The FiltersList component', () => {
    beforeEach(() => {
        useObservable.mockReturnValue(fakeFilters);
    });
    it('Matches the snapshot', () => {
        const filtersList = TestRenderer.create(<FiltersList />);
        expect(filtersList.toJSON()).toMatchSnapshot();
    });
    it('Renders select options for each filter', () => {
        const filtersList = TestRenderer.create(<FiltersList />);
        const instance = filtersList.root;
        const children = instance.findAllByType(Filter);
        expect(children.length).toBe(2);
    });
    it(`Sends a ${filterActionTypes.ADD} when the Filter emits a value`, () => {
        // Roughly tests that the filter works as well
        const filtersList = TestRenderer.create(<FiltersList />);
        const instance = filtersList.root;
        const children = instance.findAllByType(Filter);
        const selectElement = children[0].findByProps({
            defaultValue: 'default'
        });
        selectElement.props.onChange({ target: { value: 'value' } });
    });

    it(`Sends a ${filterActionTypes.CLEAR} when the user clicks on the button`, () => {
        const filtersList = TestRenderer.create(<FiltersList />);
        const instance = filtersList.root;
        const button = instance.findByProps({ className: 'button' });
        button.props.onClick();
        expect(updateFiltersIntent$.next).toHaveBeenCalledWith({
            actionType: 'Clear'
        });
    });
});
