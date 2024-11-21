import { ObjectImageType, ObjectTextType, TransformType } from "../PresentationType"
import { BackgroundDataType } from "../slides/changeBackgroundSlide"
import { 
    ActionType, 
    AddImageObjectAction, 
    AddObjectToSelectionAction, 
    AddSlideAction, 
    AddSlideToSelectionAction, 
    AddTextObjectAction, 
    ChangeBackgroundAction, 
    DeleteSlidesAction,
    SelectObjectAction,
    SelectSlideAction,
    TransformObjectsAction,
    TranslateSlidesAction
} from "./actionTypes"

const addSlide = (): AddSlideAction => {
    return {
        type: ActionType.ADD_SLIDE
    }
}

const deleteSlides = (): DeleteSlidesAction => {
    return {
        type: ActionType.DELETE_SLIDES
    }
}

const selectSlide = (slideUid: string): SelectSlideAction => {
    return {
        type: ActionType.SELECT_SLIDE,
        payload: slideUid
    }
}

const selectObject = (objectUid: string): SelectObjectAction => {
    return {
        type: ActionType.SELECT_OBJECT,
        payload: objectUid
    }
}

const addObjectToSelection = (objectUid: string): AddObjectToSelectionAction => {
    return {
        type: ActionType.ADD_OBJECT_TO_SELECTION,
        payload: objectUid
    }
}

const addSlideToSelection = (slideUid: string): AddSlideToSelectionAction => {
    return {
        type: ActionType.ADD_SLIDE_TO_SELECTION,
        payload: slideUid
    }
}

const addTextObject = (textObject: ObjectTextType): AddTextObjectAction => {
    return {
        type: ActionType.ADD_TEXT_OBJECT,
        payload: textObject
    }
}

const addImageObject = (imageObject: ObjectImageType): AddImageObjectAction => {
    return {
        type: ActionType.ADD_IMAGE_OBJECT,
        payload: imageObject
    }
}

const transformObjects = (transform: TransformType): TransformObjectsAction => {
    return {
        type: ActionType.TRANSFORM_OBJECT,
        payload: transform
    }
}

const translateSlides = (index: number): TranslateSlidesAction => {
    return {
        type: ActionType.TARNSLATE_SLIDES,
        payload: index
    }
}

const changeBackground = (backgroundData: BackgroundDataType): ChangeBackgroundAction => {
    return {
        type: ActionType.CHANGE_BACKGROUND,
        payload: backgroundData
    }
}

export const slidesActions = {
    addSlide,
    deleteSlides,
    selectSlide,
    selectObject,
    addImageObject,
    addTextObject,
    addObjectToSelection,
    addSlideToSelection,
    changeBackground,
    transformObjects,
    translateSlides,
}