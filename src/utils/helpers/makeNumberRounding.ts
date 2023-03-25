export function makeNumberRounding(number: string, charsLimit: number): string {
    const charsLength = number.length;

    if (charsLength > charsLimit) {
        return number.substring(0, charsLimit);
    }

    return number;
}
