import React from 'react';

import { useAppDispatch } from 'app/hooks';

import { setCurrentValue, setCurrentAction } from 'app/slices/mainSlice';

import './button.scss';

// /. imports

interface propTypes {
    symbol: number | string;
    role?: string;
}

// /. interfaces

const Button: React.FC<propTypes> = ({ symbol, role }) => {
    const dispatch = useAppDispatch();

    // /. hooks

    const onButtonClick = (e: any): void => {
        console.log('cliked');
        const innerTextValue = e.target.innerText;
        dispatch(setCurrentValue({ value: innerTextValue }));
        dispatch(setCurrentAction({ arithmeticOperator: innerTextValue }));
    };

    return (
        <button
            className={`button ${role ? role : ''}`}
            type="button"
            onClick={e => onButtonClick(e)}
        >
            <span>{symbol}</span>
        </button>
    );
};

export default Button;
