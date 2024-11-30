import { ActionType } from "./actions";
import { EditorType } from "./EditorType";

function setEditor(newEditor: EditorType) {
    return {
        type: ActionType.SET_EDITOR,
        payload: newEditor,
    }
}



export {
    setEditor,
}