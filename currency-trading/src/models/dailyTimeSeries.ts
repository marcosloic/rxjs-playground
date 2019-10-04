import { Alphavantage } from '../api/alphavantage.api';
import { createStateFromPromise } from '../utils/createStateFromPromise';
import { baseCurrencySymbol$, quoteCurrencySymbol$ } from './userSelection';
import { Subject } from 'rxjs';

export const loadDailyTimeSeries$ = new Subject();

export const dailyTimeSeries$ = createStateFromPromise(
    Alphavantage.getDailyTimeSeries,
    baseCurrencySymbol$,
    quoteCurrencySymbol$,
    loadDailyTimeSeries$
);
