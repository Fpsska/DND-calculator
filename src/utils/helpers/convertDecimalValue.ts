export function convertDecimalValue(value: string): string {
    const isCommaPattern: boolean = value.includes(',');
    const isDotPattern: boolean = value.includes('.');

    if (isCommaPattern) {
        return value.replace(/[,]/g, '.');
    }
    if (isDotPattern) {
        return value.replace(/[.]/g, ',');
    }
    return value;
}
