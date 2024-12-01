export enum WasteType {
    Paper = 'paper',
    Glass = 'glass',
    Plastic = 'plastic',
    Electronic = 'electronic',
    Metal = 'metal',
    Organic = 'organic',
}

export interface Waste {
    id: string;
    pathname: string;
    type: WasteType;
    isCorrect: boolean;
}
