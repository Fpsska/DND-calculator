import React from 'react';

import ModeSwitcher from 'components/ui/ModeSwitcher/ModeSwitcher';

import Calculator from '../Calculator/Calculator';
import Constructor from '../Constructor/Constructor';

import 'assets/styles/style.scss';
import './App.css';

// /. imports

const App: React.FC = () => {
    return (
        <div className="App">
            <div className="page unselectable">
                <div className="page__wrapper">
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
