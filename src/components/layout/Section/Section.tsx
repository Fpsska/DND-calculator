import React, { useState } from 'react';

import Buttom from 'components/ui/Button/Button';

import { IcalcSymbol } from 'types/dbTypes';

import './section.scss';

// /. imports

interface propTypes {
    role: string;
    data?: IcalcSymbol[];
    children?: JSX.Element;
}

const Section: React.FC<propTypes> = ({ role, data, children }) => {
    const [btnClasses] = useState<{ [key: string]: string }>({
        section_operators: 'button_operator',
        section_numbers: 'button_number'
    });

    return (
        <div className={`section ${role ? role : ''}`}>
            <div className="section__wrapper">
                {children ? (
                    children
                ) : (
                    <>
                        {data?.map((btn: IcalcSymbol) => {
                            return (
                                <Buttom
                                    key={btn.id}
                                    {...btn}
                                    role={btnClasses[role]}
                                />
                            );
                        })}
                    </>
                )}
            </div>
        </div>
    );
};

export default Section;
