import { TestScheduler } from 'rxjs/testing';
import { mockData } from '../../__mocks/traffic.data';
import { createTableData } from './tableData';

describe('The tableData state', () => {
    let scheduler;

    beforeEach(() => {
        scheduler = new TestScheduler((a, b) => expect(a).toEqual(b));
    });

    describe('Given a streams of data and filter', () => {
        it('Applies the filters to the data and returns the result', () => {
            scheduler.run(helpers => {
                const { cold, expectObservable } = helpers;
                const dataStream$ = cold('-a-', { a: mockData });
                const filtersStream$ = cold('---a-b-c', {
                    a: {
                        colors: 'white'
                    },
                    b: {
                        colors: 'white',
                        type: 'car'
                    },
                    c: {
                        colors: 'white',
                        type: 'car',
                        brand: 'audi'
                    }
                });
                const result = createTableData(dataStream$, filtersStream$);
                expectObservable(result).toBe('-a-b-c-d', {
                    a: mockData,
                    b: [
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
                    ],
                    c: [
                        {
                            colors: ['white', 'blue'],
                            brand: 'audi',
                            type: 'car'
                        },
                        {
                            colors: ['white'],
                            brand: 'mercedes',
                            type: 'car'
                        }
                    ],
                    d: [
                        {
                            colors: ['white', 'blue'],
                            brand: 'audi',
                            type: 'car'
                        }
                    ]
                });
            });
        });
    });
});
