import {
    distinctUntilChanged,
    finalize,
    map,
    mapTo,
    mergeAll,
    retryWhen,
    startWith,
    switchMap,
    tap
} from 'rxjs/operators';
import { merge, Observable, Subject } from 'rxjs';
import { trafficMeisterWrapper$ } from './trafficMeisterWrapper';
import { ApiData } from '../types/ApiData.interface';

export const createTrafficMeisterData = (
    wrapper$,
    errorStream$,
    reloadIntent$,
    finishedLoadingState$
): Observable<ApiData[]> => {
    const sink$ = wrapper$.pipe(
        // When the api wrapper emits an error, propagate the error, stop loading
        // Wait for the reloadIntent to emit to try and reload
        retryWhen(errors => {
            return errors.pipe(
                tap(error => {
                    errorStream$.next(error);
                    finishedLoadingState$.next(true);
                }),
                switchMap(() => reloadIntent$)
            );
        }),
        finalize(() => {
            finishedLoadingState$.next(true);
            errorStream$.next(false);
        })
    );
    return sink$;
};

export const loadDataIntent$ = new Subject<void>();
export const loaded$ = new Subject<boolean>();
export const error$ = new Subject<boolean>();

export const isLoading$ = merge([
    loadDataIntent$.pipe(
        mapTo(true),
        startWith(true)
    ),
    loaded$.pipe(map(val => !val))
]).pipe(
    mergeAll(),
    distinctUntilChanged()
);

export const trafficMeisterData$ = createTrafficMeisterData(
    trafficMeisterWrapper$,
    error$,
    loadDataIntent$,
    loaded$
);
