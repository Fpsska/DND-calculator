import React from 'react';

import './button.scss';

// /. imports

interface propTypes {
    symbol: number | string;
    role?: string;
}

// /. interfaces

const Button: React.FC<propTypes> = ({ symbol, role }) => {
    return (
        <button
            className={`button ${role ? role : ''}`}
            type="button"
        >
            <span>{symbol}</span>
        </button>
    );
};

export default Button;
