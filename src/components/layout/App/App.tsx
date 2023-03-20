import React, { useEffect, useRef } from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import {
    switchConstructorModeStatus,
    switchConstrSectionHoveredStatus,
    setConstrSectionChildrenData,
    setConstrSectionRole,
    switchPlaceholderVisibleStatus
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
    };

    const onWrapperDragOver = (e: React.DragEvent): void => {
        e.preventDefault();
        constructorWrapperRef.current.classList.add('hovered');
    };

    const onWrapperDragLeave = (): void => {
        constructorWrapperRef.current.classList.remove('hovered');
    };

    const onWrapperDragDrop = (e: React.DragEvent): void => {
        dispatch(switchPlaceholderVisibleStatus({ status: false }));
        console.log('wrapper drop');

        const children = e.dataTransfer.getData(
            'transferChildrenData'
        ) as string;
        const role = e.dataTransfer.getData('transferSectionRole') as string;
        // set to first place by initial placement
        dispatch(setConstrSectionRole({ payloadID: 1, role }));
        dispatch(setConstrSectionChildrenData({ payloadID: 1, children }));
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
                        <div className="page__storage storage">
                            <div className="storage__wrapper">
                                <Section
                                    role="section_display"
                                    data={calculatorSectionsData[0].displayData}
                                    isDraggable
                                />
                                <Section
                                    role="section_operators"
                                    data={
                                        calculatorSectionsData[0].operatorsData
                                    }
                                    isDraggable
                                />
                                <Section
                                    role="section_numbers"
                                    data={calculatorSectionsData[0].numbersData}
                                    isDraggable
                                />
                                <Section
                                    role="section_compute"
                                    data={calculatorSectionsData[0].equalData}
                                    isDraggable
                                />
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
                                                            onSectionDragDrop(
                                                                e,
                                                                section.id
                                                            )
                                                        }
                                                    >
                                                        <Section
                                                            role={section.role}
                                                            data={
                                                                section.children
                                                            }
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
