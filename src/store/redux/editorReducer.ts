import { EditorType } from "./EditorType";
import { ActionType, EditorAction } from "./actions";
import { defaultEditor } from "../data";
import { addSlide } from "../slides/addSlide";
import { deleteSlides } from "../slides/deleteSlides";
import { deleteObjects } from "../objects/deleteObject";
import { addSlideToSelection, selectSlide } from "../slides/selectSlide";
import { addObjectToSelection, deleteObjectSelection, selectObject } from "../objects/selectObject";
import { addImageToSlide } from "../objects/addImageToSlide";
import { addTextToSlide } from "../objects/addTextToSlide";
import { transformObjects } from "../objects/transformObject";
import { translateSlides } from "../slides/translateSlides";
import { changeBackgroundSlide } from "../slides/changeBackgroundSlide";
import { changeTextObject } from "../objects/changeTextObject";
import { copySlides } from "../slides/copySlides";

function editorReducer(editor: EditorType = defaultEditor, action: EditorAction): EditorType {
    switch (action.type) {
        case ActionType.ADD_SLIDE: 
            return addSlide(editor)
        case ActionType.COPY_SLIDES:
            return copySlides(editor)
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
            return addTextToSlide(editor)
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
            return {
                ...editor,
                searchedImages: action.payload
            }
        case ActionType.SET_PRESENTATION:
            const presentation = action.payload
            const selectedSlideId = presentation.slides[0]?.uid
            return {
                ...editor,
                presentation: presentation,
                selection: {
                    selectedObjectIds: [],
                    selectedSlideIds: selectedSlideId 
                        ? [selectedSlideId] 
                        : []
                }
            }
        case ActionType.ADD_KEY_TO_SET_KEYS:
            const newKeys: Set<string> = new Set(editor.keys)
            newKeys.add(action.payload)
            return {
                ...editor,
                keys: newKeys,
            }
        case ActionType.REMOVE_KEY_TO_SET_KEYS:
            const remainsKeys: Set<string> = new Set(editor.keys)
            remainsKeys.delete(action.payload)
            return {
                ...editor,
                keys: remainsKeys,
            }
        case ActionType.CHANGE_TEXT_OBJECT:
            return changeTextObject(editor, action.payload)
        case ActionType.DELETE_OBJECT_SELECTION:
            return deleteObjectSelection(editor)
        // case ActionType.CHANGE_SCALE:
        //     return changeScale(action.payload)
        // case ActionType.ADD_SCALE:
        //     return addScale(state)
        // case ActionType.SUB_SCALE:
        //     return subScale(state)
        case ActionType.ADD_COLOR:
            return {
                ...editor,
                colors: [...editor.colors, action.payload]
            }
        default:
            return editor
    }
}

export {
    editorReducer,
}