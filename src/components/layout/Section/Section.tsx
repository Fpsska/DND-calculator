import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import Buttom from 'components/ui/Button/Button';
import Display from 'components/ui/Display/Display';

import { IcalcSymbol } from 'types/dbTypes';

import './section.scss';

// /. imports

interface propTypes {
    role: string;
    children: IcalcSymbol[];
    isDraggable: boolean;
}

const Section: React.FC<propTypes> = ({ role, children, isDraggable }) => {
    const { isConstructorMode } = useAppSelector(
        state => state.constructorSlice
    );

    const [btnClasses] = useState<{ [key: string]: string }>({
        section_operators: 'button_operator',
        section_numbers: 'button_number',
        section_compute: 'button_compute'
    });

    const dispatch = useAppDispatch();

    // /. hooks

    const onSectionDragStart = (e: React.DragEvent): void => {
        e.dataTransfer.setData(
            'transferChildrenData',
            JSON.stringify(children)
        );
        e.dataTransfer.setData('transferSectionRole', role);

        // componentAlias: role.substring(role.lastIndexOf('_') + 1);
    };

    const isDisplay = role === 'section_display';
    const isButtons =
        role === 'section_operators' ||
        role === 'section_numbers' ||
        role === 'section_compute';

    // /. functions

    return (
        <div
            className={`section ${role ? role : ''}`}
            draggable={isDraggable && isConstructorMode}
            onDragStart={onSectionDragStart}
        >
            <div className="section__wrapper">
                {
                    <>
                        {children?.map((template: IcalcSymbol) => {
                            if (isDisplay) {
                                return <Display key={template.id} />;
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
