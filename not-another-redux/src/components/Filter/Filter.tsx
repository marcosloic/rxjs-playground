import React from 'react';
import { FiltersState } from '../../models/filters';
import './styles.scss';

type FilterPropTypes = {
    title: keyof FiltersState;
    values: FiltersState[keyof FiltersState];
    onChangeCallback: ({ title, value }) => void;
};

export const Filter: React.FunctionComponent<FilterPropTypes> = React.memo(
    props => {
        const { title, values, onChangeCallback } = props;
        const valuesArray = Array.from(values);
        const onValueChange = React.useCallback(
            event => {
                onChangeCallback({ title, value: event.target.value });
            },
            [title, onChangeCallback]
        );
        const defaultSelectValue = `Pick some ${title}`;
        return (
            <div className="filter">
                <h5 className={'title'}>{title}</h5>
                <select onChange={onValueChange} defaultValue={'default'}>
                    <option disabled value={'default'}>
                        {defaultSelectValue}
                    </option>
                    {valuesArray.sort().map(value => (
                        <option key={value} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
);

Filter.defaultProps = {
    title: '',
    values: new Set(),
    onChangeCallback: () => {}
};

Filter.displayName = 'FiltersList';
