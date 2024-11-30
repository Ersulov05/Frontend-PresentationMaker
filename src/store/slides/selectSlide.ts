import { EditorType } from "../redux/EditorType"

function selectSlide(editor: EditorType, slideUid: string): EditorType {
    return {
        ...editor,
        selection: {
            selectedSlideIds: [slideUid],
            selectedObjectIds: []
        }
    }
}

function addSlideToSelection(editor: EditorType, slideUid: string): EditorType {
    const { selectedSlideIds } = editor.selection
    if (selectedSlideIds.includes(slideUid)) {
        if (selectedSlideIds.length == 1) {
            return editor
        }
        return {
            ...editor,
            selection: {
                selectedSlideIds: selectedSlideIds.filter(uid => uid != slideUid),
                selectedObjectIds: []
            }
        }
    }
    return {
        ...editor,
        selection: {
            selectedSlideIds: [slideUid, ...selectedSlideIds],
            selectedObjectIds: []
        }
    }
}

export {
    selectSlide,
    addSlideToSelection
}