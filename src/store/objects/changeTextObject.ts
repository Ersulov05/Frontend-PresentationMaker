import { EditorType } from "../redux/EditorType";

function changeTextObject(editor: EditorType, text: string): EditorType {
    const { selectedSlideIds, selectedObjectIds } = editor.selection
    if (selectedSlideIds.length === 0 || selectedObjectIds.length === 0) return editor
    const { slides } = editor.presentation
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: slides.map(slide => {
                if (selectedSlideIds[0] === slide.uid) {
                    return {
                        ...slide,
                        objects: slide.objects.map(object => {
                            if (selectedObjectIds[0] === object.uid) {
                                return {
                                    ...object,
                                    value: text
                                }
                            }
                            return object
                        })
                    } 
                }
                return slide
            })
        }
    }
}

export {
    changeTextObject,
}