import React, { useState, useEffect, useRef } from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import { resetSection } from 'app/slices/constructorSlice';

import Buttom from 'components/ui/Button/Button';
import Display from 'components/ui/Display/Display';

import { IcalcSymbol } from 'types/dbTypes';

import './section.scss';

// /. imports

interface propTypes {
    role: string;
    children: IcalcSymbol[];
    isDraggable: boolean;
    isSelected?: boolean;
    isDisabled: boolean;
}

const Section: React.FC<propTypes> = ({
    role,
    children,
    isDraggable,
    isSelected,
    isDisabled
}) => {
    const { isConstructorMode } = useAppSelector(
        state => state.constructorSlice
    );

    const [btnClasses] = useState<{ [key: string]: string }>({
        section_operators: 'button_operator',
        section_numbers: 'button_number',
        section_compute: 'button_compute'
    });

    const dispatch = useAppDispatch();
    const sectionRef = useRef<HTMLDivElement>(null!);

    // /. hooks

    const onSectionDragStart = (e: React.DragEvent): void => {
        e.dataTransfer.setData(
            'transferChildrenData',
            JSON.stringify(children)
        );
        e.dataTransfer.setData('transferSectionRole', role);
    };

    const isDisplay = role === 'section_display';
    const isButtons =
        role === 'section_operators' ||
        role === 'section_numbers' ||
        role === 'section_compute';

    // /. functions

    useEffect(() => {
        const onSectionDBclick = (): void => {
            if (!isDisabled && isConstructorMode) {
                console.log('db click');
                dispatch(resetSection({ payloadRole: role }));
            }
        };

        sectionRef.current?.addEventListener('dblclick', onSectionDBclick);
        return () => {
            sectionRef.current?.removeEventListener(
                'dblclick',
                onSectionDBclick
            );
        };
    }, [isDisabled, role, isConstructorMode]);

    return (
        <div
            ref={sectionRef}
            className={`section ${role ? role : ''} ${
                isSelected ? 'selected' : ''
            }`}
            draggable={isDraggable && isConstructorMode}
            onDragStart={onSectionDragStart}
        >
            <div className="section__wrapper">
                {children?.map((template: IcalcSymbol) => {
                    if (isDisplay) {
                        return (
                            <Display
                                key={template.id}
                                isDisabled={isDisabled}
                            />
                        );
                    }
                    if (isButtons) {
                        return (
                            <Buttom
                                key={template.id}
                                {...template}
                                additionalClass={btnClasses[role]}
                                isDisabled={isDisabled}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default Section;
