import { SlidesStateType } from "../reducers/slidesReducers";

function deleteObjects(state: SlidesStateType): SlidesStateType {
    const { slides, selectedSlideIds } = state
    if (selectedSlideIds.length == 0) {
        return state
    }
    return {
        ...state,
        slides: slides.map(slide => {
            if (slide.uid === selectedSlideIds[0]) {
                return {
                    ...slide,
                    objects: slide.objects.filter(object => !slide.selectedObjectIds.includes(object.uid)),
                    selectedObjectIds: []
                }
            }
            return slide
        })
    }
}

export {
    deleteObjects
}