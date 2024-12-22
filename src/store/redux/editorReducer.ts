import { EditorType } from "./EditorType";
import { ActionType, EditorAction } from "./actions";
import { defaultEditor } from "../data";
import { addSlide } from "../slides/addSlide";
import { deleteSlides } from "../slides/deleteSlides";
import { deleteObjects } from "../objects/deleteObject";
import { addSlideToSelection, selectSlide } from "../slides/selectSlide";
import { addObjectToSelection, selectObject } from "../objects/selectObject";
import { addImageToSlide } from "../objects/addImageToSlide";
import { addTextToSlide } from "../objects/addTextToSlide";
import { transformObjects } from "../objects/transformObject";
import { translateSlides } from "../slides/translateSlides";
import { changeBackgroundSlide } from "../slides/changeBackgroundSlide";

function editorReducer(editor: EditorType = defaultEditor, action: EditorAction): EditorType {
    switch (action.type) {
        case ActionType.ADD_SLIDE: 
            return addSlide(editor)
        case ActionType.DELETE_SLIDES:
            return deleteSlides(editor)
        case ActionType.DELETE_OBJECTS:
            return deleteObjects(editor)
        case ActionType.SELECT_SLIDE:
            return selectSlide(editor, action.payload)
        case ActionType.SELECT_OBJECT:
            return selectObject(editor, action.payload)
        case ActionType.ADD_IMAGE_OBJECT:
            return addImageToSlide(editor, action.payload)
        case ActionType.ADD_TEXT_OBJECT:
            return addTextToSlide(editor, action.payload)
        case ActionType.ADD_SLIDE_TO_SELECTION:
            return addSlideToSelection(editor, action.payload)
        case ActionType.ADD_OBJECT_TO_SELECTION:
            return addObjectToSelection(editor, action.payload)
        case ActionType.TRANSFORM_OBJECT:
            return transformObjects(editor, action.payload)
        case ActionType.TARNSLATE_SLIDES:
            return translateSlides(editor, action.payload)
        case ActionType.CHANGE_BACKGROUND:
            return changeBackgroundSlide(editor, action.payload)
        case ActionType.RENAME_PRESENTATION:
            return {
                ...editor,
                presentation: {
                    ...editor.presentation,
                    name: action.payload
                }
            }
        case ActionType.SET_EDITOR:
            return action.payload
        case ActionType.SET_SEARCHED_IMAGES:
            console.log('set')
            return {
                ...editor,
                searchedImages: action.payload
            }
        // case ActionType.CHANGE_SCALE:
        //     return changeScale(action.payload)
        // case ActionType.ADD_SCALE:
        //     return addScale(state)
        // case ActionType.SUB_SCALE:
        //     return subScale(state)
        // case ActionType.ADD_COLOR:
        //     return [...state, action.payload]
        default:
            return editor
    }
}

export {
    editorReducer,
}