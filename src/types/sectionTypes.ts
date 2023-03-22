import { IcalcSymbol } from './dbTypes';

// /. imports

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
