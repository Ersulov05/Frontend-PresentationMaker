import { 
    ActionType, 
    AddColorAction, 
} from "./actionTypes"

const addColor = (color: string): AddColorAction => {
    return {
        type: ActionType.ADD_COLOR,
        payload: color
    }
}

export const colorsActions = {
    addColor
}