import { DailyTimeSeries } from '../types/DailyTimeSeries';
import { CurrencyExchangeRate } from '../types/CurrencyExchangeRate';

export interface ForexQuery {
    getDailyTimeSeries(base: string, quote: string): Promise<DailyTimeSeries>;

    getCurrencyExchangeRate(
        base: string,
        quote: string
    ): Promise<CurrencyExchangeRate>;
}
