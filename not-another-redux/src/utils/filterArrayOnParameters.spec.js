import { filterArrayOnParameters } from './filterArrayOnParameters';
import { mockData } from '../../__mocks/traffic.data';

describe('filterArrayOnParameters', () => {
    describe('Given an array of data and a map of parameters', () => {
        it('Filters the data based on the parameters supplied', () => {
            const filter = { colors: 'white' };
            const result = filterArrayOnParameters(mockData, filter);
            expect(result).toStrictEqual([
                {
                    colors: ['white', 'blue'],
                    brand: 'audi',
                    type: 'car'
                },
                {
                    colors: ['white'],
                    brand: 'mercedes',
                    type: 'car'
                },
                {
                    colors: ['white'],
                    brand: 'mercedes',
                    type: 'plane'
                }
            ]);
        });

        it('Applies multiple filters and returns the result', () => {
            const filter = { colors: 'white', brand: 'mercedes' };
            const result = filterArrayOnParameters(mockData, filter);
            expect(result).toStrictEqual([
                {
                    colors: ['white'],
                    brand: 'mercedes',
                    type: 'car'
                },
                {
                    colors: ['white'],
                    brand: 'mercedes',
                    type: 'plane'
                }
            ]);

            const secondFilter = {
                colors: 'white',
                brand: 'mercedes',
                type: 'plane'
            };
            expect(filterArrayOnParameters(result, secondFilter)).toStrictEqual(
                [{ colors: ['white'], brand: 'mercedes', type: 'plane' }]
            );
        });
    });
});
