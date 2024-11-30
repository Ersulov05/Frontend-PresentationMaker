import { EditorType } from "../redux/EditorType";

function translateSlides(editor: EditorType, insertIndex: number): EditorType {
    const { slides } = editor.presentation
    const { selectedSlideIds } = editor.selection
    if (selectedSlideIds.length === 0) {
        return editor
    }
    const changedSlides = slides.filter(slide => !selectedSlideIds.includes(slide.uid))
    if (insertIndex >= -1 && insertIndex < changedSlides.length) {
        const selectedSlides = slides.filter(slide => selectedSlideIds.includes(slide.uid))
        changedSlides.splice(insertIndex + 1, 0, ...selectedSlides)
    } else {
        return editor
    }
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: changedSlides
        }
    } 
}

export {
    translateSlides
}