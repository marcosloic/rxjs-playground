import { createIsLoading, createTrafficMeisterData } from './trafficMeiserData';
import { Observable, Subject } from 'rxjs';

describe('The trafficMeisterDataModule', () => {
    describe('createTrafficMeisterData', () => {
        it('Triggers the error subject when it encounters an error', done => {
            const wrapper$ = new Observable(observer => {
                observer.error('oops');
            });
            const reloadIntent$ = new Subject();
            const errorStream = {
                next: jest.fn()
            };
            const loaded$ = {
                next: jest.fn()
            };
            const result$ = createTrafficMeisterData(
                wrapper$,
                errorStream,
                reloadIntent$,
                loaded$
            );
            const sub = result$.subscribe();
            expect(errorStream.next).toHaveBeenCalledWith('oops');
            sub.unsubscribe();
            done();
        });

        it('Tries to reload the data when the loadData intent is triggerer', done => {
            // This one is a bit of a hack. We're passing an observable that always throws
            // And we're checking that it threw a second time, and therefore has been called twice
            // when we trigger the reload$ subject
            // The testScheduler gets in a weird state when having interdependent streams like that
            const wrapper$ = new Observable(observer => {
                observer.error('oops');
            });
            const reloadIntent$ = new Subject();
            const errorStream = {
                next: jest.fn()
            };
            const loaded$ = {
                next: jest.fn()
            };
            const result$ = createTrafficMeisterData(
                wrapper$,
                errorStream,
                reloadIntent$,
                loaded$
            );
            const sub = result$.subscribe();
            expect(errorStream.next).toHaveBeenCalledTimes(1);
            reloadIntent$.next();
            expect(errorStream.next).toHaveBeenCalledTimes(2);
            sub.unsubscribe();
            done();
        });

        it('Triggers the loaded$ subject when the data is loaded', done => {
            const wrapper$ = new Observable(observer => {
                observer.complete();
            });
            const reloadIntent$ = new Subject();
            const errorStream = {
                next: jest.fn()
            };
            const loaded$ = {
                next: jest.fn()
            };
            const result$ = createTrafficMeisterData(
                wrapper$,
                errorStream,
                reloadIntent$,
                loaded$
            );
            const sub = result$.subscribe();
            expect(loaded$.next).toHaveBeenCalledTimes(1);
            sub.unsubscribe();
            done();
        });
    });
});
