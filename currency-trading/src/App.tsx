import React from 'react';
import './App.scss';
import { SelectionForm } from './components/SelectionForm/SelectionForm';
import { Result } from './components/Result/Result';
import { userMode$ } from './models/userSelection';
import { useObservable } from './utils/useObservable';

const App: React.FC = React.memo(() => {
    const userMode = useObservable(userMode$);
    return (
        <div className="App">
            {userMode !== 'result' && (
                <div className={'form'}>
                    <SelectionForm />
                </div>
            )}
            {userMode === 'result' && (
                <div className={'result'}>
                    <Result />
                </div>
            )}
        </div>
    );
});

export default App;
