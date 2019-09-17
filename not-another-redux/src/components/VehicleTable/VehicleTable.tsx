import React from 'react';
import { Vehicle } from '../Vehicle/Vehicle';
import './styles.scss';
import { useObservable } from '../../utils/useObservable';
import { Observable } from 'rxjs';
import { ApiData } from '../../types/ApiData.interface';

type VehicleTablePropTypes = {
    tableData$: Observable<ApiData[]>;
};

export const VehicleTable: React.FunctionComponent<
    VehicleTablePropTypes
> = React.memo(props => {
    const { tableData$ } = props;
    const tableData = useObservable(tableData$);
    if (!tableData || tableData.length === 0) {
        return null;
    }
    return (
        <div className={'vehicleTable'}>
            {tableData.map(data => (
                <Vehicle key={data.id} details={data} />
            ))}
        </div>
    );
});

VehicleTable.displayName = 'VehicleTable';
