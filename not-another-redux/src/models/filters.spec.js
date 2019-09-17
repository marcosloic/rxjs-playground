import {
    createFiltersList,
    createFiltersFromTableData,
    filterList
} from './filters';
import { TestScheduler } from 'rxjs/testing';

const testData = [
    { colors: ['a'], type: 'car', brand: 'renault' },
    { colors: ['a', 'b'], type: 'plane', brand: 'boeing' },
    { colors: ['a', 'b'], type: 'plane', brand: 'airbus' }
];

const filteredData = [
    { colors: ['a', 'b'], type: 'plane', brand: 'boeing' },
    { colors: ['a', 'b'], type: 'plane', brand: 'airbus' }
];

describe('The filters', () => {
    describe('The createFiltersFromTableData function', () => {
        describe('Given an array of filters and the table data', () => {
            it('Creates a map of the filters and initialises them to an empty set', () => {
                const result = createFiltersFromTableData(filterList, testData);
                expect(result).toStrictEqual({
                    [filterList[0]]: new Set(['a', 'b']),
                    [filterList[1]]: new Set(['car', 'plane']),
                    [filterList[2]]: new Set(['renault', 'boeing', 'airbus'])
                });
            });
        });
    });

    describe('The createFiltersList stream factory', () => {
        let scheduler;

        beforeEach(() => {
            scheduler = new TestScheduler((a, b) => expect(a).toEqual(b));
        });

        describe('Given a observable list of vehicles and a list of filters', () => {
            it('Returns a map of the filters and the available values for them', () => {
                scheduler.run(helpers => {
                    const { cold, expectObservable } = helpers;
                    const tableData$ = cold('--a-b', {
                        a: testData,
                        b: filteredData
                    });
                    const result = createFiltersList(tableData$, filterList);
                    expectObservable(result).toBe('a-b-c', {
                        a: {},
                        b: {
                            [filterList[0]]: new Set(['a', 'b']),
                            [filterList[1]]: new Set(['car', 'plane']),
                            [filterList[2]]: new Set([
                                'renault',
                                'boeing',
                                'airbus'
                            ])
                        },
                        c: {
                            [filterList[0]]: new Set(['a', 'b']),
                            [filterList[1]]: new Set(['plane']),
                            [filterList[2]]: new Set(['boeing', 'airbus'])
                        }
                    });
                });
            });
        });
    });
});
