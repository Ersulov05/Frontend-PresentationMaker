import { ObjectTextType } from "../PresentationType";
import { EditorType } from "../redux/EditorType";

function changeTextObject(editor: EditorType, text: ObjectTextType): EditorType {
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
                                    ...text
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