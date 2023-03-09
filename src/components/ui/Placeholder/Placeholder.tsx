import React from 'react';

import placeholder_image from 'assets/icons/add_file-icon.svg';

import './placeholder.scss';

// /. imports

const Placeholder: React.FC = () => {
    return (
        <div className="placeholder">
            <div className="placeholder__wrapper">
                <div className="placeholder__image">
                    <img
                        src={placeholder_image}
                        alt="add image icon"
                    />
                </div>
                <p className="placeholder__description">
                    <span>Перетащите сюда</span> любой элемент <br /> из левой
                    панели
                </p>
            </div>
        </div>
    );
};

export default Placeholder;
