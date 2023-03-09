import { createSlice } from '@reduxjs/toolkit';

// /. imports

interface mainSliceTypes {
    calculatedValue: number;
}

const initialState: mainSliceTypes = {
    calculatedValue: 0
};

const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {}
});

// export const { } = mainSlice.actions;

export default mainSlice.reducer;
