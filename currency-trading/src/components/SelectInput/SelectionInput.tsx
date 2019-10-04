import React from 'react';
import { Observable } from 'rxjs';
import { useObservable } from '../../utils/useObservable';
import { Currency } from '../../models/selectableCurrencies';

type SelectionInputPropTypes = {
    options: any[];
    onValueChange: (val: Currency) => void;
    value: Observable<Currency>;
};

export const SelectionInput: React.FunctionComponent<
    SelectionInputPropTypes
> = React.memo(props => {
    const { onValueChange, options, value } = props;
    const inputValue = useObservable(value, {});

    const selectCallback = React.useCallback(
        evt => {
            const optionIdx = evt.target.value;
            onValueChange(options[optionIdx]);
        },
        [options, onValueChange]
    );
    const selected = inputValue;
    return (
        <select onChange={selectCallback} value={selected.symbol}>
            <option className={'option'} value={'default'}>
                {selected.symbol}
            </option>
            {options.map((value, idx) => (
                <option key={value.symbol} value={idx} className={'option'}>
                    {value.symbol}
                </option>
            ))}
        </select>
    );
});

SelectionInput.displayName = 'SelectionInput';
