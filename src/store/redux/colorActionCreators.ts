import { 
    ActionType, 
    AddColorAction, 
} from "./actions"

const addColor = (color: string): AddColorAction => {
    return {
        type: ActionType.ADD_COLOR,
        payload: color
    }
}

export {
    addColor
}