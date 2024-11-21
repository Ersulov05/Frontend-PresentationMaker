import { SlidesStateType } from "../reducers/slidesReducers"

function deleteSlides(state: SlidesStateType): SlidesStateType{
    const { slides, selectedSlideIds } = state
    if (selectedSlideIds.length === 0) {
        return state
    }
    const selectedSlides = slides.filter(slide => selectedSlideIds.includes(slide.uid))
    const newSlides = slides.filter(slide => !selectedSlideIds.includes(slide.uid))
    const firstSelectedSlideIndex = slides.findIndex(slide => slide.uid === selectedSlides[0].uid) 
    const newSelectedSlideIndex = newSlides.length - 1 >= firstSelectedSlideIndex
        ? firstSelectedSlideIndex
        : newSlides.length - 1
    let newSelectedSlideIds: Array<string> = []
    if (newSelectedSlideIndex >= 0) {
        newSelectedSlideIds = [ newSlides[newSelectedSlideIndex].uid ]
        newSlides[newSelectedSlideIndex].selectedObjectIds = []
    }

    return {
        ...state,
        slides: newSlides,
        selectedSlideIds: newSelectedSlideIds
    }
}

export {
    deleteSlides
}