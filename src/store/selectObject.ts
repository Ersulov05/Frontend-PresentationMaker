import { EditorType } from "./editor";

function selectObject(editor: EditorType, objectUid: string): EditorType {
    const { slides, selectedSlideIds } = editor.presentation
    if (selectedSlideIds.length === 0) return editor
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: slides.map(slide => {
                if (slide.uid === selectedSlideIds[0]) {
                    return {
                        ...slide,
                        selectedObjectIds: [objectUid],
                    }
                }
                return slide
            }),
            selectedSlideIds: [selectedSlideIds[0]],
        }
    }
}

export {
    selectObject
}