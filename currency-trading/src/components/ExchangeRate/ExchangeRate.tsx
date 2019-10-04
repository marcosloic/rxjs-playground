import { Observable } from 'rxjs';
import { AsyncState } from '../../utils/createStateFromPromise';
import { CurrencyExchangeRate } from '../../types/CurrencyExchangeRate';
import { useObservable } from '../../utils/useObservable';
import React from 'react';
import { ExchangeRateResult } from '../ExchangeRateResult/ExchangeRateResult';
import './styles.scss';

type ExchangeRatePropTypes = {
    currencyExchangeRate$: Observable<AsyncState<CurrencyExchangeRate>>;
    amount$: Observable<any>;
};

export const ExchangeRate: React.FunctionComponent<
    ExchangeRatePropTypes
> = React.memo(props => {
    const { currencyExchangeRate$, amount$ } = props;
    const amount = useObservable(amount$);
    const currencyRateState = useObservable(currencyExchangeRate$, {});
    const { data } = currencyRateState;
    if (currencyRateState.isLoading) {
        return <p>Loading the conversion rates...</p>;
    }
    return (
        <div className={'exchangeRate'}>
            {data && <ExchangeRateResult data={data} amount={amount} />}
        </div>
    );
});
