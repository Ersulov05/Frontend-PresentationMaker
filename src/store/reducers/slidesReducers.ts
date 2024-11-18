import { ActionType, SlidesAction } from "../actionTypes"
import { addSlide } from "../addSlide"
import { PresentationMax } from "../data"
import { SlideType } from "../PresentationType"

export type InitialSlidesStateType = {
    slides: SlideType[],
    selectedSlideIds: string[],
}

const initialSlidesState: InitialSlidesStateType = {
    slides: PresentationMax.slides,
    selectedSlideIds: PresentationMax.selectedSlideIds,
}

const slidesReducer = (state = initialSlidesState, action: SlidesAction) => {
    switch (action.type) {
        case ActionType.ADD_SLIDE:
            return addSlide(state);
        default: 
            return state 
    }
}

export {
    slidesReducer
}