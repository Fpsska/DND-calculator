import React from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import { resetValues } from 'app/slices/calculatorSlice';
import { switchConstructorModeStatus } from 'app/slices/constructorSlice';

import './mode-switcher.scss';

// /. imports

const ModeSwitcher: React.FC = () => {
    const { isConstructorMode } = useAppSelector(
        state => state.constructorSlice
    );

    const dispatch = useAppDispatch();

    // /. hooks

    const onButtonSwitchClick = (): void => {
        dispatch(switchConstructorModeStatus(!isConstructorMode));
        dispatch(resetValues());
    };

    // /. functions

    return (
        <div className="mode-switcher">
            <div className="mode-switcher__wrapper">
                <button
                    className={
                        !isConstructorMode
                            ? 'mode-switcher__button active'
                            : 'mode-switcher__button'
                    }
                    aria-label={
                        isConstructorMode
                            ? 'enable runtime mode'
                            : 'disable runtime mode'
                    }
                    onClick={onButtonSwitchClick}
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11.7678 11.7678C12.2366 11.2989 12.5 10.663 12.5 10C12.5 9.33696 12.2366 8.70107 11.7678 8.23223C11.2989 7.76339 10.663 7.5 10 7.5C9.33696 7.5 8.70107 7.76339 8.23223 8.23223C7.76339 8.70107 7.5 9.33696 7.5 10C7.5 10.663 7.76339 11.2989 8.23223 11.7678C8.70107 12.2366 9.33696 12.5 10 12.5C10.663 12.5 11.2989 12.2366 11.7678 11.7678Z"
                            stroke=""
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M2.04834 9.99999C3.11001 6.61916 6.26917 4.16666 10 4.16666C13.7317 4.16666 16.89 6.61916 17.9517 9.99999C16.89 13.3808 13.7317 15.8333 10 15.8333C6.26917 15.8333 3.11001 13.3808 2.04834 9.99999Z"
                            stroke=""
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span>Runtime</span>
                </button>
                <button
                    className={
                        isConstructorMode
                            ? 'mode-switcher__button active'
                            : 'mode-switcher__button'
                    }
                    aria-label={
                        isConstructorMode
                            ? 'disable constructor mode'
                            : 'enable constructor mode'
                    }
                    onClick={onButtonSwitchClick}
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.5 13.3333L4.16666 10L7.5 6.66668M12.5 6.66668L15.8333 10L12.5 13.3333"
                            stroke=""
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span>Constructor</span>
                </button>
            </div>
        </div>
    );
};

export default ModeSwitcher;
