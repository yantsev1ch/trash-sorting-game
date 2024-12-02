import {useDrag} from 'react-dnd';
import {CSSProperties, useEffect, useRef} from 'react';
import './WasteItem.css'

interface WasteItemProps {
    pathname: string;
    type: string;
    id: string;
    styles?: CSSProperties
}

const WasteItem = ({pathname, id, type, styles}: WasteItemProps) => {
    const imgRef = useRef<HTMLImageElement>(null);

    const [{isDragging}, drag, preview] = useDrag(() => ({
        type: 'WASTE',
        item: {id, type},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    useEffect(() => {
        if (imgRef.current) {
            preview(imgRef.current, {captureDraggingState: true});
        }
    }, [preview]);

    return (
        <div
            style={{
                ...styles,
                display: 'inline-block',
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
            }}
            ref={drag}
            className="waste-item"
        >
            <img
                ref={imgRef}
                alt="wasteImage"
                style={{
                    objectFit: 'contain',
                    display: 'block',
                }}
                src={pathname}
                width="115px"
                height="115px"
                draggable={false}
            />
        </div>
    );
};

export default WasteItem;
