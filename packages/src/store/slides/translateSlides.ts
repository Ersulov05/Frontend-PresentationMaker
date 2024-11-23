import { SlidesStateType } from "../reducers/slidesReducers";

function translateSlides(state: SlidesStateType, insertIndex: number): SlidesStateType {
    const { slides, selectedSlideIds} = state
    if (selectedSlideIds.length === 0) {
        return state
    }
    const changedSlides = slides.filter(slide => !selectedSlideIds.includes(slide.uid))
    if (insertIndex >= -1 && insertIndex < changedSlides.length) {
        const selectedSlides = slides.filter(slide => selectedSlideIds.includes(slide.uid))
        changedSlides.splice(insertIndex + 1, 0, ...selectedSlides)
    } else {
        return state
    }
    return {
        ...state,
        slides: changedSlides
    } 
}

export {
    translateSlides
}