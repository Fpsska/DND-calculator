import React, { useEffect } from 'react';

import { useAppSelector } from 'app/hooks';

import './display.scss';

// /. imports

const Display: React.FC = () => {
    const { currentValue } = useAppSelector(state => state.mainSlice);

    // /. hooks

    // useEffect(() => {
    //     console.log(currentValue);
    // }, [currentValue]);

    return (
        <div className="display">
            <span>{currentValue ? currentValue : '0'}</span>
        </div>
    );
};

export default Display;
