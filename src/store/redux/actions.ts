import { ImageDataType } from "../objects/addImageToSlide"
import { Gradient, ObjectTextType, PresentationType, Solid, TransformType } from "../PresentationType"
import { BackgroundDataType } from "../slides/changeBackgroundSlide"
import { EditorType, ImageData } from "./EditorType"

export enum ActionType {
    ADD_SLIDE = "ADD_SLIDE",
    RENAME_PRESENTATION = "RENAME_PRESENTATION",
    ADD_COLOR = "ADD_COLOR",
    CHANGE_SCALE = "CHANGE_SCALE",
    ADD_SCALE = "ADD_SCALE",
    SUB_SCALE = "SUB_SCALE",
    COPY_SLIDES = "COPY_SLIDES",
    DELETE_SLIDES = "DELETE_SLIDES",
    DELETE_OBJECTS = "DELETE_OBJECTS",
    SELECT_SLIDE = "SELECT_SLIDE",
    SELECT_OBJECT = "SELECT_OBJECT",
    TRANSFORM_OBJECT = "TRANSFORM_OBJECT",
    TARNSLATE_SLIDES = "TRANSLATE_SLIDES",
    ADD_TEXT_OBJECT = "ADD_TEXT_OBJECT",
    ADD_IMAGE_OBJECT = "ADD_IMAGE_OBJECT",
    CHANGE_BACKGROUND = "CHANGE_BACKGROUND",
    ADD_OBJECT_TO_SELECTION = "ADD_OBJECT_TO_SELECTION",
    ADD_SLIDE_TO_SELECTION = "ADD_SLIDE_TO_SELECTION",
    SET_EDITOR = "SET_EDITOR",
    SET_SEARCHED_IMAGES = "SET_SEARCHED_IMAGES",
    SET_PRESENTATION = "SET_PRESENTATION",
    ADD_KEY_TO_SET_KEYS = "ADD_KEY_TO_SET_KEYS",
    REMOVE_KEY_TO_SET_KEYS = "REMOVE_KEY_TO_SET_KEYS",
    CHANGE_TEXT_OBJECT = "CHANGE_TEXT_OBJECT",
    DELETE_OBJECT_SELECTION = "DELETE_OBJECT_SELECTION",
}

export interface AddSlideAction {
    type: ActionType.ADD_SLIDE
}

export interface DeleteSlidesAction {
    type: ActionType.DELETE_SLIDES
}

export interface DeleteObjectsAction {
    type: ActionType.DELETE_OBJECTS
}

export interface SelectSlideAction {
    type: ActionType.SELECT_SLIDE,
    payload: string
}

export interface SelectObjectAction {
    type: ActionType.SELECT_OBJECT,
    payload: string
}

export interface AddObjectToSelectionAction {
    type: ActionType.ADD_OBJECT_TO_SELECTION,
    payload: string
}

export interface DeleteObjectSelectionAction {
    type: ActionType.DELETE_OBJECT_SELECTION
}

export interface AddSlideToSelectionAction {
    type: ActionType.ADD_SLIDE_TO_SELECTION,
    payload: string
}

export interface AddTextObjectAction {
    type: ActionType.ADD_TEXT_OBJECT,
}

export interface AddImageObjectAction {
    type: ActionType.ADD_IMAGE_OBJECT,
    payload: ImageDataType
}

export interface TransformObjectsAction {
    type: ActionType.TRANSFORM_OBJECT,
    payload: TransformType
}

export interface TranslateSlidesAction {
    type: ActionType.TARNSLATE_SLIDES,
    payload: number
}

export interface RenamePresentationAction {
    type: ActionType.RENAME_PRESENTATION,
    payload: string
}

export interface AddColorAction {
    type: ActionType.ADD_COLOR,
    payload: Solid | Gradient
}

export interface AddScaleAction {
    type: ActionType.ADD_SCALE,
}

export interface SubScaleAction {
    type: ActionType.SUB_SCALE,
}

export interface ChangeScaleAction {
    type: ActionType.CHANGE_SCALE,
    payload: number
}

export interface ChangeBackgroundAction {
    type: ActionType.CHANGE_BACKGROUND,
    payload: BackgroundDataType
}

export interface SetEditorAction {
    type: ActionType.SET_EDITOR,
    payload: EditorType
}

export interface SetPresentationAction {
    type: ActionType.SET_PRESENTATION,
    payload: PresentationType
}

export interface SetSearchedImagesAction {
    type: ActionType.SET_SEARCHED_IMAGES,
    payload: ImageData[]
}

export interface AddKeyToSetKeysAction {
    type: ActionType.ADD_KEY_TO_SET_KEYS,
    payload: string
}

export interface RemoveKeyToSetKeysAction {
    type: ActionType.REMOVE_KEY_TO_SET_KEYS,
    payload: string
}

export interface ChangeTextObjectAction {
    type: ActionType.CHANGE_TEXT_OBJECT,
    payload: ObjectTextType
}

export interface CopySlidesAction {
    type: ActionType.COPY_SLIDES
}

export type SlidesAction = 
    AddSlideAction 
    | AddTextObjectAction
    | AddImageObjectAction
    | DeleteSlidesAction 
    | DeleteObjectsAction
    | SelectSlideAction 
    | SelectObjectAction
    | AddObjectToSelectionAction
    | DeleteObjectSelectionAction
    | AddSlideToSelectionAction
    | ChangeBackgroundAction
    | TransformObjectsAction
    | TranslateSlidesAction
    | SetSearchedImagesAction
    | ChangeTextObjectAction
    | CopySlidesAction
export type NamePresentationAction = RenamePresentationAction
export type ColorsAction = AddColorAction
export type ScaleAction = 
    ChangeScaleAction
    | AddScaleAction
    | SubScaleAction

export type PresentationAction = 
    SetPresentationAction
export type KeysAction = 
    AddKeyToSetKeysAction
    | RemoveKeyToSetKeysAction
export type ActionCreatorsType = 
    SlidesAction 
    | NamePresentationAction 
    | ColorsAction
    | SetEditorAction
    | PresentationAction
    | KeysAction
export type EditorAction = ActionCreatorsType