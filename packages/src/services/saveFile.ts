import { EditorType, getEditor } from "../store/editor"

function saveEditorToFile(filename: string) {
    const editor: EditorType = getEditor()
    const jsonString = JSON.stringify(editor, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}

export {
    saveEditorToFile
}