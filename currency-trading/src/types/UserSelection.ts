import { Currency } from '../models/selectableCurrencies';

export type UserSelection = {
    baseCurrency: Currency;
    quoteCurrency: Currency;
    amount: number;
};
