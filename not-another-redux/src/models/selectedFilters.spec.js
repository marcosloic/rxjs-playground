import { TestScheduler } from 'rxjs/testing';
import { createSelectedFilters, filterActionTypes } from './selectedFilters';

describe('The selectedFilters state', () => {
    let scheduler;

    beforeEach(() => {
        scheduler = new TestScheduler((a, b) => expect(a).toEqual(b));
    });

    describe('When it receives an intent to update a filter', () => {
        it('Returns a new state with the selected filter', () => {
            scheduler.run(helpers => {
                const { hot, expectObservable } = helpers;
                const messageBus$ = hot('-a-b-c', {
                    a: {
                        actionType: '',
                        filter: '1',
                        value: 'value a'
                    },
                    b: {
                        actionType: '',
                        filter: '1',
                        value: 'value b'
                    },
                    c: {
                        actionType: '',
                        filter: '2',
                        value: 'value a'
                    }
                });

                const result$ = createSelectedFilters(messageBus$);
                const expectedStream$ = '-a-b-c';
                const expectedStreamValue$ = {
                    a: {
                        1: 'value a'
                    },
                    b: {
                        1: 'value b'
                    },
                    c: {
                        1: 'value b',
                        2: 'value a'
                    }
                };
                expectObservable(result$).toBe(
                    expectedStream$,
                    expectedStreamValue$
                );
            });
        });
    });

    describe('When it receives an intent to clear the data', () => {
        it('Clears the filters', () => {
            scheduler.run(helpers => {
                const { hot, expectObservable } = helpers;
                const messageBus$ = hot('-a-b-c', {
                    a: {
                        actionType: '',
                        filter: '1',
                        value: 'value a'
                    },
                    b: {
                        actionType: '',
                        filter: '2',
                        value: 'value a'
                    },
                    c: {
                        actionType: filterActionTypes.CLEAR
                    }
                });

                const result$ = createSelectedFilters(messageBus$);
                const expectedStream$ = '-a-b-c';
                const expectedStreamValue$ = {
                    a: {
                        1: 'value a'
                    },
                    b: {
                        1: 'value a',
                        2: 'value a'
                    },
                    c: {}
                };
                expectObservable(result$).toBe(
                    expectedStream$,
                    expectedStreamValue$
                );
            });
        });
    });
});
