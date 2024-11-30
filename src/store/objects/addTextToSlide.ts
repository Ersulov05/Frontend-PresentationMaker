import { generateUID } from "../utils/generateUID";
import { ObjectTextType, Position, Size } from "../PresentationType";
import { EditorType } from "../redux/EditorType";

export type TextDataType = {
    position: Position,
    size: Size,
}

function addTextToSlide(editor: EditorType, data: TextDataType): EditorType {
    const { slides } = editor.presentation
    const { selectedSlideIds } = editor.selection
    if (selectedSlideIds.length == 0) {
        return editor
    }
    
    const newText: ObjectTextType = {
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
                    }
                }
                return slide
            })
        },
        selection: {
            ...editor.selection,
            selectedObjectIds: [newText.uid]
        }
    }
}

export {
    addTextToSlide
}