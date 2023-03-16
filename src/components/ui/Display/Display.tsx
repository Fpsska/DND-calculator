import React from 'react';

import { useAppSelector } from 'app/hooks';

import './display.scss';

// /. imports

const Display: React.FC = () => {
    const { currentValue } = useAppSelector(state => state.calculatorSlice);

    // /. hooks

    return (
        <div className="display">
            <span>{currentValue ? currentValue : '0'}</span>
        </div>
    );
};

export default Display;
