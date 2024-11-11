import { useEffect, useState } from "react";

function useDragAndDrop(saveDrag?: () => void) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const endDrag = () => {
        console.log(position.x)
        if (saveDrag) {
            saveDrag()
        }
        setDragging(false)
        
    };

    const onDrag = (event: MouseEvent) => {
        if (dragging) {
            setPosition({
                x: event.clientX - offset.x,
                y: event.clientY - offset.y,
            })
        }
    };

    useEffect(() => {
        if (dragging) {
            document.addEventListener("mousemove", onDrag);
            document.addEventListener("mouseup", endDrag);
        } else {
            document.removeEventListener("mousemove", onDrag);
            document.removeEventListener("mouseup", endDrag);
        }

        return () => {
            document.removeEventListener("mousemove", onDrag);
            document.removeEventListener("mouseup", endDrag);
        };
    }, [dragging, offset]);

    const startDrag = (event: React.MouseEvent<HTMLDivElement>) => {
        setDragging(true);
        setPosition({
            x: 0,
            y: 0,
        })
        setOffset({
            x: event.clientX - position.x,
            y: event.clientY - position.y,
        });
    };

    return {
        position,
        offset,
        dragging,
        startDrag,
        endDrag,
    };
}

export { useDragAndDrop };