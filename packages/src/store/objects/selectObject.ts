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

function addObjectToSelection(state: SlidesStateType, objectUid: string): SlidesStateType {
    const { slides, selectedSlideIds } = state
    if (selectedSlideIds.length === 0) {
        return state
    }
    return {
        ...state,
        slides: slides.map(slide => {
            if (slide.uid === selectedSlideIds[0])
            {
                if (slide.selectedObjectIds.includes(objectUid)) {
                    return {
                        ...slide,
                        selectedObjectIds: slide.selectedObjectIds.filter(uid => uid != objectUid)
                    }
                }
                return {
                    ...slide,
                    selectedObjectIds: [objectUid, ...slide.selectedObjectIds]
                }
            }
            return slide
        })
    }
}

export {
    selectObject,
    addObjectToSelection
}