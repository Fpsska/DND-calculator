export function getComputedValue(
    currentOperand: string,
    prevOperand: string,
    action: string
): string {
    console.log('CUR:', currentOperand, 'PREV: ', prevOperand);

    const currentVal = parseFloat(currentOperand);
    const prevVal = parseFloat(prevOperand);

    if (isNaN(currentVal) || isNaN(prevVal)) {
        console.log('isNaN');
        return '';
    }

    let result = 0;

    switch (action) {
        case '/':
            result = prevVal / currentVal;
            break;
        case 'x':
            result = prevVal * currentVal;
            break;
        case '-':
            result = prevVal - currentVal;
            break;
        case '+':
            result = prevVal + currentVal;
            break;
        default:
            return '';
    }

    return String(result);
}
