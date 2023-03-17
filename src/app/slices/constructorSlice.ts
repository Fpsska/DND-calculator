import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// /. imports

interface constructorSliceTypes {
    isConstructorMode: boolean;
}

const initialState: constructorSliceTypes = {
    isConstructorMode: true
};

// /. state

const constructorSlice = createSlice({
    name: 'constructorSlice',
    initialState,
    reducers: {
        switchConstructorModeStatus(state, action: PayloadAction<boolean>) {
            state.isConstructorMode = action.payload;
        }
    }
});

export const { switchConstructorModeStatus } = constructorSlice.actions;

export default constructorSlice.reducer;
