import { TestScheduler } from 'rxjs/testing';
import { createStateFromPromise } from './createStateFromPromise';
import { of, Subject } from 'rxjs';

describe('The createStateFromPromise function', () => {
    let scheduler: any = null;
    beforeEach(() => {
        scheduler = new TestScheduler((a, b) => expect(a).toEqual(b));
    });
    /*
    This test suite is written in a more regular way instead of using the rxjs testScheduler, which doesn't
    work well when creating sequences with a mix of promises in it. They aren't as elegant but they work.
     */

    describe('When created with a base request, a loading intent and argument streams', () => {
        describe('When the loading intent emits', () => {
            it('Makes a request when the intent is triggered', done => {
                const loadingIntent$ = new Subject();
                const request = jest.fn();
                const firstArg$ = of('firstArg');
                const secondArg$ = of('secondArg');

                const result = createStateFromPromise(
                    request,
                    firstArg$,
                    secondArg$,
                    loadingIntent$
                );
                result.subscribe();
                expect(request).not.toHaveBeenCalled();
                loadingIntent$.next();
                expect(request).toHaveBeenCalledWith('firstArg', 'secondArg');
                done();
            });
            it('Returns an initial state', done => {
                const loadingIntent$ = new Subject();
                const request = jest.fn().mockResolvedValue('My response');
                const firstArg$ = of('firstArg');
                const secondArg$ = of('secondArg');

                const result = createStateFromPromise(
                    request,
                    firstArg$,
                    secondArg$,
                    loadingIntent$
                );
                const responses: any[] = [];
                result.subscribe(data => {
                    responses.push(data);
                });
                loadingIntent$.next();
                expect(responses.length).toBe(1);
                expect(responses[0]).toStrictEqual({
                    isLoading: true,
                    data: null,
                    error: null
                });
                done();
            });

            it('Returns an error state', done => {
                const loadingIntent$ = new Subject();
                const request = jest.fn().mockRejectedValue('Error');
                const firstArg$ = of('firstArg');
                const secondArg$ = of('secondArg');

                const result = createStateFromPromise(
                    request,
                    firstArg$,
                    secondArg$,
                    loadingIntent$
                );
                const responses: any[] = [];
                result.subscribe(data => {
                    responses.push(data);
                    if (responses.length === 2) {
                        expect(responses.length).toBe(2);
                        expect(responses[1]).toStrictEqual({
                            isLoading: false,
                            data: null,
                            error: 'Error'
                        });
                        done();
                    }
                });
                loadingIntent$.next();
            });

            it('Returns the API response', done => {
                const loadingIntent$ = new Subject();
                const request = jest.fn().mockResolvedValue('Result');
                const firstArg$ = of('firstArg');
                const secondArg$ = of('secondArg');

                const result = createStateFromPromise(
                    request,
                    firstArg$,
                    secondArg$,
                    loadingIntent$
                );
                const responses: any[] = [];
                result.subscribe(data => {
                    responses.push(data);
                    if (responses.length === 2) {
                        expect(responses.length).toBe(2);
                        expect(responses[1]).toStrictEqual({
                            isLoading: false,
                            data: 'Result',
                            error: null
                        });
                        done();
                    }
                });
                loadingIntent$.next();
            });
        });
    });
});
