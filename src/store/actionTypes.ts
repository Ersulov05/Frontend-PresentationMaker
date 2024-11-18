export enum ActionType {
    ADD_SLIDE = "ADD_SLIDE",
    RENAME_PRESENTATION = "RENAME_PRESENTATION",
    ADD_COLOR = "ADD_COLOR",
    CHANGE_SCALE = "CHANGE_SCALE",
}

export interface AddSlideAction {
    type: ActionType.ADD_SLIDE
}

export interface RenamePresentationAction {
    type: ActionType.RENAME_PRESENTATION,
    payload: string
}

export interface AddColorAction {
    type: ActionType.ADD_COLOR,
    payload: string
}

export interface ChangeScaleAction {
    type: ActionType.CHANGE_SCALE,
    payload: number
}

export type SlidesAction = AddSlideAction
export type PresentationNameAction = RenamePresentationAction
export type ColorsAction = AddColorAction
export type ScaleAction = ChangeScaleAction