import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

// /. imports

interface mainSliceTypes {
    calculatedValue: number;
    currentValue: string;
}

const initialState: mainSliceTypes = {
    calculatedValue: 0,
    currentValue: ''
};

const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {
        setCurrentValue(state, action: PayloadAction<{ value: string }>) {
            const { value } = action.payload;
            // /. payload

            const arithmeticOperatorsPattern = new RegExp(/[-+/x=]/g);
            const decimalSeparatorPattern = new RegExp(/[,]/g);

            if (arithmeticOperatorsPattern.test(value)) {
                return;
            }
            if (state.currentValue === '' && value === '0') {
                return;
            }
            if (
                value === ',' &&
                decimalSeparatorPattern.test(state.currentValue)
            ) {
                return;
            }
            if (state.currentValue === '' && value === ',') {
                state.currentValue += `0${value}`;
            } else {
                state.currentValue += value;
            }
        }
    }
});

export const { setCurrentValue } = mainSlice.actions;

export default mainSlice.reducer;
