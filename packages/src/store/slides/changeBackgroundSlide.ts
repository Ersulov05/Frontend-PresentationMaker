import { BackgroundType } from "../PresentationType";
import { SlidesStateType } from "../reducers/slidesReducers";

export type BackgroundDataType = {
    background: BackgroundType,
    all?: boolean
}

function changeBackgroundSlide(state: SlidesStateType, data: BackgroundDataType): SlidesStateType
{
    const { slides, selectedSlideIds } = state
    if (selectedSlideIds.length === 0) {
        return state
    }

    return {
        ...state,
        slides: slides.map(slide => {
            if (slide.uid === selectedSlideIds[0] || data.all) {
                return {
                    ...slide,
                    background: data.background
                }
            }
            return slide
        })
    }
}

export {
    changeBackgroundSlide
}