import React from 'react';
import { CurrencyExchangeRate } from '../../types/CurrencyExchangeRate';
import './styles.scss';

type ExchangeRateResultPropTypes = {
    data: CurrencyExchangeRate;
    amount: number;
};

export const ExchangeRateResult: React.FunctionComponent<
    ExchangeRateResultPropTypes
> = React.memo(props => {
    const { baseCurrencyName, quoteCurrencyName, rate } = props.data;
    const { amount } = props;
    const convertedRate = React.useMemo(() => {
        // Floating point calculation ...
        return (amount * parseFloat(rate)).toFixed(5);
    }, [amount, rate]);
    return (
        <p className={'exchangeRateResult'}>
            <span>
                {amount} {baseCurrencyName}
            </span>
            , at a rate of <span>{rate}</span>, is equal to
            <span>{convertedRate}</span> in <span>{quoteCurrencyName}</span>
        </p>
    );
});
