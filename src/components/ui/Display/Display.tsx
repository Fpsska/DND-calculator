import React from 'react';

import { useAppSelector } from 'app/hooks';

import './display.scss';

// /. imports

const Display: React.FC = () => {
    const { calculatedValue } = useAppSelector(state => state.mainSlice);

    // /. hooks

    return (
        <div className="display">
            <span>{calculatedValue}</span>
        </div>
    );
};

export default Display;
