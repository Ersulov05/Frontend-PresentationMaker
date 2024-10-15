import { Presentation } from "./PresentationType"
import { PresentationMin, PresentationMax } from "./data"

export type EditorType = {
    presentation: Presentation,
    colors: string[]
}

let editor: EditorType = 
{
    presentation: PresentationMax,
    colors: [
        '#000000',
        '#ff0000',
        '#00ff00',
        '#0000ff',
        '#ffff00',
        '#00ffff',
        '#ff00ff',
        '#ffffff'
    ]
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