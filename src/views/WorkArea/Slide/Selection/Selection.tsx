import { CSSProperties, useEffect } from "react"
import { joinStyles } from "../../../../store/joinStyles"
import styles from "./Selection.module.css"
import { useDragAndDrop } from "../hooks/useDragAndDrop"
import { dispatch } from "../../../../store/editor"
import { transformObjects } from "../../../../store/transformObject"
import { ObjectType, TransformType } from "../../../../store/PresentationType"
import ImageObject from "../ImageObject/ImageObject"
import TextObject from "../TextObject/TextObject"

type SelectionProps = {
    transform: TransformType
    scale: number
    selectedObjects: ObjectType[]
}

function Selection({
    transform,
    scale,
    selectedObjects,
}: SelectionProps) {
    const leftUpPoint = useDragAndDrop();
    const rightUpPoint = useDragAndDrop();
    const leftDownPoint = useDragAndDrop();
    const rightDownPoint = useDragAndDrop();
    const drag = useDragAndDrop();

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
        dispatch(transformObjects, transform_)
    }

    useEffect(() => {
        if (!leftUpPoint.dragging) { 
            saveTransformObjects()
            leftUpPoint.position.x = 0
            leftUpPoint.position.y = 0
        }   
    }, [leftUpPoint.dragging]);

    useEffect(() => {
        if (!rightUpPoint.dragging) {
            saveTransformObjects()
            rightUpPoint.position.x = 0
            rightUpPoint.position.y = 0
        }   
    }, [rightUpPoint.dragging]);

    useEffect(() => {
        if (!leftDownPoint.dragging) {
            saveTransformObjects()
            leftDownPoint.position.x = 0
            leftDownPoint.position.y = 0
        }   
    }, [leftDownPoint.dragging]);

    useEffect(() => {
        if (!rightDownPoint.dragging) {
            saveTransformObjects()
            rightDownPoint.position.x = 0
            rightDownPoint.position.y = 0
        }   
    }, [rightDownPoint.dragging]);

    useEffect(() => {
        if (!drag.dragging) {
            saveTransformObjects()
            drag.position.x = 0
            drag.position.y = 0
        }   
    }, [drag.dragging]);

    const dragX = leftUpPoint.position.x + leftDownPoint.position.x + drag.position.x
    const dragY = leftUpPoint.position.y + rightUpPoint.position.y + drag.position.y
    const dragWidth = rightUpPoint.position.x - leftUpPoint.position.x - leftDownPoint.position.x + rightDownPoint.position.x
    const dragHeight = - rightUpPoint.position.y - leftUpPoint.position.y + leftDownPoint.position.y + rightDownPoint.position.y

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
                style={selectStyles}>
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
                <div 
                    className={joinStyles(styles.leftUp, styles.point)}
                    onMouseDown={leftUpPoint.startDrag}>
                </div>
                <div 
                    className={joinStyles(styles.rightUp, styles.point)}
                    onMouseDown={rightUpPoint.startDrag}>
                </div>
                <div 
                    className={joinStyles(styles.leftDown, styles.point)}
                    onMouseDown={leftDownPoint.startDrag}>
                </div>
                <div 
                    className={joinStyles(styles.rightDown, styles.point)}
                    onMouseDown={rightDownPoint.startDrag}>
                </div>
            </div>
            {selectedObjects.map(object => {
                const dragObject: ObjectType = {
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
                switch (dragObject.type) {
                    case 'text':
                        return (
                            <TextObject 
                                key={object.uid} 
                                object={dragObject} 
                                scale={scale} 
                                isSelected={false}
                            />
                        );
                    case 'image':
                        return (
                            <ImageObject 
                                key={object.uid} 
                                object={dragObject} 
                                scale={scale}
                                isSelected={false}
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