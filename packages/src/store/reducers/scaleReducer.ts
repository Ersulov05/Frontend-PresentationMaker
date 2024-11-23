import { ActionType, ScaleAction } from "../action-creators/actionTypes"
import { addScale, changeScale, subScale } from "../presentation/changeScale"

const scaleReducer = (state: number = 1, action: ScaleAction) => {
    switch (action.type) {
        case ActionType.CHANGE_SCALE:
            return changeScale(action.payload)
        case ActionType.ADD_SCALE:
            return addScale(state)
        case ActionType.SUB_SCALE:
            return subScale(state)
        default: 
            return state 
    }
}

export {
    scaleReducer
}