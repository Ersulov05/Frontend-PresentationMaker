import { generateUID } from "../utils/generateUID"
import { SlideType } from "../PresentationType"
import { EditorType } from "../redux/EditorType"


function addSlide(editor: EditorType): EditorType {
    const { slides } = editor.presentation
    const { selectedSlideIds } = editor.selection
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
        },
        selection: {
            ...editor.selection,
            selectedSlideIds: [newSlide.uid]
        }
    }
}

export {
    addSlide
}