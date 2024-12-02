export enum WasteType {
    Paper = 'paper',
    Glass = 'glass',
    Plastic = 'plastic',
    Organic = 'organic',
}

export interface Waste {
    id: string;
    pathname: string;
    type: WasteType;
    isCorrect?: boolean;
}
