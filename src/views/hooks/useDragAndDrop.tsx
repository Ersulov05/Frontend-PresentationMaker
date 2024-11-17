import { useEffect, useState } from "react";

function useDragAndDrop(saveDrag?: () => void) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState<boolean | null>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const endDrag = () => {
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

    const startDrag = (event: React.MouseEvent<HTMLDivElement>, x: number = 0, y: number = 0) => {
        setDragging(true);
        setOffset({
            x: event.clientX + x,
            y: event.clientY + y,
        });
        setPosition({
            x: x,
            y: y,
        })
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