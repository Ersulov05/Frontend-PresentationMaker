import { generateUID } from "../utils/generateUID";
import { ObjectTextType, Position, Size } from "../PresentationType";
import { SlidesStateType } from "../reducers/slidesReducers";

export type TextDataType = {
    position: Position,
    size: Size,
}

function addTextToSlide(state: SlidesStateType, data: TextDataType): SlidesStateType
{
    const { slides, selectedSlideIds } = state
    if (selectedSlideIds.length == 0) {
        return state
    }
    
    const newText: ObjectTextType = {
        uid: generateUID(),
        pos: data.position,
        size: data.size,
        value: "New text",
        font: {
            style: "normal",
            family: "arial",
            size: 12,
            weight: 400,
            lineHeight: 1
        },
        color: "none",
        backgroundColor: "none",
        type: "text"
    }

    return {
        ...state,
        slides: slides.map(slide => {
            if (slide.uid === selectedSlideIds[0]) {
                return {
                    ...slide,
                    objects: [...slide.objects, newText],
                    selectedObjectIds: [newText.uid]
                }
            }
            return slide
        })
    }
}

export {
    addTextToSlide
}