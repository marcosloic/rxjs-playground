export type DailyTimeSeries = {
    metadata: {
        information: string;
        baseSymbol: string;
        quoteSymbol: string;
        lastRefreshed: string;
        timezone: string;
    };
    series: Series;
};

export type Series = {
    [k: string]: {
        open: string;
        high: string;
        low: string;
        close: string;
    };
};
