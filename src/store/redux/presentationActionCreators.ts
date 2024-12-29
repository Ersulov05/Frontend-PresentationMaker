import { PresentationType } from "../PresentationType";
import { ActionType, SetPresentationAction } from "./actions";

const setPresentation = (presentation: PresentationType): SetPresentationAction => {
    return {
        type: ActionType.SET_PRESENTATION,
        payload: presentation,
    }
}

export {
    setPresentation,
}