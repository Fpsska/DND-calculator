import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

import { calculateSum } from 'utils/calculateSum';
import { calculateDifference } from 'utils/calculateDifference';
import { calculateQuotient } from 'utils/calculateQuotient';
import { calculateProduct } from 'utils/calculateProduct';

// /. imports

interface mainSliceTypes {
    calculatedValue: number;
    currentValue: string;
    currentAction: string;
    a_number: string;
    b_number: string;
}

const initialState: mainSliceTypes = {
    calculatedValue: 0,
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

            if (digitsArray.includes(value)) {
                if (state.b_number === '' && state.currentAction === '') {
                    state.a_number += value;
                    state.currentValue = state.a_number;
                } else {
                    state.b_number += value;
                    state.currentValue = state.b_number;
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
        }
    }
});

export const { setCurrentValue, setCurrentAction } = mainSlice.actions;

export default mainSlice.reducer;
