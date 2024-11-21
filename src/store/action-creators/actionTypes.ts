export enum ActionType {
    ADD_SLIDE = "ADD_SLIDE",
    RENAME_PRESENTATION = "RENAME_PRESENTATION",
    ADD_COLOR = "ADD_COLOR",
    CHANGE_SCALE = "CHANGE_SCALE",
    ADD_SCALE = "ADD_SCALE",
    SUB_SCALE = "SUB_SCALE",
    DELETE_SLIDES = "DELETE_SLIDES",
    SELECT_SLIDE = "SELECT_SLIDE"
}

export interface AddSlideAction {
    type: ActionType.ADD_SLIDE
}

export interface DeleteSlidesAction {
    type: ActionType.DELETE_SLIDES
}

export interface SelectSlideAction {
    type: ActionType.SELECT_SLIDE,
    payload: string
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

export type SlidesAction = AddSlideAction | DeleteSlidesAction | SelectSlideAction
export type PresentationNameAction = RenamePresentationAction
export type ColorsAction = AddColorAction
export type ScaleAction = ChangeScaleAction | AddScaleAction | SubScaleAction
export type ActionCreatorsType = SlidesAction | PresentationNameAction | ColorsAction | ScaleAction