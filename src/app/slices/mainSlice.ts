import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

import { getComputedValue } from 'utils/getComputedvalue';

// /. imports

interface mainSliceTypes {
    currentValue: string;
    currentAction: string;
    a_number: string; // current operand
    b_number: string; // prev operand
}

const initialState: mainSliceTypes = {
    currentValue: '',
    currentAction: '',
    a_number: '',
    b_number: ''
};

const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {
        setCurrentValue(state, action: PayloadAction<{ value: string }>) {
            const { value } = action.payload;
            // /. payload

            if (value === '0' && state.a_number === '0') {
                return;
            }
            if (
                state.a_number.charAt(0) === '0' &&
                !state.a_number.includes(',')
            ) {
                state.a_number = state.a_number.substring(1);
            }
            if (value === ',' && state.a_number.includes(',')) {
                return;
            }
            if (value === ',' && state.a_number === '') {
                state.a_number += '0';
            }

            state.a_number += value;
            state.currentValue = state.a_number;
        },
        setCurrentAction(
            state,
            action: PayloadAction<{ arithmeticOperator: string }>
        ) {
            const { arithmeticOperator } = action.payload;
            // /. payload

            if (!state.a_number && !state.b_number) {
                // if operands are empty
                return;
            }

            if (!state.b_number) {
                // set value of current operand as value of prev operand / reset current operand
                state.currentAction = arithmeticOperator;

                state.b_number = state.a_number;
                state.currentValue = state.b_number;
                state.a_number = '';
            } else {
                // calc value when selected cur, prev values, action and pressed any new action button
                state.b_number = getComputedValue(
                    state.a_number,
                    state.b_number,
                    state.currentAction
                );
                state.currentValue = state.b_number;
                state.a_number = '';

                state.currentAction = arithmeticOperator;
            }
        },
        makeCalculation(state) {
            if (!state.a_number || !state.b_number || !state.currentAction) {
                return;
            }

            state.a_number = getComputedValue(
                state.a_number,
                state.b_number,
                state.currentAction
            );
            state.currentValue = state.a_number;
            state.b_number = '';
            state.currentAction = '';
        }
    }
});

export const { setCurrentValue, setCurrentAction, makeCalculation } =
    mainSlice.actions;

export default mainSlice.reducer;
