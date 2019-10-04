export type DailyTimeSeriesResponse = {
    'Meta Data': {
        '1. Information': string;
        '2. From Symbol': string;
        '3. To Symbol': string;
        '4. Output Size': string;
        '5. Last Refreshed': string;
        '6. Time Zone': string;
    };
    'Time Series FX (Daily)': TimeSeries;
};

export type TimeSeries = {
    [k: string]: {
        '1. open': string;
        '2. high': string;
        '3. low': string;
        '4. close': string;
    };
};
