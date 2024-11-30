import { generateUID } from "../utils/generateUID";
import { ObjectImageType, Position, Size } from "../PresentationType";
import { EditorType } from "../redux/EditorType";

export type ImageDataType = {
    position: Position,
    size: Size,
    src: string
}

function addImageToSlide(editor: EditorType, data: ImageDataType): EditorType {
    const { slides } = editor.presentation
    const { selectedSlideIds } = editor.selection
    if (selectedSlideIds.length == 0) {
        return editor
    }
    
    const newImage: ObjectImageType = {
        uid: generateUID(),
        pos: data.position,
        size: data.size,
        src: data.src,
        type: "image"
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: slides.map(slide => {
                if (slide.uid === selectedSlideIds[0]) {
                    return {
                        ...slide,
                        objects: [...slide.objects, newImage],
                    }
                }
                return slide
            })
        },
        selection: {
            ...editor.selection,
            selectedObjectIds: [newImage.uid]
        }
    }
}

export {
    addImageToSlide
}