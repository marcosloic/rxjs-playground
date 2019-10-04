import { ConnectableObservable, Observable, Subject } from 'rxjs';
import {
    distinctUntilChanged,
    pluck,
    publishReplay,
    scan,
    startWith
} from 'rxjs/operators';
import { UserSelection } from '../types/UserSelection';
import { Currency } from './selectableCurrencies';
import { defaultBase, defaultQuote } from '../constants/currencies.constants';

export enum UserSelectionActionTypes {
    UPDATE_AMOUNT = 'UPDATE_AMOUNT',
    UPDATE_BASE_CCY = 'UPDATE_BASE_CCY',
    UPDATE_QUOTE_CCY = 'UPDATE_QUOTE_CCY'
}

export type UserSelectionIntent = {
    type: UserSelectionActionTypes;
    payload: number | Currency;
};

export const userSelectionInitialState: UserSelection = {
    amount: 100,
    baseCurrency: defaultBase,
    quoteCurrency: defaultQuote
};

export const userMode$ = new Subject<'select' | 'result'>();

export const createUserSelection = (
    updateIntent$: Subject<UserSelectionIntent>
) => {
    const sink$ = updateIntent$.pipe(
        scan((acc, val) => {
            const { type, payload } = val;
            switch (type) {
                /*
                For these, we could blindly return a new state and use the distinctUntilChanged with a custom comparator function
                to do a deep comparison. It would avoid duplication, but is also a bit more expensive, and would also require to
                test for the existence of all the properties, e.g: a && b && a.amount && b.amount, in one place
                */
                case UserSelectionActionTypes.UPDATE_AMOUNT: {
                    if (acc.amount === payload) {
                        return acc;
                    }
                    const newState = Object.assign({}, acc);
                    newState.amount = payload as number;
                    return newState;
                }
                case UserSelectionActionTypes.UPDATE_BASE_CCY: {
                    const { symbol } = payload as Currency;
                    if (acc.baseCurrency.symbol === symbol) {
                        return acc;
                    }
                    const newState = Object.assign({}, acc);
                    newState.baseCurrency = payload as Currency;
                    return newState;
                }
                case UserSelectionActionTypes.UPDATE_QUOTE_CCY: {
                    const { symbol } = payload as Currency;
                    if (acc.quoteCurrency.symbol === symbol) {
                        return acc;
                    }
                    const newState = Object.assign({}, acc);
                    newState.quoteCurrency = payload as Currency;
                    return newState;
                }
                default: {
                    return acc;
                }
            }
        }, userSelectionInitialState),
        startWith(userSelectionInitialState),
        distinctUntilChanged(),
        publishReplay(1)
    );

    (sink$ as ConnectableObservable<UserSelection>).connect();

    return sink$;
};

export const updateUserSelectionIntent$ = new Subject<UserSelectionIntent>();

export const updateAmount = (val: number) =>
    updateUserSelectionIntent$.next({
        type: UserSelectionActionTypes.UPDATE_AMOUNT,
        payload: val
    });

export const updateBase = (payload: Currency) =>
    updateUserSelectionIntent$.next({
        type: UserSelectionActionTypes.UPDATE_BASE_CCY,
        payload
    });

export const updateQuote = (payload: Currency) =>
    updateUserSelectionIntent$.next({
        type: UserSelectionActionTypes.UPDATE_QUOTE_CCY,
        payload
    });

export const userSelectionState$: Observable<
    UserSelection
> = createUserSelection(updateUserSelectionIntent$);

export const baseCurrency$ = userSelectionState$.pipe(
    pluck('baseCurrency'),
    distinctUntilChanged()
);

export const quoteCurrency$ = userSelectionState$.pipe(
    pluck('quoteCurrency'),
    distinctUntilChanged()
);

export const selectedAmount$ = userSelectionState$.pipe(
    pluck('amount'),
    distinctUntilChanged()
);

export const baseCurrencySymbol$ = baseCurrency$.pipe(pluck('symbol'));
export const quoteCurrencySymbol$ = quoteCurrency$.pipe(pluck('symbol'));
