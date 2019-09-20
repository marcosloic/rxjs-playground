import { useState, useLayoutEffect } from 'react';
import { Observable } from 'rxjs';

export const useObservable = <T>(
    observable$: Observable<T>,
    initialValue?: any
): T => {
    const [value, update] = useState(initialValue);

    useLayoutEffect(() => {
        const s = observable$.subscribe(update);
        return () => s.unsubscribe();
    }, [observable$]);

    return value;
};
