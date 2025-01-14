import { generateUID } from "../utils/generateUID";
import { ObjectTextType, Position, Size } from "../PresentationType";
import { EditorType } from "../redux/EditorType";

export type TextDataType = {
    position: Position,
    size: Size,
}

function addTextToSlide(editor: EditorType): EditorType {
    const { slides } = editor.presentation
    const { selectedSlideIds } = editor.selection
    if (selectedSlideIds.length == 0) {
        return editor
    }
    
    const newText: ObjectTextType = {
        uid: generateUID(),
        pos: {
            x: 100,
            y: 100,
        },
        size: {
            width: 100,
            height: 100,
        },
        value: "New text",
        font: {
            style: "normal",
            family: "arial",
            size: 12,
            weight: 400,
            lineHeight: 1
        },
        color: {
            type: "solid",
            color: "#000000"
        },
        backgroundColor: {
            type: "solid",
            color: "#00000000"
        },
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