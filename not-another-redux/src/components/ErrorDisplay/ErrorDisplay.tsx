import React from 'react';
import './styles.scss';
import { Observable } from 'rxjs';
import { useObservable } from '../../utils/useObservable';

type ErrorDisplayPropTypes = {
    isLoading$: Observable<boolean>;
    error$: Observable<boolean>;
    reloadData: () => void;
};

export const ErrorDisplay: React.FunctionComponent<
    ErrorDisplayPropTypes
> = React.memo(props => {
    const { reloadData, isLoading$, error$ } = props;
    const error = useObservable(error$);
    const isLoading = useObservable(isLoading$);
    const showError = error && !isLoading;
    if (!showError) {
        return null;
    }
    return (
        <div className={'errorDisplay'}>
            <h5 className={'title'}>You broke the internet!</h5>
            <button className={'button'} onClick={reloadData}>
                Click here to fix it
            </button>
        </div>
    );
});

ErrorDisplay.displayName = 'ErrorDisplay';
