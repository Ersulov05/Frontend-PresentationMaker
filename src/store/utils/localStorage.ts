import { Store } from "redux";
import { EditorType } from "../redux/EditorType";
import { ActionCreatorsType } from "../redux/actions";

function initLocalStorage(store: Store<EditorType, ActionCreatorsType>) {
    store.subscribe(() => {
        const editor = store.getState()
        localStorage.setItem('localData', JSON.stringify(editor))
    })
}

export {
    initLocalStorage
}