import React, { useRef } from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import {
    switchConstrSectionHoveredStatus,
    setConstrSectionChildrenData,
    setConstrSectionRole,
    switchPlaceholderVisibleStatus,
    switchCalcSectionSelectedStatus,
    switchConstrFilledStatus
} from 'app/slices/constructorSlice';

import Placeholder from 'components/ui/Placeholder/Placeholder';

import Section from '../Section/Section';

import './constructor.scss';

// /. import

const Constructor: React.FC<{ additionalClass: string }> = ({
    additionalClass
}) => {
    const { constructorSectionsData, isPlaceholderVisible } = useAppSelector(
        state => state.constructorSlice
    );

    const dispatch = useAppDispatch();
    const constructorWrapperRef = useRef<HTMLDivElement>(null!);

    // /. hooks

    const onSectionDragLeave = (payloadID: number): void => {
        dispatch(
            switchConstrSectionHoveredStatus({ payloadID, status: false })
        );
    };

    const onSectionDragOver = (e: React.DragEvent, payloadID: number): void => {
        e.preventDefault();
        dispatch(switchConstrSectionHoveredStatus({ payloadID, status: true }));
    };

    const onSectionDragDrop = (e: React.DragEvent, payloadID: number): void => {
        console.log('drop');
        const children = e.dataTransfer.getData(
            'transferChildrenData'
        ) as string;
        const role = e.dataTransfer.getData('transferSectionRole') as string;
        // console.log(role); // section_display

        dispatch(setConstrSectionRole({ payloadID, role }));
        dispatch(setConstrSectionChildrenData({ payloadID, children }));
        dispatch(switchConstrFilledStatus({ payloadID }));
        dispatch(
            switchConstrSectionHoveredStatus({
                payloadID,
                status: false
            })
        );
        dispatch(switchCalcSectionSelectedStatus({ payloadRole: role }));
    };

    const onWrapperDragOver = (e: React.DragEvent): void => {
        e.preventDefault();
        constructorWrapperRef.current.classList.add('hovered');
    };

    const onWrapperDragLeave = (): void => {
        constructorWrapperRef.current.classList.remove('hovered');
    };

    const onWrapperDragDrop = (e: React.DragEvent): void => {
        console.log('wrapper drop');

        const children = e.dataTransfer.getData(
            'transferChildrenData'
        ) as string;
        const role = e.dataTransfer.getData('transferSectionRole') as string;

        // set to first place by initial placement
        dispatch(switchPlaceholderVisibleStatus({ status: false }));
        dispatch(setConstrSectionRole({ payloadID: 1, role }));
        dispatch(setConstrSectionChildrenData({ payloadID: 1, children }));
        dispatch(switchConstrFilledStatus({ payloadID: 1 }));
        dispatch(
            switchConstrSectionHoveredStatus({
                payloadID: 1,
                status: false
            })
        );
        constructorWrapperRef.current.classList.remove('hovered');
        dispatch(switchCalcSectionSelectedStatus({ payloadRole: role }));
    };

    // /. functions

    return (
        <div
            className={`constructor ${additionalClass ? additionalClass : ''} ${
                isPlaceholderVisible ? 'empty' : ''
            }`}
        >
            <div
                ref={constructorWrapperRef}
                className="constructor__wrapper"
                onDragOver={e => isPlaceholderVisible && onWrapperDragOver(e)}
                onDragLeave={() => isPlaceholderVisible && onWrapperDragLeave()}
                onDrop={e => isPlaceholderVisible && onWrapperDragDrop(e)}
            >
                {isPlaceholderVisible ? (
                    <Placeholder />
                ) : (
                    <>
                        {constructorSectionsData?.map(section => {
                            return (
                                <div
                                    key={section.id}
                                    className={`constructor__section ${
                                        section.isHovered ? 'hovered' : ''
                                    } ${
                                        section.children.length === 0
                                            ? 'empty'
                                            : ''
                                    } `}
                                    onDragLeave={() =>
                                        onSectionDragLeave(section.id)
                                    }
                                    onDragOver={e =>
                                        onSectionDragOver(e, section.id)
                                    }
                                    onDrop={e =>
                                        !section.isFilled &&
                                        onSectionDragDrop(e, section.id)
                                    }
                                >
                                    {section.isFilled && (
                                        <Section
                                            {...section}
                                            isDisabled={false}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
        </div>
    );
};

export default Constructor;
