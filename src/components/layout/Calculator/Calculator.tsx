import React from 'react';

import { useAppSelector } from 'app/hooks';

import Section from '../Section/Section';

import './calculator.scss';

// /. imports

const Calculator: React.FC<{ additionalClass: string }> = ({
    additionalClass
}) => {
    const { calculatorSectionsData, isConstructorMode } = useAppSelector(
        state => state.constructorSlice
    );

    // /. hooks

    return (
        <div
            className={`calculator ${additionalClass ? additionalClass : ''}  ${
                !isConstructorMode ? 'hidden' : ''
            }`}
        >
            <div className="calculator__wrapper">
                {calculatorSectionsData.map(section => {
                    return (
                        <Section
                            key={section.id}
                            {...section}
                            isDisabled={true}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Calculator;
