import React, { useState } from 'react';

import { useAppDispatch } from 'app/hooks';

import Buttom from 'components/ui/Button/Button';
import Display from 'components/ui/Display/Display';

import { IcalcSymbol } from 'types/dbTypes';

import './section.scss';

// /. imports

interface propTypes {
    role: string;
    data?: IcalcSymbol[];
}

const Section: React.FC<propTypes> = ({ role, data }) => {
    const [btnClasses] = useState<{ [key: string]: string }>({
        section_operators: 'button_operator',
        section_numbers: 'button_number',
        section_compute: 'button_compute'
    });

    const dispatch = useAppDispatch();

    // /. hooks

    const isDisplay = role === 'section_display';
    const isButtons =
        role === 'section_operators' ||
        role === 'section_numbers' ||
        role === 'section_compute';

    // /. functions

    return (
        <div className={`section ${role ? role : ''}`}>
            <div className="section__wrapper">
                {
                    <>
                        {data?.map((template: IcalcSymbol) => {
                            if (isDisplay) {
                                return (
                                    <Display
                                        key={template.id}
                                        {...template}
                                    />
                                );
                            }
                            if (isButtons) {
                                return (
                                    <Buttom
                                        key={template.id}
                                        {...template}
                                        additionalClass={btnClasses[role]}
                                    />
                                );
                            }
                        })}
                    </>
                }
            </div>
        </div>
    );
};

export default Section;
