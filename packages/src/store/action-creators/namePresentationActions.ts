

import { 
    ActionType, 
    RenamePresentationAction
} from "./actionTypes"

const renamePresentation = (name: string): RenamePresentationAction => {
    return {
        type: ActionType.RENAME_PRESENTATION,
        payload: name
    }
}

export const renamePresentationActions = {
    renamePresentation
}