import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// /. imports

interface IsectionData {
    id: number;
    children: any[];
    role: string;
}

interface constructorSliceTypes {
    isConstructorMode: boolean;
    sectionsData: IsectionData[];
    currentSectionRole: string;
}

const initialState: constructorSliceTypes = {
    isConstructorMode: true,
    sectionsData: [
        { id: 1, children: [], role: '' },
        { id: 2, children: [], role: '' },
        { id: 3, children: [], role: '' },
        { id: 4, children: [], role: '' }
    ],
    currentSectionRole: ''
};

// /. state

const constructorSlice = createSlice({
    name: 'constructorSlice',
    initialState,
    reducers: {
        switchConstructorModeStatus(state, action: PayloadAction<boolean>) {
            state.isConstructorMode = action.payload;
        },
        setSectionChildrenData(
            state,
            action: PayloadAction<{
                payloadID: number;
                children: string;
            }>
        ) {
            const { payloadID, children } = action.payload;
            // /. payload

            const targetSection = state.sectionsData.find(
                ({ id }) => id === payloadID
            );

            if (targetSection) {
                console.log(JSON.parse(children));
                targetSection.children = JSON.parse(children);
            }
        },
        setSectionRole(
            state,
            action: PayloadAction<{ payloadID: number; role: string }>
        ) {
            const { payloadID, role } = action.payload;
            // /. payload

            const targetSection = state.sectionsData.find(
                ({ id }) => id === payloadID
            );

            if (targetSection) {
                console.log(role);
                targetSection.role = role;
            }
        }
    }
});

export const {
    switchConstructorModeStatus,
    setSectionChildrenData,
    setSectionRole
} = constructorSlice.actions;

export default constructorSlice.reducer;
