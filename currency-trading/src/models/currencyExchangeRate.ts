import { Alphavantage } from '../api/alphavantage.api';
import { createStateFromPromise } from '../utils/createStateFromPromise';
import { baseCurrencySymbol$, quoteCurrencySymbol$ } from './userSelection';
import { Subject } from 'rxjs';

export const loadCurrencyExchangeRate$ = new Subject();

export const currencyExchangeRate$ = createStateFromPromise(
    Alphavantage.getCurrencyExchangeRate,
    baseCurrencySymbol$,
    quoteCurrencySymbol$,
    loadCurrencyExchangeRate$
);
