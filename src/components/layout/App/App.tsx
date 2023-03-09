import React from 'react';

import Display from 'components/ui/Display/Display';

import Button from 'components/ui/Button/Button';

import Section from '../Section/Section';

import { operators, numbers } from '../../../context/db';

import 'assets/styles/style.scss';
import './App.css';

// /. imports

const App: React.FC = () => {
    return (
        <div className="App">
            <div className="page">
                <div className="storage">
                    <div className="storage__wrapper">
                        <Section role="section_display">
                            <Display />
                        </Section>
                        <Section
                            role="section_operators"
                            data={operators}
                        />
                        <Section
                            role="section_numbers"
                            data={numbers}
                        />
                        <Section role="section_others">
                            <Button
                                role="button_equal"
                                symbol="="
                            />
                        </Section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
