import React, { useState } from 'react';

import Buttom from 'components/ui/Button/Button';

import './section.scss';

// /. imports

interface propTypes {
    role: string;
    data?: any[];
}

const Section: React.FC<propTypes> = ({ role, data }) => {
    const [btnClasses] = useState<any>({
        section_operators: 'button_operator',
        section_numbers: 'button_number',
        section_others: 'button_calculate'
    });

    return (
        <div className={`section ${role ? role : ''}`}>
            <div className="section__wrapper">
                {data?.map(btn => {
                    return (
                        <Buttom
                            key={btn.id}
                            {...btn}
                            role={btnClasses[role]}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Section;
