import { EditorType } from "./editor";
import { ObjectType, TransformType } from "./PresentationType";

function transformObject(editor: EditorType, transform: TransformType): EditorType {
    const { slides, selectedSlideIds} = editor.presentation
    if (selectedSlideIds.length === 0) {
        return editor
    }
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: slides.map(slide => {
                if (slide.uid === selectedSlideIds[0] && slide.selectedObjectIds.length > 0) {
                    return {
                        ...slide,
                        objects: slide.objects.map(object => {
                            if (object.uid === slide.selectedObjectIds[0]) {
                                return {
                                    ...object,
                                    pos: transform.position,
                                    size: transform.size
                                }
                            }
                            return object
                        })
                    }
                }
                return slide
            })
        }
    }
}

function getGlobalSelectionObject(selectedObjects: ObjectType[]): TransformType {
    if (selectedObjects.length === 0) {
        return {
            position: {
                x: 0,
                y: 0
            },
            size: {
                width: 0,
                height: 0
            }
        }
    }
    let xStart = selectedObjects[0].pos.x
    let yStart = selectedObjects[0].pos.y
    let xEnd = selectedObjects[0].pos.x + selectedObjects[0].size.width
    let yEnd = selectedObjects[0].pos.y + selectedObjects[0].size.height
    selectedObjects.forEach(object => { 
        xStart = Math.min(object.pos.x, xStart)
        yStart = Math.min(object.pos.y, yStart)
        xEnd = Math.max(object.pos.x + object.size.width, xEnd)
        yEnd = Math.max(object.pos.y + object.size.height, yEnd)
    })
    return {
        position: {
            x: xStart,
            y: yStart
        },
        size: {
            width: xEnd - xStart,
            height: yEnd - yStart
        }
    }
}

function transformObjects(editor: EditorType, transform: TransformType): EditorType {
    const { slides, selectedSlideIds} = editor.presentation
    if (selectedSlideIds.length === 0) {
        return editor
    }
    const selectedSlideIndex = slides.findIndex(slide => slide.uid === selectedSlideIds[0])
    const { objects, selectedObjectIds } = slides[selectedSlideIndex]
    if (selectedObjectIds.length == 0) {
        return editor
    }
    const selectedObjects = objects.filter(object => selectedObjectIds.includes(object.uid))
    const globalSelectedTransform = getGlobalSelectionObject(selectedObjects)
    const widthScale = transform.size.width / globalSelectedTransform.size.width
    const heightScale = transform.size.height / globalSelectedTransform.size.height
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: slides.map(slide => {
                if (slide.uid === selectedSlideIds[0] && slide.selectedObjectIds.length > 0) {
                    return {
                        ...slide,
                        objects: slide.objects.map(object => {
                            if (selectedObjectIds.includes(object.uid)) {
                                return {
                                    ...object,
                                    pos: {
                                        x: (object.pos.x - globalSelectedTransform.position.x) * widthScale + transform.position.x,
                                        y: (object.pos.y - globalSelectedTransform.position.y) * heightScale + transform.position.y
                                    },
                                    size: {
                                        width: object.size.width * widthScale,
                                        height: object.size.height * heightScale
                                    }
                                }
                            } 
                            return object
                        })
                    }
                }
                return slide
            })
        }
    }
}

export {
    transformObject,
    transformObjects
}