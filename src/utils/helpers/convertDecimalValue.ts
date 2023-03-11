export function convertDecimalValue(value: string): string {
    const decimalSeparatorPattern = new RegExp(/[,]/g);

    if (decimalSeparatorPattern.test(value)) {
        return value.replace(/,/g, '.');
    } else {
        return value;
    }
}
