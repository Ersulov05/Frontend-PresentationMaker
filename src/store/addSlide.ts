import { EditorType } from "./editor"
import { generateUID } from "./generateUID"
import { SlideType } from "./PresentationType"


function addSlide(editor: EditorType): EditorType {
    const { slides, selectedSlideIds } = editor.presentation
    const selectedSlides = slides.filter(slide => selectedSlideIds.includes(slide.uid))
    const lastSelectedIndex = selectedSlides.length > 0
        ? slides.findIndex(slide => slide.uid === selectedSlides[selectedSlides.length - 1].uid)
        : -1
    const newSlide: SlideType = {
        uid: generateUID(),
        background: {
            color: "#FFFFFF",
            type: "solid"
        },
        objects: [],
        selectedObjectIds: []
    }
    const newSlides = lastSelectedIndex >= 0
        ? [...slides.slice(0, lastSelectedIndex + 1), newSlide, ...slides.slice(lastSelectedIndex + 1)]
        : [...slides, newSlide]
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
            selectedSlideIds: [newSlide.uid]
        }   
    }
}

export {
    addSlide
}