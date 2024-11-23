import { generateUID } from "../utils/generateUID";
import { ObjectImageType, Position, Size } from "../PresentationType";
import { SlidesStateType } from "../reducers/slidesReducers";

export type ImageDataType = {
    position: Position,
    size: Size,
    src: string
}

function addImageToSlide(state: SlidesStateType, data: ImageDataType): SlidesStateType
{
    const { slides, selectedSlideIds } = state
    if (selectedSlideIds.length == 0) {
        return state
    }
    
    const newImage: ObjectImageType = {
        uid: generateUID(),
        pos: data.position,
        size: data.size,
        src: data.src,
        type: "image"
    }

    return {
        ...state,
        slides: slides.map(slide => {
            if (slide.uid === selectedSlideIds[0]) {
                return {
                    ...slide,
                    objects: [...slide.objects, newImage],
                    selectedObjectIds: [newImage.uid]
                }
            }
            return slide
        })
    }
}

export {
    addImageToSlide
}