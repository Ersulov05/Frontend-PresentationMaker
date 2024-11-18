import { ActionType, AddSlideAction } from "./actionTypes"

export const addSlide = (): AddSlideAction => {
    return {
        type: ActionType.ADD_SLIDE
    }
}