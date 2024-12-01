import {useDrop} from 'react-dnd';

import {Waste} from "../config/types.ts";

interface TrashBinProps {
    pathname: string;
    onDrop?: (item: Waste) => void
    isCorrect?: boolean | null;
}

const TrashBin = ({pathname, onDrop, isCorrect}: TrashBinProps) => {
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

            {isCorrect !== null && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 30,
                        fontSize: 124,
                        color: isCorrect ? 'green' : 'red',
                    }}
                >
                    {isCorrect ? '✅' : '❌'}
                </div>
            )}
        </div>
    );
};

export default TrashBin;
