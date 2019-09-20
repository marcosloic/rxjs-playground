import { DailyTimeSeriesResponse } from './types/DailyTimeSeriesResponse';
import { DailyTimeSeries, Series } from '../types/DailyTimeSeries';
import { CurrencyExchangeRateResponse } from './types/CurrencyExchangeRateResponse';
import { CurrencyExchangeRate } from '../types/CurrencyExchangeRate';

export const normaliseDailyTimeSeries = (
    data: DailyTimeSeriesResponse
): DailyTimeSeries => {
    const sourceMetadata = data['Meta Data'];
    const sourceSeries = data['Time Series FX (Daily)'];

    const metadata = {
        information: sourceMetadata['1. Information'],
        baseSymbol: sourceMetadata['2. From Symbol'],
        quoteSymbol: sourceMetadata['3. To Symbol'],
        lastRefreshed: sourceMetadata['5. Last Refreshed'],
        timezone: sourceMetadata['6. Time Zone']
    };

    const series = Object.entries(sourceSeries).reduce(
        (acc, val) => {
            const [key, value] = val;
            acc[key] = {
                open: value['1. open'],
                high: value['2. high'],
                low: value['3. low'],
                close: value['4. close']
            };
            return acc;
        },
        {} as Series
    );

    return {
        metadata,
        series
    };
};

export const normaliseCurrencyExchangeRate = (
    data: CurrencyExchangeRateResponse
): CurrencyExchangeRate => {
    const source = data['Realtime Currency Exchange Rate'];
    return {
        baseCurrencyCode: source['1. From_Currency Code'],
        baseCurrencyName: source['2. From_Currency Name'],
        quoteCurrencyCode: source['3. To_Currency Code'],
        quoteCurrencyName: source['4. To_Currency Name'],
        rate: source['5. Exchange Rate'],
        lastRefreshed: source['6. Last Refreshed'],
        timezone: source['7. Time Zone'],
        bid: source['8. Bid Price'],
        ask: source['9. Ask Price']
    };
};
