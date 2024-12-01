import {useDrop} from 'react-dnd';
import {Waste} from "../config/types.ts";

interface TrashBinProps {
    pathname: string;
    onDrop?: (item: Waste) => void;
}

const TrashBin = ({pathname, onDrop}: TrashBinProps) => {
    const [{isOver}, drop] = useDrop(() => ({
        accept: 'WASTE',
        drop: onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            style={{
                position: 'relative',
                opacity: isOver ? 0.5 : '',
            }}
        >
            <img src={pathname} width="200px" height="300px" draggable={false} alt="image"/>
        </div>
    );
};

export default TrashBin;
