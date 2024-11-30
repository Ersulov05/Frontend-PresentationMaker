// import { validateEditorData } from "../services/validationTypes"
// import { Presentation } from "./PresentationType"
// import { PresentationMax } from "./data"

// export type EditorType2 = {
//     presentation: Presentation,
//     colors: string[]
// }

// let editor: EditorType2 = 
// {
//     presentation: PresentationMax,
//     colors: [
//         '#000000',
//         '#ff0000',
//         '#00ff00',
//         '#0000ff',
//         '#ffff00',
//         '#00ffff',
//         '#ff00ff',
//         '#ffffff'
//     ]
// }
// const data = localStorage.getItem('localData')
// if (data) {
//     const editorData = JSON.parse(data)
//     if (validateEditorData(editorData)) {
//         editor = editorData
//     }
// }
// let editorChangeHandler: Function | null = null

// function getEditor()
// {
//     return editor
// }

// function setEditor(newEditor: EditorType)
// {
//     editor = newEditor
// }

// function addEditorChangeHandler(handler: Function)
// {
//     editorChangeHandler = handler
// }

// function dispatch(modifyFn: Function, payload?: Object)
// {
//     const newEditor = modifyFn(editor, payload)
//     localStorage.setItem('localData', JSON.stringify(newEditor))
//     setEditor(newEditor)
//     if (editorChangeHandler)
//     {
//         editorChangeHandler()
//     }
// }

// export { 
//     getEditor, 
//     dispatch, 
//     addEditorChangeHandler
// }