export interface IcalcSymbol {
    id: number;
    symbol: number | string;
    role: string;
}

interface Isection {
    id: number;
    isDraggable: boolean;
    role: string;
    children: IcalcSymbol[];
}

export interface IconstrSectionData extends Isection {
    isHovered: boolean;
    isFilled: boolean;
}

export interface IcalcSectionData extends Isection {
    isSelected: boolean;
}
