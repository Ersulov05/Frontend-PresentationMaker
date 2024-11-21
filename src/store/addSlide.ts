import { generateUID } from "./generateUID"
import { SlideType } from "./PresentationType"
import { SlidesStateType } from "./reducers/slidesReducers"


function addSlide(state: SlidesStateType): SlidesStateType {
    const { slides, selectedSlideIds } = state
    const selectedSlides = slides.filter(slide => selectedSlideIds.includes(slide.uid))
    const lastSelectedIndex = selectedSlides.length > 0
        ? slides.findIndex(slide => slide.uid === selectedSlides[selectedSlides.length - 1].uid)
        : -1
    const newSlide: SlideType = {
        uid: generateUID(),
        background: {
            color: "#FFFFFF",
            type: "solid"
        },
        objects: [],
        selectedObjectIds: []
    }
    const newSlides = lastSelectedIndex >= 0
        ? [...slides.slice(0, lastSelectedIndex + 1), newSlide, ...slides.slice(lastSelectedIndex + 1)]
        : [...slides, newSlide]
    return {
        ...state,
        slides: newSlides,
        selectedSlideIds: [newSlide.uid]  
    }
}

export {
    addSlide
}