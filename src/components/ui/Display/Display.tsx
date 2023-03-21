import React from 'react';

import { useAppSelector } from 'app/hooks';

import './display.scss';

// /. imports

const Display: React.FC<{ isDisabled: boolean }> = ({ isDisabled }) => {
    const { currentValue } = useAppSelector(state => state.calculatorSlice);

    const isPlaceholderValue = isDisabled || !currentValue;

    // /. hooks

    return (
        <div className="display">
            <span>{isPlaceholderValue ? '0' : currentValue}</span>
        </div>
    );
};

export default Display;
