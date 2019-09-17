import { Observable } from 'rxjs';
import { ApiData } from '../types/ApiData.interface';

declare var window: Window;

/*
 Bridges the callback-style API call to an observable
 */

export const trafficMeisterWrapper$: Observable<ApiData[]> = new Observable(
    observer => {
        (window as any).trafficMeister.fetchData((err: any, data: any) => {
            if (err) {
                observer.error(err);
            } else {
                observer.next(data);
                observer.complete();
            }
        });
    }
);
