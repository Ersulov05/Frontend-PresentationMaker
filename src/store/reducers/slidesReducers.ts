import { ActionType, SlidesAction } from "../action-creators/actionTypes"
import { addSlide } from "../addSlide"
import { PresentationMax } from "../data"
import { deleteSlides } from "../deleteSlides"
import { SlideType } from "../PresentationType"
import { selectSlide } from "../selectSlide"

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
        case ActionType.SELECT_SLIDE:
            return selectSlide(state, action.payload)
        default: 
            return state 
    }
}

export {
    slidesReducer
}