import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

import { calculateSum } from 'utils/calculateSum';
import { calculateDifference } from 'utils/calculateDifference';
import { calculateQuotient } from 'utils/calculateQuotient';
import { calculateProduct } from 'utils/calculateProduct';

import { convertDecimalValue } from 'utils/helpers/convertDecimalValue';

// /. imports

interface mainSliceTypes {
    isCalculated: boolean;
    currentValue: string;
    currentAction: string;
    a_number: string;
    b_number: string;
}

const initialState: mainSliceTypes = {
    isCalculated: false,
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

            const digitsArray: string[] = [
                '0',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                ','
            ];

            const decimalSeparatorPattern = new RegExp(/[,]/g);

            if (digitsArray.includes(value)) {
                if (state.b_number === '' && state.currentAction === '') {
                    if (value === '0' && state.a_number === '') {
                        // rejecting to use zero like 1st value
                        return;
                    }
                    if (
                        // rejecting to use decimal separator more 1 time
                        value === ',' &&
                        decimalSeparatorPattern.test(state.a_number)
                    ) {
                        return;
                    }
                    if (value === ',') {
                        // when decimal separator is 1st value
                        state.a_number += `0${value}`;
                        state.currentValue = state.a_number;
                    } else {
                        state.a_number += value;
                        state.currentValue = state.a_number;
                    }
                } else if (
                    state.isCalculated &&
                    state.a_number !== '' &&
                    state.b_number !== ''
                ) {
                    state.b_number = value;
                    state.currentValue = state.b_number;
                    state.isCalculated = false;
                } else {
                    if (value === '0' && state.b_number === '') {
                        return;
                    }
                    if (
                        value === ',' &&
                        decimalSeparatorPattern.test(state.b_number)
                    ) {
                        return;
                    }
                    if (state.b_number === '' && value === ',') {
                        state.b_number += `0${value}`;
                        state.currentValue = state.b_number;
                    } else {
                        state.b_number += value;
                        state.currentValue = state.b_number;
                    }
                }
                return;
            }
        },
        setCurrentAction(
            state,
            action: PayloadAction<{ arithmeticOperator: string }>
        ) {
            const { arithmeticOperator } = action.payload;
            // /. payload

            const actionsArray: string[] = ['/', 'x', '+', '-'];

            if (actionsArray.includes(arithmeticOperator)) {
                console.log(arithmeticOperator);
                state.currentAction = arithmeticOperator;
            }
        },
        getCalculationValue(
            state,
            action: PayloadAction<{ operation: string; a: string; b: string }>
        ) {
            const { operation, a, b } = action.payload;

            // /. payload

            switch (operation) {
                case '/':
                    state.a_number = calculateQuotient(
                        convertDecimalValue(a),
                        convertDecimalValue(b)
                    );
                    break;
                case 'x':
                    state.a_number = calculateProduct(
                        convertDecimalValue(a),
                        convertDecimalValue(b)
                    );
                    break;
                case '-':
                    state.a_number = calculateDifference(
                        convertDecimalValue(a),
                        convertDecimalValue(b)
                    );
                    break;
                case '+':
                    state.a_number = calculateSum(
                        convertDecimalValue(a),
                        convertDecimalValue(b)
                    );
                    break;
                default:
                    return;
            }
            state.currentValue = state.a_number;
        },
        switchCalculatedStatus(state, action: PayloadAction<boolean>) {
            state.isCalculated = action.payload;
        }
    }
});

export const {
    setCurrentValue,
    setCurrentAction,
    getCalculationValue,
    switchCalculatedStatus
} = mainSlice.actions;

export default mainSlice.reducer;
