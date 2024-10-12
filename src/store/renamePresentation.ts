import { EditorType } from "./editor";

function renamePresentation(editor: EditorType, name: string) {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            name: name
        }
    }
}

export {
    renamePresentation
}