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

function addSlideToSelection(state: SlidesStateType, slideUid: string): SlidesStateType {
    const { selectedSlideIds } = state
    if (selectedSlideIds.includes(slideUid)) {
        if (selectedSlideIds.length == 1) {
            return state
        }
        return {
            ...state,
            selectedSlideIds: selectedSlideIds.filter(uid => uid != slideUid)
        }
    }
    return {
        ...state,
        selectedSlideIds: [slideUid, ...selectedSlideIds]
    }
}

export {
    selectSlide,
    addSlideToSelection
}