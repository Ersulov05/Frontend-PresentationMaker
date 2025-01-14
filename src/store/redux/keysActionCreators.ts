import { ActionType, AddKeyToSetKeysAction, RemoveKeyToSetKeysAction } from "./actions";

const addKeyToSetKeys = (keyCode: string): AddKeyToSetKeysAction => {
    return {
        type: ActionType.ADD_KEY_TO_SET_KEYS,
        payload: keyCode,
    }
}

const removeKeyToSetKeys = (keyCode: string): RemoveKeyToSetKeysAction => {
    return {
        type: ActionType.REMOVE_KEY_TO_SET_KEYS,
        payload: keyCode,
    }
}

export {
    addKeyToSetKeys,
    removeKeyToSetKeys,
}