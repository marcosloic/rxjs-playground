import currenciesList from '../constants/currencies.json';
import { baseCurrencySymbol$, quoteCurrencySymbol$ } from './userSelection';
import { combineLatest, Observable } from 'rxjs';
import { map, share, startWith } from 'rxjs/operators';

export type Currency = { symbol: string; name: string };

export const createAvailableCurrencies = (
    currencies: Currency[],
    baseCurrency: Observable<string>,
    quoteCurrency: Observable<string>
) => {
    const sink$ = combineLatest([baseCurrency, quoteCurrency]).pipe(
        map(currencyFilter => {
            const [base, quote] = currencyFilter;
            return currencies.filter(
                currency =>
                    currency.symbol !== base && currency.symbol !== quote
            );
        }),
        startWith(currencies),
        share()
    );
    return sink$;
};

export const selectableCurrencies$ = createAvailableCurrencies(
    currenciesList,
    baseCurrencySymbol$,
    quoteCurrencySymbol$
);
