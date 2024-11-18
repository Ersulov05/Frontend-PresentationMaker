import { ActionType, ScaleAction } from "../actionTypes"

const scaleReducer = (state: number = 1, action: ScaleAction) => {
    switch (action.type) {
        case ActionType.CHANGE_SCALE:
            return action.payload
        default: 
            return state 
    }
}

export {
    scaleReducer
}