import { EditorType } from "../redux/EditorType";

function selectObject(editor: EditorType, objectUid: string): EditorType {
    const { selectedSlideIds } = editor.selection
    if (selectedSlideIds.length === 0) return editor
    return {
        ...editor,
        selection: {
            ...editor.selection,
            selectedObjectIds: [objectUid],
            selectedSlideIds: [selectedSlideIds[0]],
        }
    }
}

function addObjectToSelection(editor: EditorType, objectUid: string): EditorType {
    const { selectedSlideIds, selectedObjectIds } = editor.selection
    if (selectedSlideIds.length === 0) {
        return editor
    }

    const newSelectedObjectIds = (selectedObjectIds.includes(objectUid))
        ? selectedObjectIds.filter(uid => uid != objectUid)
        : [objectUid, ...selectedObjectIds]

    return {
        ...editor,
        selection: {
            ...editor.selection,
            selectedObjectIds: newSelectedObjectIds,
            selectedSlideIds: [selectedSlideIds[0]]
        }
    }
}

export {
    selectObject,
    addObjectToSelection
}