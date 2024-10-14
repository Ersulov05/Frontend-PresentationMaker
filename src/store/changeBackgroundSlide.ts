import { EditorType } from "./editor";
import { Solid, Image } from "./PresentationType";

function changeBackgroundSlide(editor: EditorType, background: Solid | Image): EditorType
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
                if (slide.uid === selectedSlideIds[0]) { // || all
                    return {
                        ...slide,
                        background: background
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