import { convertDecimalValue } from './helpers/convertDecimalValue';

import { calculateQuotient } from './helpers/calculateQuotient';
import { calculateProduct } from './helpers/calculateProduct';
import { calculateDifference } from './helpers/calculateDifference';
import { calculateSum } from './helpers/calculateSum';

// /. imports

export function getComputedValue(
    currentOperand: string,
    prevOperand: string,
    action: string
): string {
    // console.log('CUR:', currentOperand, 'PREV: ', prevOperand); // 1,111

    const currentVal = parseFloat(convertDecimalValue(currentOperand)); // 1.111
    const prevVal = parseFloat(convertDecimalValue(prevOperand));

    if (isNaN(currentVal) || isNaN(prevVal)) {
        console.log('isNaN');
        return '';
    }

    let result = 0;

    switch (action) {
        case '/':
            result = calculateQuotient(prevVal, currentVal);
            break;
        case 'x':
            result = calculateProduct(prevVal, currentVal);
            break;
        case '-':
            result = calculateDifference(prevVal, currentVal);
            break;
        case '+':
            result = calculateSum(prevVal, currentVal);
            break;
        default:
            return '';
    }

    if (String(result) === 'Infinity' || isNaN(result)) {
        return 'Не определено';
    } else {
        return convertDecimalValue(String(result));
    }
}
