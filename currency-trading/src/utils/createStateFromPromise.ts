import {
    combineLatest,
    ConnectableObservable,
    from,
    Observable,
    of
} from 'rxjs';
import {
    catchError,
    map,
    publishReplay,
    startWith,
    switchMap,
    switchMapTo,
    take
} from 'rxjs/operators';

export type AsyncState<T> = {
    data: T | null;
    isLoading: boolean;
    error: string | null;
};

export const createStateFromPromise = <T>(
    request: (base: string, quote: string) => Promise<T>,
    firstArg$: Observable<string>,
    secondArg$: Observable<string>,
    loadIntent$: Observable<any>
): Observable<AsyncState<T>> => {
    const argumentStream$ = combineLatest([firstArg$, secondArg$]).pipe(
        take(1)
    );
    const sink$ = loadIntent$.pipe(
        switchMapTo(argumentStream$),
        switchMap(data => {
            const [a, b] = data;
            return from(request(a, b)).pipe(
                map((value: any) => {
                    return {
                        data: value,
                        isLoading: false,
                        error: null
                    };
                }),
                startWith({
                    data: null,
                    isLoading: true,
                    error: null
                }),
                catchError((error: string) => {
                    return of({
                        data: null,
                        isLoading: false,
                        error
                    });
                })
            );
        }),
        publishReplay(1)
    );
    (sink$ as ConnectableObservable<AsyncState<T>>).connect();
    return sink$;
};
