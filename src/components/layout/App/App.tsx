import React from 'react';

import Button from 'components/ui/Button/Button';

import Display from 'components/ui/Display/Display';

import Placeholder from 'components/ui/Placeholder/Placeholder';

import ModeSwitcher from 'components/ui/ModeSwitcher/ModeSwitcher';

import Section from '../Section/Section';

import { operators, numbers } from '../../../context/db';

import 'assets/styles/style.scss';
import './App.css';

// /. imports

const App: React.FC = () => {
    return (
        <div className="App">
            <div className="page">
                <div className="page__wrapper">
                    <div className="page__controls">
                        <ModeSwitcher />
                    </div>
                    <div className="page__preview">
                        <div className="page__storage storage">
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
