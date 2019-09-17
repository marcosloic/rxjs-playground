import { SelectedFilters, selectedFilters$ } from './selectedFilters';
import { combineLatest, Observable } from 'rxjs';
import { map, share, startWith } from 'rxjs/operators';
import { ApiData } from '../types/ApiData.interface';
import { filterArrayOnParameters } from '../utils/filterArrayOnParameters';
import { isEmptyObject } from '../utils/isEmptyObject';
import { trafficMeisterData$ } from '../api/trafficMeiserData';

export const createTableData = (
    initialData$: Observable<ApiData[]>,
    filters$: Observable<SelectedFilters>
): Observable<ApiData[]> => {
    const initialisedFilters$ = filters$.pipe(startWith({}));

    const sink$ = combineLatest([initialData$, initialisedFilters$]).pipe(
        map(data => {
            const [tableData, filters] = data;
            if (isEmptyObject(filters)) {
                return tableData;
            }
            return filterArrayOnParameters(tableData, filters);
        }),
        share()
    );
    return sink$;
};

export const tableData$ = createTableData(
    trafficMeisterData$,
    selectedFilters$
);
