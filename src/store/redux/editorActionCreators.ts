import { ActionType, SetEditorAction } from "./actions";
import { EditorType } from "./EditorType";

const setEditor = (newEditor: EditorType): SetEditorAction => {
    return {
        type: ActionType.SET_EDITOR,
        payload: newEditor,
    }
}

export {
    setEditor,
}