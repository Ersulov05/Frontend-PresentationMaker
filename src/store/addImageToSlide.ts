import { EditorType } from "./editor";
import { generateUID } from "./generateUID";
import { ObjectImage, Position, Size } from "./PresentationType";

export type ImageDataType = {
    position: Position,
    size: Size,
    src: string
}

function addImageToSlide(editor: EditorType, data: ImageDataType): EditorType
{
    const { slides, selectedSlideIds } = editor.presentation
    if (selectedSlideIds.length == 0) {
        return editor
    }
    
    const newImage: ObjectImage = {
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
                        selectedObjectIds: [newImage.uid]
                    }
                }
                return slide
            })
        }
    }
}

export {
    addImageToSlide
}