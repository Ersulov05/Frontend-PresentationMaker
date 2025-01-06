import { CSSProperties, useEffect, useState } from "react"
import { joinStyles } from "../../../../store/utils/joinStyles"
import styles from "./Selection.module.css"
import { useDragAndDrop } from "../../../hooks/useDragAndDrop"
import { ObjectType, TransformType } from "../../../../store/PresentationType"
import ImageObject from "../ImageObject/ImageObject"
import TextObject from "../TextObject/TextObject"
import { useAppActions } from "../../../hooks/useAppActions"
import { ResizePoint } from "./resizePoint/ResizePoint"
import useAppSelector from "../../../hooks/useAppSelector"

type SelectionProps = {
    transform: TransformType
    scale: number
    selectedObjects: ObjectType[]
}

function isEditedSelecteon(edetedObjectUid: string, selectedObjectIds: string[]): boolean {
    return selectedObjectIds.length === 1 && edetedObjectUid === selectedObjectIds[0]
}

function Selection({
    transform,
    scale,
    selectedObjects,
}: SelectionProps) {
    const leftPoint = useDragAndDrop()
    const rightPoint = useDragAndDrop()
    const downPoint = useDragAndDrop()
    const upPoint = useDragAndDrop()
    const leftUpPoint = useDragAndDrop()
    const rightUpPoint = useDragAndDrop()
    const leftDownPoint = useDragAndDrop()
    const rightDownPoint = useDragAndDrop()
    const drag = useDragAndDrop()
    const { transformObjects } = useAppActions()
    const [ edetedObject, setEditedObject ] = useState<string>('')
    const selectedObjectIds = useAppSelector(editor => editor.selection.selectedObjectIds)

    function getDragObject(object: ObjectType): ObjectType {
        return {
            ...object,
            size: {
                width: object.size.width * widthScale_,
                height: object.size.height * heightScale_
            },
            pos: {
                x: transform.position.x  + dragX/scale + (object.pos.x - transform.position.x) * widthScale,
                y: transform.position.y  + dragY/scale + (object.pos.y - transform.position.y) * heightScale
            }
        }
    }

    function saveTransformObjects() {
        const transform_: TransformType = {
            position: {
                x: transform.position.x + dragX/scale,
                y: transform.position.y + dragY/scale,
            },
            size: {
                width: transform.size.width + dragWidth/scale,
                height: transform.size.height + dragHeight/scale
            }
        }
        transformObjects(transform_)
    }

    useEffect(() => {
        if (!drag.dragging && drag.dragging !== null) {
            saveTransformObjects()
            drag.position.x = 0
            drag.position.y = 0
        }   
    }, [drag.dragging])

    useEffect(() => {
        if (!isEditedSelecteon(edetedObject, selectedObjectIds)) {
            setEditedObject('')
        }  
    }, [selectedObjectIds]);

    const dragX = leftUpPoint.position.x + leftDownPoint.position.x + drag.position.x + leftPoint.position.x
    const dragY = leftUpPoint.position.y + rightUpPoint.position.y + drag.position.y + upPoint.position.y
    const dragWidth = rightUpPoint.position.x - leftUpPoint.position.x - leftDownPoint.position.x + rightDownPoint.position.x - leftPoint.position.x + rightPoint.position.x
    const dragHeight = - rightUpPoint.position.y - leftUpPoint.position.y + leftDownPoint.position.y + rightDownPoint.position.y - upPoint.position.y + downPoint.position.y

    const widthScale = (dragWidth + transform.size.width) / transform.size.width;
    const heightScale = (dragHeight + transform.size.height) / transform.size.height;
    const widthScale_ = (dragWidth + transform.size.width) / transform.size.width;
    const heightScale_ = (dragHeight + transform.size.height) / transform.size.height;

    const selectStyles: CSSProperties = {
        top: transform.position.y * scale + dragY -2 + "px",
        left: transform.position.x * scale + dragX -2 + "px",
        width: transform.size.width * scale + dragWidth + "px",
        height: transform.size.height * scale + dragHeight + "px"
    }

    return (
        <>
            <div 
                className={styles.container}
                style={selectStyles}
            >
                {!edetedObject && 
                    <>
                        <div
                            className={joinStyles(styles.verticalLine, styles.left)}
                            onMouseDown={drag.startDrag}>
                        </div>
                        <div
                            className={joinStyles(styles.horizontalLine, styles.top)}
                            onMouseDown={drag.startDrag}>
                        </div>
                        <div
                            className={joinStyles(styles.verticalLine, styles.right)}
                            onMouseDown={drag.startDrag}>
                        </div>
                        <div
                            className={joinStyles(styles.horizontalLine, styles.bottom)}
                            onMouseDown={drag.startDrag}>
                        </div>

                        <ResizePoint 
                            className={joinStyles(styles.left, styles.point)}
                            saveTransformObjects={saveTransformObjects}
                            dragPoint={leftPoint}
                        />
                        <ResizePoint 
                            className={joinStyles(styles.right, styles.point)}
                            saveTransformObjects={saveTransformObjects}
                            dragPoint={rightPoint}
                        />
                        <ResizePoint 
                            className={joinStyles(styles.bottom, styles.point)}
                            saveTransformObjects={saveTransformObjects}
                            dragPoint={downPoint}
                        />
                        <ResizePoint 
                            className={joinStyles(styles.top, styles.point)}
                            saveTransformObjects={saveTransformObjects}
                            dragPoint={upPoint}
                        />

                        <ResizePoint 
                            className={joinStyles(styles.leftUp, styles.point)}
                            saveTransformObjects={saveTransformObjects}
                            dragPoint={leftUpPoint}
                        />
                        <ResizePoint 
                            className={joinStyles(styles.rightUp, styles.point)}
                            saveTransformObjects={saveTransformObjects}
                            dragPoint={rightUpPoint}
                        />
                        <ResizePoint 
                            className={joinStyles(styles.leftDown, styles.point)}
                            saveTransformObjects={saveTransformObjects}
                            dragPoint={leftDownPoint}
                        />
                        <ResizePoint 
                            className={joinStyles(styles.rightDown, styles.point)}
                            saveTransformObjects={saveTransformObjects}
                            dragPoint={rightDownPoint}
                        />
                    </>
                }
            </div>
            {selectedObjects.map(object => {
                const dragObject: ObjectType = getDragObject(object)
                switch (dragObject.type) {
                    case 'text':
                        return (
                            <TextObject 
                                key={object.uid} 
                                object={dragObject} 
                                scale={scale} 
                                selected={false}
                                onSetEdited={selectedObjectIds.length === 1 
                                    ? () => setEditedObject(object.uid)
                                    : undefined
                                }
                                edited={edetedObject === object.uid}
                            />
                        );
                    case 'image':
                        return (
                            <ImageObject 
                                key={object.uid} 
                                object={dragObject} 
                                scale={scale}
                                selected={false}
                                onSetEdited={selectedObjectIds.length === 1 
                                    ? () => setEditedObject(object.uid)
                                    : undefined
                                }
                                edited={edetedObject === object.uid}
                            />
                        );
                    default:
                        return null;
                }
            })}
        </>
    )
}

export {
    Selection,
}