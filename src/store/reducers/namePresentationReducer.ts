import { ActionType, PresentationNameAction } from "../actionTypes"
import { SlideType } from "../PresentationType"

export type InitialSlidesStateType = {
    slides: SlideType[],
    selectedSlideIds: string[],
}

const namePresentationReducer = (state: string = "New Presentation", action: PresentationNameAction) => {
    switch (action.type) {
        case ActionType.RENAME_PRESENTATION:
            return state
        default: 
            return state 
    }
}

export {
    namePresentationReducer
}