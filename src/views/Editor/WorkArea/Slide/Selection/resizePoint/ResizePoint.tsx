import { useEffect } from 'react'
import { UseDragAndDropType } from '../../../../../hooks/useDragAndDrop'

type ResizePointProps = {
    className?: string
    dragPoint: UseDragAndDropType
    saveTransformObjects: () => void
}

function ResizePoint({
    className,
    dragPoint,
    saveTransformObjects,
}: ResizePointProps) {

    useEffect(() => {
        if (!dragPoint.dragging && dragPoint.dragging !== null) {
            saveTransformObjects()
            dragPoint.position.x = 0
            dragPoint.position.y = 0
            // dragPoint.resetDrag()
        }   
    }, [dragPoint.dragging]);

    return (
        <div 
            className={className}
            onMouseDown={dragPoint.startDrag}>
        </div>
    )
}

export {
    ResizePoint,
}