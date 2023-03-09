import React from 'react';

import Section from '../Section/Section';

import { operators, numbers, others } from '../../../context/db';

import 'assets/styles/style.scss';
import './App.css';

// /. imports

const App: React.FC = () => {
    return (
        <div className="App">
            <div className="page">
                <div className="storage">
                    <div className="storage__wrapper">
                        <Section role="section_display" />
                        <Section
                            role="section_operators"
                            data={operators}
                        />
                        <Section
                            role="section_numbers"
                            data={numbers}
                        />
                        <Section
                            role="section_others"
                            data={others}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
