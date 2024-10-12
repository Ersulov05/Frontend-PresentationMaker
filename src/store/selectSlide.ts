import { EditorType } from "./editor"

function selectSlide(editor: EditorType, slideUid: string): EditorType {
    const { presentation } = editor
    return {
        ...editor,
        presentation: {
            ...presentation,
            slides: presentation.slides.map(slide => {
                if (slide.uid === slideUid) {
                    return {
                        ...slide,
                        selectedObjectIds: [],
                    }
                }
                return slide
            }),
            selectedSlideIds: [slideUid],
        }
    }
}

export {
    selectSlide
}