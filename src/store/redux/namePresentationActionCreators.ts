import { 
    ActionType, 
    RenamePresentationAction
} from "./actions"

const renamePresentation = (name: string): RenamePresentationAction => {
    return {
        type: ActionType.RENAME_PRESENTATION,
        payload: name
    }
}

export {
    renamePresentation
}