import {
    normaliseCurrencyExchangeRate,
    normaliseDailyTimeSeries
} from './adapter';
import { dailyTimeSeriesMock } from './__mocks__/dailyTimeSeries.mock';
import { currencyExchangeRateMock } from './__mocks__/currencyExchangeRate.mock';

describe('The alphavatantage adapter', () => {
    describe('The normaliseDailyTimeSeries function', () => {
        describe('When passed an alphavantage timeSeries response', () => {
            it('normalises it to a dailyTimeSeries', () => {
                const result = normaliseDailyTimeSeries(dailyTimeSeriesMock);
                const expectedResult = {
                    metadata: {
                        baseSymbol: 'EUR',
                        information:
                            'Forex Daily Prices (open, high, low, close)',
                        lastRefreshed: '2019-09-19 20:55:00',
                        quoteSymbol: 'USD',
                        timezone: 'GMT+8'
                    },
                    series: {
                        '2019-09-17': {
                            close: '1.1071',
                            high: '1.1075',
                            low: '1.0989',
                            open: '1.1005'
                        },
                        '2019-09-18': {
                            close: '1.1031',
                            high: '1.1076',
                            low: '1.1012',
                            open: '1.1071'
                        },
                        '2019-09-19': {
                            close: '1.1066',
                            high: '1.1074',
                            low: '1.1012',
                            open: '1.1061'
                        }
                    }
                };
                expect(result).toStrictEqual(expectedResult);
            });
        });
    });

    describe('The normaliseCurrencyExchangeRate function', () => {
        describe('When passed an alphavantage currencyExchangeRate response', () => {
            it('Normalises it to a currencyRateExchange', () => {
                const result = normaliseCurrencyExchangeRate(
                    currencyExchangeRateMock
                );
                const expectedResult = {
                    ask: '107.97000000',
                    baseCurrencyCode: 'USD',
                    baseCurrencyName: 'United States Dollar',
                    bid: '107.97000000',
                    lastRefreshed: '2019-09-19 13:01:47',
                    quoteCurrencyCode: 'JPY',
                    quoteCurrencyName: 'Japanese Yen',
                    rate: '107.97000000',
                    timezone: 'UTC'
                };
                expect(result).toStrictEqual(expectedResult);
            });
        });
    });
});
