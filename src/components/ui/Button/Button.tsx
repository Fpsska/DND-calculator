import React from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import {
    setCurrentValue,
    setCurrentAction,
    getCalculationValue
} from 'app/slices/mainSlice';

import './button.scss';

// /. imports

interface propTypes {
    symbol: number | string;
    additionalClass?: string;
}

// /. interfaces

const Button: React.FC<propTypes> = ({ symbol, additionalClass }) => {
    const dispatch = useAppDispatch();

    const { currentAction, a_number, b_number } = useAppSelector(
        state => state.mainSlice
    );

    const isCalculatePossible = a_number && b_number && currentAction;

    // /. hooks

    const makeCalculation = (): void => {
        console.log('makeCalculation', currentAction);
        dispatch(
            getCalculationValue({
                operation: currentAction,
                a: a_number,
                b: b_number
            })
        );
    };

    const onButtonClick = (e: any): void => {
        console.log('cliked');
        const innerTextValue = e.target.innerText;
        dispatch(setCurrentValue({ value: innerTextValue }));
        dispatch(setCurrentAction({ arithmeticOperator: innerTextValue }));

        if (innerTextValue === '=' && isCalculatePossible) {
            makeCalculation();
        }
    };

    // /. functions

    return (
        <button
            className={`button ${additionalClass ? additionalClass : ''}`}
            type="button"
            onClick={e => onButtonClick(e)}
        >
            <span>{symbol}</span>
        </button>
    );
};

export default Button;
