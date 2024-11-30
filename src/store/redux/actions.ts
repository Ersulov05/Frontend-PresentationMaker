import { ImageDataType } from "../objects/addImageToSlide"
import { TextDataType } from "../objects/addTextToSlide"
import { TransformType } from "../PresentationType"
import { BackgroundDataType } from "../slides/changeBackgroundSlide"
import { EditorType } from "./EditorType"

export enum ActionType {
    ADD_SLIDE = "ADD_SLIDE",
    RENAME_PRESENTATION = "RENAME_PRESENTATION",
    ADD_COLOR = "ADD_COLOR",
    CHANGE_SCALE = "CHANGE_SCALE",
    ADD_SCALE = "ADD_SCALE",
    SUB_SCALE = "SUB_SCALE",
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

export interface AddSlideToSelectionAction {
    type: ActionType.ADD_SLIDE_TO_SELECTION,
    payload: string
}

export interface AddTextObjectAction {
    type: ActionType.ADD_TEXT_OBJECT,
    payload: TextDataType
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
    payload: string
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

export type SlidesAction = 
    AddSlideAction 
    | AddTextObjectAction
    | AddImageObjectAction
    | DeleteSlidesAction 
    | DeleteObjectsAction
    | SelectSlideAction 
    | SelectObjectAction
    | AddObjectToSelectionAction
    | AddSlideToSelectionAction
    | ChangeBackgroundAction
    | TransformObjectsAction
    | TranslateSlidesAction
export type NamePresentationAction = RenamePresentationAction
export type ColorsAction = AddColorAction
export type ScaleAction = 
    ChangeScaleAction
    | AddScaleAction
    | SubScaleAction
export type ActionCreatorsType = 
    SlidesAction 
    | NamePresentationAction 
    | ColorsAction
    | SetEditorAction
export type EditorAction = ActionCreatorsType