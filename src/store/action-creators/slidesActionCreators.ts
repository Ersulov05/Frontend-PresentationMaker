import { 
    ActionType, 
    AddSlideAction, 
    DeleteSlidesAction,
    SelectSlideAction
} from "./actionTypes"

const addSlide = (): AddSlideAction => {
    return {
        type: ActionType.ADD_SLIDE
    }
}

const deleteSlides = (): DeleteSlidesAction => {
    return {
        type: ActionType.DELETE_SLIDES
    }
}

const selectSlide = (slideUid: string): SelectSlideAction => {
    return {
        type: ActionType.SELECT_SLIDE,
        payload: slideUid
    }
}

export const slidesActions = {
    addSlide,
    deleteSlides,
    selectSlide,
}