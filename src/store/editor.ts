import { Presentation } from "./PresentationType"
import { PresentationMin, PresentationMax } from "./data"

export type EditorType = {
    presentation: Presentation,
}

let editor: EditorType = 
{
    presentation: PresentationMax,
}
let editorChangeHandler: Function | null = null

function getEditor()
{
    return editor
}

function setEditor(newEditor: EditorType)
{
    editor = newEditor
}

function addEditorChangeHandler(handler: Function)
{
    editorChangeHandler = handler
}

function dispatch(modifyFn: Function, payload?: Object)
{
    const newEditor = modifyFn(editor, payload)
    setEditor(newEditor)
    if (editorChangeHandler)
    {
        editorChangeHandler()
    }
}

export { 
    getEditor, 
    dispatch, 
    addEditorChangeHandler
}