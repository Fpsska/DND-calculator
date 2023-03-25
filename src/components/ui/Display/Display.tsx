import React from 'react';

import { useAppSelector } from 'app/hooks';

import { makeNumberRounding } from 'utils/helpers/makeNumberRounding';

import './display.scss';

// /. imports

const Display: React.FC<{ isDisabled: boolean }> = ({ isDisabled }) => {
    const { currentValue } = useAppSelector(state => state.calculatorSlice);

    const isPlaceholderValue = isDisabled || !currentValue;

    // /. hooks

    return (
        <div className="display">
            <span>
                {isPlaceholderValue
                    ? '0'
                    : makeNumberRounding(currentValue, 17)}
            </span>
        </div>
    );
};

export default Display;
