import React from 'react';
import { FiltersState } from '../../models/filters';
import { Filter } from '../Filter/Filter';
import './styles.scss';
import {
    filterActionTypes,
    SelectedFilters,
    updateFiltersIntent$
} from '../../models/selectedFilters';
import { useObservable } from '../../utils/useObservable';
import { Observable } from 'rxjs';

type FiltersListPropTypes = {
    filters$: Observable<FiltersState>;
    selectedFilters$: Observable<SelectedFilters>;
};

export const FiltersList: React.FunctionComponent<
    FiltersListPropTypes
> = React.memo(props => {
    const { filters$, selectedFilters$ } = props;
    const onButtonClick = React.useCallback(() => {
        updateFiltersIntent$.next({ actionType: filterActionTypes.CLEAR });
    }, []);
    const onChangeCallback = React.useCallback(({ title, value }) => {
        updateFiltersIntent$.next({
            actionType: filterActionTypes.ADD,
            filter: title as string,
            value: value
        });
    }, []);

    const filters = useObservable(filters$, {});
    const selectedFilters = useObservable(selectedFilters$);
    const filtersArray = Object.entries(filters);
    const shouldDisplay = filtersArray && filtersArray.length > 0;
    const shouldDisplayButton =
        selectedFilters && Object.keys(selectedFilters).length > 0;
    if (!shouldDisplay) {
        return null;
    }
    return (
        <div className={'filtersList'}>
            <div className={'list'}>
                {filtersArray.map(filter => {
                    const [title, values] = filter;
                    return (
                        <Filter
                            key={title}
                            title={title}
                            values={values}
                            onChangeCallback={onChangeCallback}
                        />
                    );
                })}
            </div>
            {shouldDisplayButton && (
                <button className={'button'} onClick={onButtonClick}>
                    Reset filters
                </button>
            )}
        </div>
    );
});

FiltersList.displayName = 'FiltersList';
