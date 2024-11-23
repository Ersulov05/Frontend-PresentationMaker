import { ActionType, SlidesAction } from "../action-creators/actionTypes"
import { addSlide } from "../slides/addSlide"
import { PresentationMax } from "../data"
import { deleteSlides } from "../slides/deleteSlides"
import { SlideType } from "../PresentationType"
import { addSlideToSelection, selectSlide } from "../slides/selectSlide"
import { addObjectToSelection, selectObject } from "../objects/selectObject"
import { deleteObjects } from "../objects/deleteObject"
import { addImageToSlide } from "../objects/addImageToSlide"
import { addTextToSlide } from "../objects/addTextToSlide"
import { transformObjects } from "../objects/transformObject"
import { translateSlides } from "../slides/translateSlides"
import { changeBackgroundSlide } from "../slides/changeBackgroundSlide"

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
            return deleteObjects(state)
        case ActionType.SELECT_SLIDE:
            return selectSlide(state, action.payload)
        case ActionType.SELECT_OBJECT:
            return selectObject(state, action.payload)
        case ActionType.ADD_IMAGE_OBJECT:
            return addImageToSlide(state, action.payload)
        case ActionType.ADD_TEXT_OBJECT:
            return addTextToSlide(state, action.payload)
        case ActionType.ADD_SLIDE_TO_SELECTION:
            return addSlideToSelection(state, action.payload)
        case ActionType.ADD_OBJECT_TO_SELECTION:
            return addObjectToSelection(state, action.payload)
        case ActionType.TRANSFORM_OBJECT:
            return transformObjects(state, action.payload)
        case ActionType.TARNSLATE_SLIDES:
            return translateSlides(state, action.payload)
        case ActionType.CHANGE_BACKGROUND:
            return changeBackgroundSlide(state, action.payload)
        default: 
            return state 
    }
}

export {
    slidesReducer
}