import { SlidesStateType } from "../reducers/slidesReducers"

function selectSlide(state: SlidesStateType, slideUid: string): SlidesStateType {
    const { slides } = state

    return {
        ...state,
        slides: slides.map(slide => {
            if (slide.uid === slideUid) {
                return {
                    ...slide,
                    selectedObjectIds: [],
                }
            }
            return slide
        }),
        selectedSlideIds: [slideUid]
    }
}

export {
    selectSlide
}