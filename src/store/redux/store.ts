import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { editorReducer } from "./editorReducer";
import { thunk } from 'redux-thunk'

const store = createStore(editorReducer, applyMiddleware(thunk))

export {
    store
}