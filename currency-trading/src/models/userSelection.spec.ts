import { TestScheduler } from 'rxjs/testing';
import {
    createUserSelection,
    UserSelectionActionTypes,
    userSelectionInitialState
} from './userSelection';

const fakeEuro = { symbol: 'EUR', name: 'Euro' };
const fakeDollar = { symbol: 'USD', name: 'United States Dollar' };

describe('The userSelection accumulator', () => {
    let scheduler: any = null;
    beforeEach(() => {
        scheduler = new TestScheduler((a, b) => expect(a).toEqual(b));
    });

    describe('When it receives actions', () => {
        it('Updates the state', () => {
            scheduler.run((helpers: any) => {
                const { cold, expectObservable } = helpers;
                const intentStream$ = cold('-a-b-c', {
                    a: {
                        type: UserSelectionActionTypes.UPDATE_AMOUNT,
                        payload: 1
                    },
                    b: {
                        type: UserSelectionActionTypes.UPDATE_QUOTE_CCY,
                        payload: fakeEuro
                    },
                    c: {
                        type: UserSelectionActionTypes.UPDATE_BASE_CCY,
                        payload: fakeDollar
                    }
                });
                const result = createUserSelection(intentStream$);
                expectObservable(result).toBe('ab-c-d', {
                    a: userSelectionInitialState,
                    b: {
                        amount: 1,
                        quoteCurrency: userSelectionInitialState.quoteCurrency,
                        baseCurrency: userSelectionInitialState.baseCurrency
                    },
                    c: {
                        amount: 1,
                        quoteCurrency: fakeEuro,
                        baseCurrency: userSelectionInitialState.baseCurrency
                    },
                    d: {
                        amount: 1,
                        quoteCurrency: fakeEuro,
                        baseCurrency: fakeDollar
                    }
                });
            });
        });

        it('Skips unknown actions', () => {
            scheduler.run((helpers: any) => {
                const { cold, expectObservable } = helpers;
                const intentStream$ = cold('-a-b-c', {
                    a: {
                        type: UserSelectionActionTypes.UPDATE_AMOUNT,
                        payload: 1
                    },
                    b: {
                        type: 'Random action',
                        payload: 'USD'
                    },
                    c: {
                        type: UserSelectionActionTypes.UPDATE_QUOTE_CCY,
                        payload: fakeEuro
                    }
                });
                const result = createUserSelection(intentStream$);
                expectObservable(result).toBe('ab---c', {
                    a: userSelectionInitialState,
                    b: {
                        amount: 1,
                        baseCurrency: userSelectionInitialState.baseCurrency,
                        quoteCurrency: userSelectionInitialState.quoteCurrency
                    },
                    c: {
                        amount: 1,
                        quoteCurrency: fakeEuro,
                        baseCurrency: userSelectionInitialState.baseCurrency
                    }
                });
            });
        });

        it('Only emits when the values are new', () => {
            scheduler.run((helpers: any) => {
                const { cold, expectObservable } = helpers;
                const intentStream$ = cold('-a-b-c-d-e-f', {
                    a: {
                        type: UserSelectionActionTypes.UPDATE_AMOUNT,
                        payload: 1
                    },
                    b: {
                        type: UserSelectionActionTypes.UPDATE_AMOUNT,
                        payload: 1
                    },
                    c: {
                        type: UserSelectionActionTypes.UPDATE_QUOTE_CCY,
                        payload: fakeEuro
                    },
                    d: {
                        type: UserSelectionActionTypes.UPDATE_QUOTE_CCY,
                        payload: fakeEuro
                    },
                    e: {
                        type: UserSelectionActionTypes.UPDATE_BASE_CCY,
                        payload: fakeDollar
                    },
                    f: {
                        type: UserSelectionActionTypes.UPDATE_BASE_CCY,
                        payload: fakeDollar
                    }
                });
                const result = createUserSelection(intentStream$);
                expectObservable(result).toBe('ab---c---d', {
                    a: userSelectionInitialState,
                    b: {
                        amount: 1,
                        baseCurrency: userSelectionInitialState.baseCurrency,
                        quoteCurrency: userSelectionInitialState.quoteCurrency
                    },
                    c: {
                        amount: 1,
                        baseCurrency: userSelectionInitialState.baseCurrency,
                        quoteCurrency: fakeEuro
                    },
                    d: {
                        amount: 1,
                        quoteCurrency: fakeEuro,
                        baseCurrency: fakeDollar
                    }
                });
            });
        });
    });
});
