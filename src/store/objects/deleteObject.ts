import { EditorType } from "../redux/EditorType";

function deleteObjects(editor: EditorType): EditorType {
    const { slides } = editor.presentation
    const { selectedSlideIds } = editor.selection
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
                    }
                }
                return slide
            })
        },
        selection: {
            ...editor.selection,
            selectedObjectIds: []
        }
    }
}

export {
    deleteObjects
}