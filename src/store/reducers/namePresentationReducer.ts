import { ActionType, PresentationNameAction } from "../action-creators/actionTypes"

const namePresentationReducer = (state: string = "New Presentation", action: PresentationNameAction) => {
    switch (action.type) {
        case ActionType.RENAME_PRESENTATION:
            return action.payload
        default: 
            return state 
    }
}

export {
    namePresentationReducer
}