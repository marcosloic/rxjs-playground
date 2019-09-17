import React from 'react';
import './App.scss';
import { dataTableFilters$ } from './models/filters';
import { FiltersList } from './components/FiltersList/FiltersList';
import './App.scss';
import { error$, isLoading$, loadDataIntent$ } from './api/trafficMeiserData';
import { VehicleTable } from './components/VehicleTable/VehicleTable';
import { ErrorDisplay } from './components/ErrorDisplay/ErrorDisplay';
import { Loader } from './components/Loader/Loader';
import { tableData$ } from './models/tableData';
import { selectedFilters$ } from './models/selectedFilters';

const App = () => {
    const reloadData = React.useCallback(() => {
        loadDataIntent$.next();
    }, []);
    return (
        <div className="App">
            <div className={'banner'} />
            <div className={'body'}>
                <Loader isLoading$={isLoading$} />
                <FiltersList
                    filters$={dataTableFilters$}
                    selectedFilters$={selectedFilters$}
                />
                <VehicleTable tableData$={tableData$} />
                <ErrorDisplay
                    isLoading$={isLoading$}
                    error$={error$}
                    reloadData={reloadData}
                />
            </div>
        </div>
    );
};

export default App;
