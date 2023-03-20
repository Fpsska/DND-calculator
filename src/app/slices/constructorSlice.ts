import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { operatorsData, numbersData, equalData, displayData } from 'context/db';

// /. imports

interface IsectionData {
    id: number;
    isHovered: boolean;
    children: any[];
    role: string;
}

interface constructorSliceTypes {
    isConstructorMode: boolean;
    constructorSectionsData: IsectionData[];
    currentSectionRole: string;
    isPlaceholderVisible: boolean;
    calculatorSectionsData: any[];
}

const initialState: constructorSliceTypes = {
    isConstructorMode: true,
    constructorSectionsData: [
        { id: 1, isHovered: false, children: [], role: '' },
        { id: 2, isHovered: false, children: [], role: '' },
        { id: 3, isHovered: false, children: [], role: '' },
        { id: 4, isHovered: false, children: [], role: '' }
    ],
    currentSectionRole: '',
    isPlaceholderVisible: true,
    calculatorSectionsData: [
        {
            displayData,
            equalData,
            numbersData,
            operatorsData
        }
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
