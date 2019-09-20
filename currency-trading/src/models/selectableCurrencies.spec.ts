import { TestScheduler } from 'rxjs/testing';
import { createAvailableCurrencies, Currency } from './selectableCurrencies';

const fakeCurrencyList = [
    { symbol: 'a' },
    { symbol: 'b' },
    { symbol: 'c' },
    { symbol: 'd' },
    { symbol: 'e' }
] as Currency[];

describe('The selectableCurrencies model', () => {
    let scheduler: any = null;
    beforeEach(() => {
        scheduler = new TestScheduler((a, b) => expect(a).toEqual(b));
    });

    describe('When created with a base list of currencies and the user selected currencies', () => {
        it('Emits a defualt initial state', () => {
            scheduler.run(helpers => {
                const { cold, expectObservable } = helpers;
                const baseSelection = cold('');
                const quoteSelection = cold('');
                const result$ = createAvailableCurrencies(
                    fakeCurrencyList,
                    baseSelection,
                    quoteSelection
                );
                expectObservable(result$).toBe('a', {
                    a: fakeCurrencyList
                });
            });
        });
        it('Filters the already selected currencies from the list', () => {
            scheduler.run(helpers => {
                const { cold, expectObservable } = helpers;
                const baseSelection = cold('-a-', {
                    a: 'a'
                });
                const quoteSelection = cold('---b-', {
                    b: 'b'
                });
                const result$ = createAvailableCurrencies(
                    fakeCurrencyList,
                    baseSelection,
                    quoteSelection
                );
                expectObservable(result$).toBe('c--d-', {
                    c: fakeCurrencyList,
                    d: [{ symbol: 'c' }, { symbol: 'd' }, { symbol: 'e' }]
                });
            });
        });

        it('Updates when the user selection changes', () => {
            scheduler.run(helpers => {
                const { cold, expectObservable } = helpers;
                const baseSelection = cold('-a-b-c', {
                    a: 'a',
                    b: 'b',
                    c: 'c'
                });
                const quoteSelection = cold('--a-b-c', {
                    a: 'b',
                    b: 'c',
                    c: 'a'
                });
                const result$ = createAvailableCurrencies(
                    fakeCurrencyList,
                    baseSelection,
                    quoteSelection
                );
                expectObservable(result$).toBe('a-bcdef', {
                    a: fakeCurrencyList,
                    b: [{ symbol: 'c' }, { symbol: 'd' }, { symbol: 'e' }],
                    c: [
                        { symbol: 'a' },
                        { symbol: 'c' },
                        { symbol: 'd' },
                        { symbol: 'e' }
                    ],
                    d: [{ symbol: 'a' }, { symbol: 'd' }, { symbol: 'e' }],
                    e: [
                        { symbol: 'a' },
                        { symbol: 'b' },
                        { symbol: 'd' },
                        { symbol: 'e' }
                    ],
                    f: [{ symbol: 'b' }, { symbol: 'd' }, { symbol: 'e' }]
                });
            });
        });
    });
});
