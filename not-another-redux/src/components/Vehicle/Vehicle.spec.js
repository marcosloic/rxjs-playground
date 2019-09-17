import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Vehicle } from './Vehicle';

const fakeDetails = {
    brand: 'brand',
    type: 'type',
    colors: ['colors'],
    img: 'img'
};

describe('The Vehicle component', () => {
    it('Matches the snapshot', () => {
        const vehicle = TestRenderer.create(<Vehicle details={fakeDetails} />);
        expect(vehicle.toJSON()).toMatchSnapshot();
    });

    it('renders the vehicle details', () => {
        const vehicle = TestRenderer.create(
            <Vehicle details={fakeDetails} />
        ).toJSON();
        const [img, div] = vehicle.children;
        expect(vehicle.children.length).toBe(2);
        expect(img.type).toBe('img');
        expect(div.children.length).toBe(3);
    });
});
