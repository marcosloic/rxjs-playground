import React from 'react';
import './styles.scss';
import { SelectionInput } from '../SelectInput/SelectionInput';
import { useObservable } from '../../utils/useObservable';
import { selectableCurrencies$ } from '../../models/selectableCurrencies';
import {
    baseCurrency$,
    quoteCurrency$,
    selectedAmount$,
    updateAmount,
    updateBase,
    updateQuote,
    userMode$
} from '../../models/userSelection';
import { loadCurrencyExchangeRate$ } from '../../models/currencyExchangeRate';
import { loadDailyTimeSeries$ } from '../../models/dailyTimeSeries';

type SelectionFormPropTypes = {};

export const SelectionForm: React.FunctionComponent<
    SelectionFormPropTypes
> = React.memo(props => {
    const currencies = useObservable(selectableCurrencies$, []);
    const amount = useObservable(selectedAmount$, 0);
    const onNumberChange = React.useCallback(evt => {
        updateAmount(evt.target.value);
    }, []);

    const onSubmit = React.useCallback(evt => {
        evt.preventDefault();
        loadCurrencyExchangeRate$.next();
        loadDailyTimeSeries$.next();
        userMode$.next('result');
    }, []);
    return (
        <div className={'selectionForm'}>
            <form onSubmit={onSubmit}>
                I've got
                <input
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={onNumberChange}
                />
                in
                <SelectionInput
                    options={currencies}
                    onValueChange={updateBase}
                    value={baseCurrency$}
                />
                and I want to see how it compares to
                <SelectionInput
                    options={currencies}
                    onValueChange={updateQuote}
                    value={quoteCurrency$}
                />
                <div className="button">
                    <button type="submit">Show me the results</button>
                </div>
            </form>
        </div>
    );
});

SelectionForm.displayName = 'SelectionForm';
