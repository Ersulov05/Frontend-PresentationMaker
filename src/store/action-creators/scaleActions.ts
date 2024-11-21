import { 
    ActionType, 
    AddScaleAction, 
    ChangeScaleAction, 
    SubScaleAction
} from "./actionTypes"

const addScale = (): AddScaleAction => {
    return {
        type: ActionType.ADD_SCALE
    }
}

const subScale = (): SubScaleAction => {
    return {
        type: ActionType.SUB_SCALE
    }
}

const changeScale = (scale: number): ChangeScaleAction => {
    return {
        type: ActionType.CHANGE_SCALE,
        payload: scale
    }
}

export const scaleActions = {
    addScale,
    subScale,
    changeScale,
}