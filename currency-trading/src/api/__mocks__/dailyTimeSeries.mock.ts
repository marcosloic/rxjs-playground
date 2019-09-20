import { DailyTimeSeriesResponse } from '../types/DailyTimeSeriesResponse';

export const dailyTimeSeriesMock: DailyTimeSeriesResponse = {
    'Meta Data': {
        '1. Information': 'Forex Daily Prices (open, high, low, close)',
        '2. From Symbol': 'EUR',
        '3. To Symbol': 'USD',
        '4. Output Size': 'Compact',
        '5. Last Refreshed': '2019-09-19 20:55:00',
        '6. Time Zone': 'GMT+8'
    },
    'Time Series FX (Daily)': {
        '2019-09-19': {
            '1. open': '1.1061',
            '2. high': '1.1074',
            '3. low': '1.1012',
            '4. close': '1.1066'
        },
        '2019-09-18': {
            '1. open': '1.1071',
            '2. high': '1.1076',
            '3. low': '1.1012',
            '4. close': '1.1031'
        },
        '2019-09-17': {
            '1. open': '1.1005',
            '2. high': '1.1075',
            '3. low': '1.0989',
            '4. close': '1.1071'
        }
    }
};
