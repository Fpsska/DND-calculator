import React from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import {
    setCurrentValue,
    setCurrentAction,
    getCalculationValue,
    switchCalculatedStatus
} from 'app/slices/mainSlice';

import './button.scss';

// /. imports

interface propTypes {
    symbol: number | string;
    role: string;
    additionalClass?: string;
}

// /. interfaces

const Button: React.FC<propTypes> = ({ symbol, role, additionalClass }) => {
    const dispatch = useAppDispatch();

    const { currentAction, a_number, b_number } = useAppSelector(
        state => state.mainSlice
    );

    // /. hooks

    const makeCalculation = (): void => {
        dispatch(
            getCalculationValue({
                operation: currentAction,
                a: a_number,
                b: b_number
            })
        );
        dispatch(switchCalculatedStatus(true));
    };

    const onButtonClick = (e: any): void => {
        const innerTextValue = e.target.innerText;

        switch (role) {
            case 'number':
                dispatch(setCurrentValue({ value: innerTextValue }));
                console.log('number');
                break;
            case 'action':
                dispatch(
                    setCurrentAction({
                        arithmeticOperator: innerTextValue
                    })
                );
                console.log('action');
                break;
            case 'compute':
                if (currentAction) {
                    makeCalculation();
                    console.log('compute');
                }
                break;
            default:
                return;
        }
    };

    // /. functions

    return (
        <button
            className={`button ${additionalClass ? additionalClass : ''}`}
            type="button"
            onClick={e => onButtonClick(e)}
            data-role={role}
        >
            <span>{symbol}</span>
        </button>
    );
};

export default Button;
