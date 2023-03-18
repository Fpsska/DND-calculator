import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// /. imports

interface IsectionData {
    id: number;
    isHovered: boolean;
    children: any[];
    role: string;
}

interface constructorSliceTypes {
    isConstructorMode: boolean;
    sectionsData: IsectionData[];
    currentSectionRole: string;
    isPlaceholderVisible: boolean;
}

const initialState: constructorSliceTypes = {
    isConstructorMode: true,
    sectionsData: [
        { id: 1, isHovered: false, children: [], role: '' },
        { id: 2, isHovered: false, children: [], role: '' },
        { id: 3, isHovered: false, children: [], role: '' },
        { id: 4, isHovered: false, children: [], role: '' }
    ],
    currentSectionRole: '',
    isPlaceholderVisible: true
};

// /. state

const constructorSlice = createSlice({
    name: 'constructorSlice',
    initialState,
    reducers: {
        switchConstructorModeStatus(state, action: PayloadAction<boolean>) {
            state.isConstructorMode = action.payload;
        },
        switchSectionHoveredStatus(
            state,
            action: PayloadAction<{ payloadID: number; status: boolean }>
        ) {
            const { payloadID, status } = action.payload;
            // /. payload

            const targetSection = state.sectionsData.find(
                ({ id }) => id === payloadID
            );

            if (targetSection) {
                targetSection.isHovered = status;
            }
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
    switchSectionHoveredStatus,
    setSectionChildrenData,
    setSectionRole,
    switchPlaceholderVisibleStatus
} = constructorSlice.actions;

export default constructorSlice.reducer;
