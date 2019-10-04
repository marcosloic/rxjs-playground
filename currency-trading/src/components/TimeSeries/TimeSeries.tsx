import React from 'react';
import { Observable } from 'rxjs';
import { DailyTimeSeries } from '../../types/DailyTimeSeries';
import { useObservable } from '../../utils/useObservable';
import { AsyncState } from '../../utils/createStateFromPromise';
import LineChart from 'react-linechart';
import { normaliseDataForGraph } from '../../utils/normaliseDataForGraph';
import './styles.scss';

type TimeSeriesPropTypes = {
    dailyTimeSeries$: Observable<AsyncState<DailyTimeSeries>>;
    amount$: Observable<any>;
};

export const TimeSeries: React.FunctionComponent<
    TimeSeriesPropTypes
> = React.memo(props => {
    const { dailyTimeSeries$ } = props;
    const series = useObservable(dailyTimeSeries$, {});
    const orderedData = React.useMemo(() => {
        if (Object.keys(series).length === 0 || !series.data) {
            return null;
        }
        return [
            {
                color: '#ffe8e7',
                points: normaliseDataForGraph(series.data)
            }
        ];
    }, [series]);

    if (series.isLoading) {
        return <p>Loading the graph ...</p>;
    }

    if (!orderedData) {
        return null;
    }

    return (
        <div className={'timeSeries'}>
            <h1>Chart view</h1>
            <LineChart
                width={600}
                height={400}
                data={orderedData}
                xLabel={'Time'}
                yLabel={'Value'}
                pointRadius={2}
            />
        </div>
    );
});
