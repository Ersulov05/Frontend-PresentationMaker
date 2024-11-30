import { BackgroundType } from "../PresentationType";
import { EditorType } from "../redux/EditorType";

export type BackgroundDataType = {
    background: BackgroundType,
    all?: boolean
}

function changeBackgroundSlide(editor: EditorType, data: BackgroundDataType): EditorType {
    const { slides } = editor.presentation
    const { selectedSlideIds } = editor.selection
    if (selectedSlideIds.length === 0) {
        return editor
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: slides.map(slide => {
                if (slide.uid === selectedSlideIds[0] || data.all) {
                    return {
                        ...slide,
                        background: data.background
                    }
                }
                return slide
            })
        }
    }
}

export {
    changeBackgroundSlide
}