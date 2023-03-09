interface IcalcSymbol {
    [key: string]: number | string;
}

export const operators: IcalcSymbol[] = [
    {
        id: 1,
        symbol: '/'
    },
    {
        id: 2,
        symbol: 'x'
    },
    {
        id: 3,
        symbol: '-'
    },
    {
        id: 4,
        symbol: '+'
    }
];

export const numbers: IcalcSymbol[] = [
    {
        id: 0,
        symbol: 7
    },
    {
        id: 1,
        symbol: 8
    },
    {
        id: 2,
        symbol: 9
    },
    {
        id: 3,
        symbol: 4
    },
    {
        id: 4,
        symbol: 5
    },
    {
        id: 5,
        symbol: 6
    },
    {
        id: 6,
        symbol: 1
    },
    {
        id: 7,
        symbol: 2
    },
    {
        id: 8,
        symbol: 3
    },
    {
        id: 9,
        symbol: 0
    },
    {
        id: 10,
        symbol: ','
    }
];

export const others: IcalcSymbol[] = [{ id: 1, symbol: '=' }];
