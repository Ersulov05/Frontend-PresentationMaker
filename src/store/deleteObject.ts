import { EditorType } from "./editor";

function deleteObject(editor: EditorType): EditorType {
    const { slides, selectedSlideIds } = editor.presentation
    if (selectedSlideIds.length == 0) {
        return editor
    }
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: slides.map(slide => {
                if (slide.uid === selectedSlideIds[0]) {
                    return {
                        ...slide,
                        objects: slide.objects.filter(object => !slide.selectedObjectIds.includes(object.uid)),
                        selectedObjectIds: []
                    }
                }
                return slide
            })
        }
    }
}

export {
    deleteObject
}