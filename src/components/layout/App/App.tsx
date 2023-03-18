import React from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import Placeholder from 'components/ui/Placeholder/Placeholder';

import ModeSwitcher from 'components/ui/ModeSwitcher/ModeSwitcher';

import Section from '../Section/Section';

import {
    displayData,
    equalData,
    operatorsData,
    numbersData
} from '../../../context/db';

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
            <div className="page">
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
                        <div className="page__storage storage">
                            <div className="storage__wrapper">
                                <Section
                                    role="section_display"
                                    data={displayData}
                                />
                                <Section
                                    role="section_operators"
                                    data={operatorsData}
                                />
                                <Section
                                    role="section_numbers"
                                    data={numbersData}
                                />
                                <Section
                                    role="section_compute"
                                    data={equalData}
                                />
                            </div>
                        </div>
                        <div className="page__constructor constructor empty">
                            <div className="constructor__wrapper">
                                <Placeholder />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
