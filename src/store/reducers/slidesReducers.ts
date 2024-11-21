import { ActionType, SlidesAction } from "../action-creators/actionTypes"
import { addSlide } from "../slides/addSlide"
import { PresentationMax } from "../data"
import { deleteSlides } from "../slides/deleteSlides"
import { SlideType } from "../PresentationType"
import { selectSlide } from "../slides/selectSlide"
import { selectObject } from "../objects/selectObject"

export type SlidesStateType = {
    slides: SlideType[],
    selectedSlideIds: string[],
}

const initialSlidesState: SlidesStateType = {
    slides: PresentationMax.slides,
    selectedSlideIds: PresentationMax.selectedSlideIds,
}

const slidesReducer = (state: SlidesStateType = initialSlidesState, action: SlidesAction) => {
    switch (action.type) {
        case ActionType.ADD_SLIDE:
            return addSlide(state)
        case ActionType.DELETE_SLIDES:
            return deleteSlides(state)
        case ActionType.DELETE_OBJECTS:
            return state
        case ActionType.SELECT_SLIDE:
            return selectSlide(state, action.payload)
        case ActionType.SELECT_OBJECT:
            return selectObject(state, action.payload)
        case ActionType.ADD_IMAGE_OBJECT:
            return state
        case ActionType.ADD_TEXT_OBJECT:
            return state
        case ActionType.ADD_SLIDE_TO_SELECTION:
            return state
        case ActionType.ADD_OBJECT_TO_SELECTION:
            return state
        case ActionType.TRANSFORM_OBJECT:
            return state
        case ActionType.TARNSLATE_SLIDES:
            return state
        case ActionType.CHANGE_BACKGROUND:
            return state
        default: 
            return state 
    }
}

export {
    slidesReducer
}