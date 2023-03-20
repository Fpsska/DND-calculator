import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { operatorsData, numbersData, equalData, displayData } from 'context/db';

import { IcalcSectionData, IconstrSectionData } from 'types/dbTypes';

// /. imports

interface constructorSliceTypes {
    isConstructorMode: boolean;
    currentSectionRole: string;
    isPlaceholderVisible: boolean;
    calculatorSectionsData: IcalcSectionData[];
    constructorSectionsData: IconstrSectionData[];
}

const initialState: constructorSliceTypes = {
    isConstructorMode: true,
    currentSectionRole: '',
    isPlaceholderVisible: true,
    calculatorSectionsData: [
        {
            id: 1,
            isDraggable: true,
            isSelected: false,
            children: displayData,
            role: 'section_display'
        },
        {
            id: 4,
            isDraggable: true,
            isSelected: false,
            children: operatorsData,
            role: 'section_operators'
        },
        {
            id: 3,
            isDraggable: true,
            isSelected: false,
            children: numbersData,
            role: 'section_numbers'
        },
        {
            id: 2,
            isDraggable: true,
            isSelected: false,
            children: equalData,
            role: 'section_compute'
        }
    ],
    constructorSectionsData: [
        { id: 1, isDraggable: false, isHovered: false, children: [], role: '' },
        { id: 2, isDraggable: false, isHovered: false, children: [], role: '' },
        { id: 3, isDraggable: false, isHovered: false, children: [], role: '' },
        { id: 4, isDraggable: false, isHovered: false, children: [], role: '' }
    ]
};

// /. state

const constructorSlice = createSlice({
    name: 'constructorSlice',
    initialState,
    reducers: {
        switchConstructorModeStatus(state, action: PayloadAction<boolean>) {
            state.isConstructorMode = action.payload;
        },
        switchConstrSectionHoveredStatus(
            state,
            action: PayloadAction<{ payloadID: number; status: boolean }>
        ) {
            const { payloadID, status } = action.payload;
            // /. payload

            const targetSection = state.constructorSectionsData.find(
                ({ id }) => id === payloadID
            );

            if (targetSection) {
                targetSection.isHovered = status;
            }
        },
        setConstrSectionChildrenData(
            state,
            action: PayloadAction<{
                payloadID: number;
                children: string;
            }>
        ) {
            const { payloadID, children } = action.payload;
            // /. payload

            const targetSection = state.constructorSectionsData.find(
                ({ id }) => id === payloadID
            );

            if (targetSection) {
                console.log(JSON.parse(children));
                targetSection.children = JSON.parse(children);
            }
        },
        setConstrSectionRole(
            state,
            action: PayloadAction<{ payloadID: number; role: string }>
        ) {
            const { payloadID, role } = action.payload;
            // /. payload

            const targetSection = state.constructorSectionsData.find(
                ({ id }) => id === payloadID
            );

            if (targetSection) {
                targetSection.role = role;
            }
        },
        switchPlaceholderVisibleStatus(
            state,
            action: PayloadAction<{ status: boolean }>
        ) {
            const { status } = action.payload;
            // /. payload

            state.isPlaceholderVisible = status;
        }
    }
});

export const {
    switchConstructorModeStatus,
    switchConstrSectionHoveredStatus,
    setConstrSectionChildrenData,
    setConstrSectionRole,
    switchPlaceholderVisibleStatus
} = constructorSlice.actions;

export default constructorSlice.reducer;
