import React from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import {
    setCurrentValue,
    setCurrentAction,
    makeCalculation
} from 'app/slices/calculatorSlice';

import './button.scss';

// /. imports

interface propTypes {
    symbol: number | string;
    role: string;
    additionalClass?: string;
}

// /. interfaces

const Button: React.FC<propTypes> = ({ symbol, role, additionalClass }) => {
    const { isConstructorMode } = useAppSelector(
        state => state.constructorSlice
    );

    const dispatch = useAppDispatch();

    // /. hooks

    const onButtonClick = (e: any): void => {
        const innerTextValue = e.target.innerText;

        switch (role) {
            case 'number':
                dispatch(setCurrentValue({ value: innerTextValue }));
                break;
            case 'action':
                dispatch(
                    setCurrentAction({
                        arithmeticOperator: innerTextValue
                    })
                );
                break;
            case 'compute':
                dispatch(makeCalculation());
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
            disabled={isConstructorMode}
        >
            <span>{symbol}</span>
        </button>
    );
};

export default Button;
