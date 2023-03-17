import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

import { getComputedValue } from 'utils/getComputedvalue';

// /. imports

interface calculatorSliceTypes {
    currentValue: string;
    currentAction: string;
    a_number: string; // current operand
    b_number: string; // prev operand
    isOverwrited: boolean;
    characterLimit: number;
}

// /. interfaces

const initialState: calculatorSliceTypes = {
    currentValue: '',
    currentAction: '',
    a_number: '',
    b_number: '',
    isOverwrited: false,
    characterLimit: 16
};

// /. state

const calculatorSlice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {
        setCurrentValue(state, action: PayloadAction<{ value: string }>) {
            const { value } = action.payload;
            // /. payload

            if (state.a_number.length > state.characterLimit) {
                return;
            }

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

            if (state.isOverwrited) {
                // overwrite result value when select any number after compute
                state.a_number = value;
                state.currentValue = state.a_number;
                state.isOverwrited = false;
            } else {
                // default behavior (concatenation)
                state.a_number += value;
                state.currentValue = state.a_number;
            }
        },
        setCurrentAction(
            state,
            action: PayloadAction<{ arithmeticOperator: string }>
        ) {
            const { arithmeticOperator } = action.payload;
            // /. payload

            if (arithmeticOperator && !state.a_number && !state.b_number) {
                // allow to calculate with negative numbers
                state.b_number = '0';
            }
            if (!state.a_number) {
                // allow to change action when only prev operand is selected
                state.currentAction = arithmeticOperator;
            }

            if (!state.b_number && state.a_number !== 'Не определено') {
                // set value of current operand as value of prev operand / reset current operand
                state.currentAction = arithmeticOperator;

                state.b_number = state.a_number;
                state.currentValue = state.b_number;
                state.a_number = '';
            } else if (
                state.a_number &&
                state.b_number &&
                state.currentAction
            ) {
                // auto-compute value when cur, prev values, action already selected and pressed any new action button
                state.b_number = getComputedValue(
                    state.a_number,
                    state.b_number,
                    state.currentAction
                );
                state.currentValue = state.b_number;
                state.a_number = '';

                state.currentAction = arithmeticOperator;

                if (state.b_number === 'Не определено') {
                    state.a_number = '';
                    state.currentAction = '';
                    state.b_number = '';
                }
            }
        },
        makeCalculation(state) {
            if (!state.a_number || !state.b_number || !state.currentAction) {
                return;
            }

            state.isOverwrited = true;
            state.a_number = getComputedValue(
                state.a_number,
                state.b_number,
                state.currentAction
            );
            state.currentValue = state.a_number;

            state.currentAction = '';
            state.b_number = '';
        },
        resetValues(state) {
            state.a_number = '';
            state.b_number = '';
            state.currentValue = '';
            state.currentAction = '';
        }
    }
});

export const {
    setCurrentValue,
    setCurrentAction,
    makeCalculation,
    resetValues
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
