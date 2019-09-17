import React from 'react';
import './styles.scss';
import { Observable } from 'rxjs';
import { useObservable } from '../../utils/useObservable';

type LoaderPropTypes = {
    isLoading$: Observable<boolean>;
};

export const Loader: React.FunctionComponent<LoaderPropTypes> = React.memo(
    props => {
        const { isLoading$ } = props;
        const isLoading = useObservable(isLoading$);
        return (
            <React.Fragment>
                {isLoading && <div className={'loader'} />}
            </React.Fragment>
        );
    }
);

Loader.displayName = 'Loader';
