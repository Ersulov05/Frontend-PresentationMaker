import { SlidesStateType } from "../reducers/slidesReducers";

function selectObject(state: SlidesStateType, objectUid: string): SlidesStateType {
    const { slides, selectedSlideIds } = state
    if (selectedSlideIds.length === 0) return state
    return {
        ...state,
        slides: slides.map(slide => {
            if (slide.uid === selectedSlideIds[0]) {
                return {
                    ...slide,
                    selectedObjectIds: [objectUid],
                }
            }
            return slide
        }),
        selectedSlideIds: [selectedSlideIds[0]],
    }
}

export {
    selectObject
}