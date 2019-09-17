import { Observable, Subject } from 'rxjs';
import { scan, share } from 'rxjs/operators';

export const filterActionTypes = {
    CLEAR: 'clear',
    ADD: 'add'
};

export type UpdateFiltersIntent = {
    actionType: string;
    filter?: string;
    value?: string;
};

export type SelectedFilters = {
    [k: string]: string;
};

export const createSelectedFilters = (
    messageBus$: Subject<UpdateFiltersIntent>
): Observable<SelectedFilters> => {
    const sink$ = messageBus$.pipe(
        scan((acc, payload) => {
            const { actionType, filter, value } = payload;

            if (actionType === filterActionTypes.CLEAR) {
                return {};
            }
            if (!filter || !value) {
                return acc;
            }
            const newAcc = Object.assign({}, acc);
            newAcc[filter] = value;
            return newAcc;
        }, {}),
        share()
    );
    return sink$;
};

export const updateFiltersIntent$ = new Subject<UpdateFiltersIntent>();

export const selectedFilters$ = createSelectedFilters(updateFiltersIntent$);
