import React from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import {
    switchSectionHoveredStatus,
    setSectionChildrenData,
    setSectionRole
} from 'app/slices/constructorSlice';

import Placeholder from 'components/ui/Placeholder/Placeholder';

import ModeSwitcher from 'components/ui/ModeSwitcher/ModeSwitcher';

import Section from '../Section/Section';

import {
    displayData,
    equalData,
    operatorsData,
    numbersData
} from '../../../context/db';

import 'assets/styles/style.scss';
import './App.css';

// /. imports

const App: React.FC = () => {
    const { a_number, b_number, currentAction } = useAppSelector(
        state => state.calculatorSlice
    );

    const { sectionsData } = useAppSelector(state => state.constructorSlice);

    const dispatch = useAppDispatch();

    // /. hooks

    const onSectionDragEnter = (payloadID: number): void => {
        // console.log('enter');
    };

    const onSectionDragLeave = (payloadID: number): void => {
        // console.log('leave');
        dispatch(switchSectionHoveredStatus({ payloadID, status: false }));
    };

    const onSectionDragOver = (e: React.DragEvent, payloadID: number): void => {
        e.preventDefault();
        dispatch(switchSectionHoveredStatus({ payloadID, status: true }));
        // console.log('over');
    };

    const onSectionDragDrop = (e: React.DragEvent, payloadID: number): void => {
        console.log('drop');
        const children = e.dataTransfer.getData(
            'transferChildrenData'
        ) as string;
        const role = e.dataTransfer.getData('transferSectionRole') as string;

        dispatch(setSectionRole({ payloadID, role }));
        dispatch(setSectionChildrenData({ payloadID, children }));
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
                                    data={displayData}
                                    isDraggable
                                />
                                <Section
                                    role="section_operators"
                                    data={operatorsData}
                                    isDraggable
                                />
                                <Section
                                    role="section_numbers"
                                    data={numbersData}
                                    isDraggable
                                />
                                <Section
                                    role="section_compute"
                                    data={equalData}
                                    isDraggable
                                />
                            </div>
                        </div>
                        <div className="page__constructor constructor ">
                            <div className="constructor__wrapper">
                                <>
                                    {sectionsData?.map(section => {
                                        return (
                                            <div
                                                key={section.id}
                                                className={`constructor__section ${
                                                    section.isHovered
                                                        ? 'hovered'
                                                        : ''
                                                } ${
                                                    section.children.length ===
                                                    0
                                                        ? 'empty'
                                                        : ''
                                                } `}
                                                onDragEnter={() =>
                                                    onSectionDragEnter(
                                                        section.id
                                                    )
                                                }
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
                                                    data={section.children}
                                                />
                                            </div>
                                        );
                                    })}
                                </>
                                {/* <Placeholder /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
