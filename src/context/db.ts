import { IcalcSymbol } from 'types/dbTypes';

// /. imports

export const operators: IcalcSymbol[] = [
    {
        id: 1,
        symbol: '/',
        role: 'action'
    },
    {
        id: 2,
        symbol: 'x',
        role: 'action'
    },
    {
        id: 3,
        symbol: '-',
        role: 'action'
    },
    {
        id: 4,
        symbol: '+',
        role: 'action'
    }
];

export const numbers: IcalcSymbol[] = [
    {
        id: 0,
        symbol: 7,
        role: 'number'
    },
    {
        id: 1,
        symbol: 8,
        role: 'number'
    },
    {
        id: 2,
        symbol: 9,
        role: 'number'
    },
    {
        id: 3,
        symbol: 4,
        role: 'number'
    },
    {
        id: 4,
        symbol: 5,
        role: 'number'
    },
    {
        id: 5,
        symbol: 6,
        role: 'number'
    },
    {
        id: 6,
        symbol: 1,
        role: 'number'
    },
    {
        id: 7,
        symbol: 2,
        role: 'number'
    },
    {
        id: 8,
        symbol: 3,
        role: 'number'
    },
    {
        id: 9,
        symbol: 0,
        role: 'number'
    },
    {
        id: 10,
        symbol: ',',
        role: 'number'
    }
];
