import { EditorType } from "./editor";
import { generateUID } from "./generateUID";
import { ObjectText, Position, Size } from "./PresentationType";

export type TextDataType = {
    position: Position,
    size: Size,
}

function addTextToSlide(editor: EditorType, data: TextDataType): EditorType
{
    const { slides, selectedSlideIds } = editor.presentation
    if (selectedSlideIds.length == 0) {
        return editor
    }
    
    const newText: ObjectText = {
        uid: generateUID(),
        pos: data.position,
        size: data.size,
        value: "New text",
        font: {
            style: "normal",
            family: "arial",
            size: 12,
            weight: 400,
            lineHeight: 1
        },
        color: "none",
        backgroundColor: "none",
        type: "text"
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: slides.map(slide => {
                if (slide.uid === selectedSlideIds[0]) {
                    return {
                        ...slide,
                        objects: [...slide.objects, newText],
                        selectedObjectIds: [newText.uid]
                    }
                }
                return slide
            })
        }
    }
}

export {
    addTextToSlide
}