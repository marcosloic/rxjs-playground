import { map, share, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiData } from '../types/ApiData.interface';
import { tableData$ } from './tableData';

export type FiltersState = {
    [k: string]: Set<string>;
};

/*
 The array of filters means we have some nested loops instead of lookups in the function below
 but it also means that the rest the code, down to the components, is dumb and unaware. We could also
 extend it to not only have a field name, but a type, some conditions, to generate something else than select inputs

 e.g. {field: colors, type: multi: condition: value => value.length < 3}

 ... to generate a select that lets you choose up to two colours
 */
export const filterList = ['colors', 'type', 'brand'];

export const createFiltersFromTableData = (
    availableFilters: string[],
    tableData: ApiData[]
): FiltersState => {
    const result = {};
    availableFilters.forEach(filter => {
        result[filter] = new Set();
        tableData.forEach(data => {
            const targetValue = data[filter];
            if (Array.isArray(targetValue)) {
                targetValue.map(x => result[filter].add(x));
            } else {
                result[filter].add(targetValue);
            }
        });
    });
    return result;
};

export const createFiltersList = (
    tableData$: Observable<ApiData[]>,
    filterList: string[]
) => {
    const sink$ = tableData$.pipe(
        map(tableData => createFiltersFromTableData(filterList, tableData)),
        startWith({}),
        share()
    );
    return sink$;
};

export const dataTableFilters$ = createFiltersList(tableData$, filterList);
