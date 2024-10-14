import { EditorType } from "./editor";
import { Solid, Image } from "./PresentationType";

export type BackgroundDataType = {
    background: Solid | Image,
    all?: boolean
}

function changeBackgroundSlide(editor: EditorType, data: BackgroundDataType): EditorType
{
    const { slides, selectedSlideIds } = editor.presentation
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