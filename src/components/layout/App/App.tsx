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

import ModeSwitcher from 'components/ui/ModeSwitcher/ModeSwitcher';

import Section from '../Section/Section';

import 'assets/styles/style.scss';
import './App.css';

// /. imports

const App: React.FC = () => {
    const { a_number, b_number, currentAction } = useAppSelector(
        state => state.calculatorSlice
    );

    const {
        constructorSectionsData,
        isPlaceholderVisible,
        calculatorSectionsData
    } = useAppSelector(state => state.constructorSlice);

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
        <div className="App">
            <div className="page unselectable">
                <div className="page__wrapper">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span>AC: {currentAction}</span>
                        <span>a: {a_number}</span>
                        <span>b: {b_number}</span>
                    </div>
                    <div className="page__controls">
                        <ModeSwitcher />
                    </div>
                    <div className="page__preview">
                        <div className="page__calculator calculator">
                            <div className="calculator__wrapper">
                                {calculatorSectionsData.map(section => {
                                    return (
                                        <Section
                                            key={section.id}
                                            {...section}
                                            isDisabled={true}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <div
                            className={`page__constructor constructor ${
                                isPlaceholderVisible ? 'empty' : ''
                            }`}
                        >
                            <div
                                ref={constructorWrapperRef}
                                className="constructor__wrapper"
                                onDragOver={e =>
                                    isPlaceholderVisible && onWrapperDragOver(e)
                                }
                                onDragLeave={() =>
                                    isPlaceholderVisible && onWrapperDragLeave()
                                }
                                onDrop={e =>
                                    isPlaceholderVisible && onWrapperDragDrop(e)
                                }
                            >
                                {isPlaceholderVisible ? (
                                    <Placeholder />
                                ) : (
                                    <>
                                        {constructorSectionsData?.map(
                                            section => {
                                                return (
                                                    <div
                                                        key={section.id}
                                                        className={`constructor__section ${
                                                            section.isHovered
                                                                ? 'hovered'
                                                                : ''
                                                        } ${
                                                            section.children
                                                                .length === 0
                                                                ? 'empty'
                                                                : ''
                                                        } `}
                                                        onDragLeave={() =>
                                                            onSectionDragLeave(
                                                                section.id
                                                            )
                                                        }
                                                        onDragOver={e =>
                                                            onSectionDragOver(
                                                                e,
                                                                section.id
                                                            )
                                                        }
                                                        onDrop={e =>
                                                            !section.isFilled &&
                                                            onSectionDragDrop(
                                                                e,
                                                                section.id
                                                            )
                                                        }
                                                    >
                                                        <Section
                                                            {...section}
                                                            isDisabled={false}
                                                        />
                                                    </div>
                                                );
                                            }
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
