import React from 'react';

import { useAppSelector } from 'app/hooks';

import ModeSwitcher from 'components/ui/ModeSwitcher/ModeSwitcher';

import Calculator from '../Calculator/Calculator';
import Constructor from '../Constructor/Constructor';

import 'assets/styles/style.scss';
import './App.css';

// /. imports

const App: React.FC = () => {
    const { a_number, b_number, currentAction } = useAppSelector(
        state => state.calculatorSlice
    );

    // /. hooks

    return (
        <div className="App">
            <div className="page unselectable">
                <div className="page__wrapper">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span>AC: {currentAction}</span>
                        <span>a: {a_number}</span>
                        <span>b: {b_number}</span>
                    </div>
                    <div className="page__controls">
                        <ModeSwitcher />
                    </div>
                    <div className="page__preview">
                        <Calculator additionalClass="page__calculator" />
                        <Constructor additionalClass="page__constructor" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
