import { BackgroundDataType } from "../slides/changeBackgroundSlide";
import { TransformType } from "../PresentationType";
import { ImageDataType } from "../objects/addImageToSlide";
import { TextDataType } from "../objects/addTextToSlide";
import { 
    ActionType, 
    AddImageObjectAction, 
    AddObjectToSelectionAction, 
    AddSlideAction, 
    AddSlideToSelectionAction, 
    AddTextObjectAction, 
    ChangeBackgroundAction, 
    DeleteObjectsAction,
    DeleteSlidesAction, 
    SelectObjectAction, 
    SelectSlideAction, 
    SetSearchedImagesAction, 
    TransformObjectsAction, 
    TranslateSlidesAction 
} from "./actions";
import { ImageData } from "./EditorType";

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

const deleteObjects = (): DeleteObjectsAction => {
    return {
        type: ActionType.DELETE_OBJECTS
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

const addTextObject = (textObject: TextDataType): AddTextObjectAction => {
    return {
        type: ActionType.ADD_TEXT_OBJECT,
        payload: textObject
    }
}

const addImageObject = (imageObject: ImageDataType): AddImageObjectAction => {
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

const SetSearchedImages = (imagesData: ImageData[]): SetSearchedImagesAction => {
    return {
        type: ActionType.SET_SEARCHED_IMAGES,
        payload: imagesData
    }
}

function remap_Response_To_ImagesData(data: any): ImageData[] {
    return data.map((image: any) => {
        return {
            id: image.id,
            url: image.urls.thumb,
            alt: image.alt_description,
        }
    })
}

function searchImageAsync(query: string) {
    return dispatch => {
        const path = `https://api.unsplash.com/search/photos/?client_id=zmwbnGEeZXaffnYV41syLUhrxBj98LIcsKqjZSka_is&query=${query}&per_page=10`
        const result = fetch(path)
        result
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const images = remap_Response_To_ImagesData(data.results);
                console.log(images)
                dispatch(SetSearchedImages(images))
            })
            .catch(() => {})
    }
}
   

export {
    addSlide,
    deleteSlides,
    deleteObjects,
    selectSlide,
    selectObject,
    addImageObject,
    addTextObject,
    addObjectToSelection,
    addSlideToSelection,
    changeBackground,
    transformObjects,
    translateSlides,
    searchImageAsync,
}