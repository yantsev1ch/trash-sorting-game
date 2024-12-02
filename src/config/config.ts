import images from "../assets/images";
import {Waste, WasteType} from "./types.ts";

export const bins: Waste[] = [
    {id: 'bin-paper', pathname: images.bins.paper, type: WasteType.Paper},
    {id: 'bin-glass', pathname: images.bins.glass, type: WasteType.Glass},
    {id: 'bin-plastic', pathname: images.bins.plastic, type: WasteType.Plastic},
    {id: 'bin-organic', pathname: images.bins.organic, type: WasteType.Organic},
];
