import { ActionType, AddKeyToSetKeysAction, RemoveKeyToSetKeysAction } from "./actions";
import { KeyCodeType } from "./EditorType";

const addKeyToSetKeys = (keyCode: KeyCodeType): AddKeyToSetKeysAction => {
    return {
        type: ActionType.ADD_KEY_TO_SET_KEYS,
        payload: keyCode,
    }
}

const removeKeyToSetKeys = (keyCode: KeyCodeType): RemoveKeyToSetKeysAction => {
    return {
        type: ActionType.REMOVE_KEY_TO_SET_KEYS,
        payload: keyCode,
    }
}

export {
    addKeyToSetKeys,
    removeKeyToSetKeys,
}