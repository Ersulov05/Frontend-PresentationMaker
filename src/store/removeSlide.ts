import { EditorType } from "./editor"
function removeSlide(editor: EditorType): EditorType{
    const { slides, selectedSlideIds } = editor.presentation
    if (selectedSlideIds.length === 0) {
        return editor
    }
    const selectedSlides = slides.filter(slide => selectedSlideIds.includes(slide.uid))
    const newSlides = slides.filter(slide => !selectedSlideIds.includes(slide.uid))
    const firstSelectedSlideIndex = slides.findIndex(slide => slide.uid === selectedSlides[0].uid) 
    const newSelectedSlideIndex = newSlides.length - 1 >= firstSelectedSlideIndex
        ? firstSelectedSlideIndex
        : newSlides.length - 1
    let newSelectedSlideIds: Array<string> = []
    if (newSelectedSlideIndex >= 0) {
        newSelectedSlideIds = [ newSlides[newSelectedSlideIndex].uid ]
        newSlides[newSelectedSlideIndex].selectedObjectIds = []
    }
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
            selectedSlideIds: newSelectedSlideIds
        }
    }
}

export {
    removeSlide
}