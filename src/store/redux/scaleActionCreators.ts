import { 
    ActionType, 
    AddScaleAction, 
    ChangeScaleAction, 
    SubScaleAction
} from "./actions"

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

export {
    addScale,
    subScale,
    changeScale,
}