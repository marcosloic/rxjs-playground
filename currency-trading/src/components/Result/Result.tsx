import React from 'react';
import { dailyTimeSeries$ } from '../../models/dailyTimeSeries';
import { TimeSeries } from '../TimeSeries/TimeSeries';
import { ExchangeRate } from '../ExchangeRate/ExchangeRate';
import { currencyExchangeRate$ } from '../../models/currencyExchangeRate';
import { selectedAmount$, userMode$ } from '../../models/userSelection';
import './styles.scss';

type ResultPropTypes = {};

export const Result: React.FunctionComponent<ResultPropTypes> = React.memo(
    () => {
        const onClick = React.useCallback(() => {
            userMode$.next('select');
        }, []);
        return (
            <div className={'result'}>
                <ExchangeRate
                    currencyExchangeRate$={currencyExchangeRate$}
                    amount$={selectedAmount$}
                />
                <TimeSeries
                    dailyTimeSeries$={dailyTimeSeries$}
                    amount$={selectedAmount$}
                />
                <div className="button">
                    <button type="submit" onClick={onClick}>
                        Clear the results
                    </button>
                </div>
            </div>
        );
    }
);
