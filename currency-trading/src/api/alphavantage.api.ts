import { API_KEY } from '../constants/api.key';
import { apiFunctions } from './alphavantage.constants';
import {
    normaliseCurrencyExchangeRate,
    normaliseDailyTimeSeries
} from './adapter';
import { DailyTimeSeries } from '../types/DailyTimeSeries';
import { CurrencyExchangeRate } from '../types/CurrencyExchangeRate';
import { ForexQuery } from '../interfaces/ForexQuery';

const baseUrl = 'https://www.alphavantage.co';

const query = (url: string, adapter: (data: any) => any): Promise<any> => {
    return fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data['Error Message']) {
                throw Error(data['Error Message']);
            }
            return data;
        })
        .then(data => adapter(data));
};

const getDailyTimeSeries = (
    baseCurrency: string,
    quoteCurrency: string
): Promise<DailyTimeSeries> => {
    const url = `${baseUrl}/query?function=${apiFunctions.FX_DAILY}&from_symbol=${baseCurrency}&to_symbol=${quoteCurrency}&apikey=${API_KEY}`;
    return query(url, normaliseDailyTimeSeries);
};

const getCurrencyExchangeRate = (
    baseCurrency: string,
    quoteCurrency: string
): Promise<CurrencyExchangeRate> => {
    const url = `${baseUrl}/query?function=${apiFunctions.CURRENCY_EXCHANGE_RATE}&from_currency=${baseCurrency}&to_currency=${quoteCurrency}&apikey=${API_KEY}`;
    return query(url, normaliseCurrencyExchangeRate);
};

/*
This could have been a class, but you can't implement an interface with static methods,
and I didn't see any reason to declare the two functions on the member, so this is a compromise that lets us
get the type validation
 */
export const Alphavantage: ForexQuery = {
    getDailyTimeSeries,
    getCurrencyExchangeRate
};
